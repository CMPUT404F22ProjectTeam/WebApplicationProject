import datetime
from urllib import response
from rest_framework import viewsets
from rest_framework.response import Response
import uuid
from django.http import JsonResponse, HttpRequest, HttpResponseNotFound
from socialdistribution.serializers import FollowersSerializer
from socialdistribution.models import *
from socialdistribution.serializers import PostSerializer, AuthorSerializer
from . import urlhandler
from django.core import serializers
from rest_framework import permissions
from socialdistribution.viewsets import inbox_view
from rest_framework import permissions
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework import viewsets, permissions, authentication

'''
URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
GET [local, remote] get the public post whose id is POST_ID
POST [local] update the post whose id is POST_ID (must be authenticated)
DELETE [local] remove the post whose id is POST_ID
PUT [local] create a post where its id is POST_ID
Creation URL ://service/authors/{AUTHOR_ID}/posts/
GET [local, remote] get the recent posts from author AUTHOR_ID (paginated)
POST [local] create a new post but generate a new id
Be aware that Posts can be images that need base64 decoding.
posts can also hyperlink to images that are public
'''

#HOST = 'http://127.0.0.1:8000'
HOST = 'https://fallprojback.herokuapp.com'


def getPostIDFromRequestURL(author_id,id):
    post_id = f"{author_id}/posts/{id}"
    return post_id


def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{host}/authors/{id}"
    return author_id


# @permission_classes([permissions.IsAuthenticated])
# @authentication_classes([authentication.BasicAuthentication, authentication.TokenAuthentication])
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    # permission_classes = [permissions.AllowAny]
    serializer_class = PostSerializer
    
    # POST create a new post
    # URL: ://service/authors/{AUTHOR_ID}/posts/

    def create(self, request, *args, **kwargs):

        RequestData = request.data.copy()
        url = request.build_absolute_uri()
        author_id = url[:-7]
        # print(author_id)
        title = RequestData.get('title', None)
        # source = RequestData.get('source', None)
        origin = RequestData.get('origin', author_id)
        description = RequestData.get('description', None)
        contentType = RequestData.get('contentType', "text/plain")
        content = RequestData.get('content', "")
        categories = RequestData.get('categories', None)
        count = RequestData.get('count', 0)
        visibility = RequestData.get('visibility', "PUBLIC")
        unlisted = RequestData.get('unlisted', False)

        # Create a new post
        author = Author.objects.get(id=author_id)
        author_info = AuthorSerializer(author)
        author_json = author_info.data
        published = datetime.datetime.utcnow().replace(
            tzinfo=datetime.timezone.utc).isoformat()
        post_uuid = str(uuid.uuid4())
        post_id = f"{author_id}/posts/{post_uuid}"
        comments = None

        post_data = {
            "type": "post",
            "title": title,
            "id": post_id,
            # "source": source,
            "origin": origin,
            "description": description,
            "contentType": contentType,
            "content": content,
            "author": author_json,
            "categories": categories,
            "count": count,
            "commentsSrc": comments,
            "published": published,
            "visibility": visibility,
            "unlisted": unlisted
        }

        #create in database

        Post.objects.create(title=title, id=post_id,  origin=origin, description=description, contentType=contentType,
                            content=content, author=author, categories=categories, count=count, comments=comments, published=published, visibility=visibility,
                            unlisted=unlisted, uuid=post_uuid)

        # Inbox.objects.create(author=author_id, message=post_data)

        # print("POST UPDATE TO INBOX")
        # inbox_view.InboxViewSet.creat_post_rec(self, author_id, post_data)

        # serializer = self.serializer_class(data = post_data)
        # print(serializer)
        # if serializer.is_valid():
        return Response(post_data, status=200)
        # else:
        #     return Response(serializer.errors, status=400)

    # Get all posts of a author
    # URL: ://service/authors/{AUTHOR_ID}/posts/
    def getlist(self, request, *args, **kwargs):
        url = request.build_absolute_uri()
        author_id = url[:-7]
        author_id = Author.objects.get(id=author_id)
        queryset = Post.objects.filter(author=author_id, visibility="PUBLIC")
        return Response(PostSerializer(queryset, many=True).data)

    # GET get a specific post using POST_ID
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def get(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = getPostIDFromRequestURL( author_id,kwargs['post_id'] )
        try:
            querypost = Post.objects.get(id=post_id)
            post_serializer = PostSerializer(querypost)
            return Response(post_serializer.data)
        except:
            return HttpResponseNotFound('<p>No post record</p>')

    # POST update the post whose id is POST_ID (must be authenticated)
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def update(self, request, *args, **kwargs):

        RequestData = request.data.copy()
        author_id = getAuthorIDFromRequestURL(
            request, self.kwargs["author_id"])
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id=post_id)

        # update the post
        title = RequestData.get('title', None)
        description = RequestData.get('description', None)
        content = RequestData.get('content', None)
        categories = RequestData.get('categories', None)
        # count = querypost.count
        visibility = RequestData.get('visibility', "PUBLIC")
        unlisted = RequestData.get('unlisted', False)

        # update the post
        if title:
            querypost.title = title
        if description:
            querypost.description = description
        if content:
            querypost.content = content
        if visibility:
            querypost.visibility = visibility
        if unlisted:
            querypost.unlisted = unlisted
        querypost.save()
        post_serializer = PostSerializer(querypost)

        return Response(post_serializer.data)

    # DELETE delete the post whose id is POST_ID (must be authenticated)
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def delete(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(
            request, self.kwargs["author_id"])
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id=post_id)

        # delete the post
        try:
            querypost.delete()
        except ValueError:
            return Response("[POST_NOT_FOUND]", 500)
        return Response("[POST_DELETED]")

    # PUT [local] create a post where its id is POST_ID
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def put(self, request, *args, **kwargs):
        # author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])

        author_id = HOST + '/authors/' + self.kwargs["author_id"]
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id=post_id)

        # create a post whose id is POST_ID
        title = request.data.get('title', None)
        source = None
        origin = request.data.get('origin', post_id)
        description = request.data.get('description', None)
        contentType = request.data.get('content_type', "text/plain")
        content = request.data.get('content', None)
        # author = request.data.get('author', None)
        categories = request.data.get('categories', None)
        # published = request.data.get('published', None)
        count = request.data.get('count', 0)
        comments = request.data.get('comments', None)
        visibility = request.data.get('visibility', "PUBLIC")
        unlisted = request.data.get('unlisted', False)

        author = Author.objects.get(id=author_id)
        author_info = AuthorSerializer(author)
        author_json = author_info.data
        published = datetime.datetime.utcnow().replace(
            tzinfo=datetime.timezone.utc).isoformat()
        comments = None

        querypost.title = title
        querypost.origin = origin
        querypost.description = description
        querypost.contentType = contentType
        querypost.content = content
        querypost.author = author
        querypost.categories = categories
        querypost.comments = comments
        querypost.published = published
        querypost.visibility = visibility
        querypost.unlisted = unlisted
        querypost.save()

        post_data = {
            "type": "post",
            "title": title,
            "id": post_id,
            "source": source,
            "origin": origin,
            "description": description,
            "contentType": contentType,
            "content": content,
            "author": author_json,
            "categories": categories,
            "count": count,
            "commentsSrc": comments,
            "published": published,
            "visibility": visibility,
            "unlisted": unlisted
        }

        return Response(post_data, status=200)

    #GET Method
    #list all public post
    #url: http://127.0.0.1:8000/authors/1111111111/posts_all/
    def all_public(self, request, *args, **kwargs):

        all_public_queryset = Post.objects.filter(visibility="PUBLIC")
        # post_info = PostSerializer(all_public_queryset, many=True)
        item =[]
        for post in all_public_queryset:
            author = post.author
            author_info = AuthorSerializer(author)
            author_json = author_info.data
            post_data = {

            "type": "post",
            "title": post.title,
            "id": post.id,
            "source": post.source,
            "origin": post.origin,
            "description": post.description,
            "contentType": post.contentType,
            "content": post.content,
            "author": author_json,
            "categories": post.categories,
            "count": post.count,
            "comments": post.id+'/comments',
            "published":  post.published,
            "visibility":  post.visibility,
            "unlisted":  post.unlisted                
            }
            item.append(post_data)


 
        response_msg = {
            "type": "Posts",
            "items": item
        }

        return Response(response_msg)

    #GET Method
    #get list of friend only posts of my friends
    #url: http://127.0.0.1:8000/authors/1111111111/posts_friend_only/
    def friend_only(self, request, author_id):

        private_posts = []
        author_id = HOST + '/authors/' + self.kwargs["author_id"]
        friend_queryset = FollowRequest.objects.filter(
            actor=author_id, relation='F')

        for item in friend_queryset:
            print(item)
            private_posts.append(Post.objects.filter(
                author=item.object, visibility="PUBLIC"))

        private_posts_list = []
        for items in private_posts:
            for item in items:
                private_posts_list.append(item.id)

        print("private_posts_list")
        print(private_posts_list)
        response_msg = private_posts_list

        return Response(response_msg)
