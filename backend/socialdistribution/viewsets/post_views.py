import datetime
from urllib import response
from rest_framework import viewsets
from rest_framework.response import Response 
import uuid
from django.http import JsonResponse
from socialdistribution.models import *
from socialdistribution.serializers import PostSerializer, AuthorSerializer
from . import urlhandler
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

HOST = 'http://127.0.0.1:8000'


def getPostIDFromRequestURL(id):
    post_id = f"/posts/{id}"
    return post_id

def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{HOST}/authors/{id}"
    return author_id

class PostViewSet(viewsets.ModelViewSet):
    quaryset = Post.objects.all()
    serializer_class = PostSerializer

    # POST create a new post
    # URL: ://service/authors/{AUTHOR_ID}/posts/
    def create(self, request, *args, **kwargs):
        RequestData = request.data.copy()
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        title = RequestData.get('title', None)
        # source = RequestData.get('source', None)
        origin = RequestData.get('origin', author_id)
        description = RequestData.get('description', None)
        contentType = RequestData.get('content_type', "text/plain")
        content = RequestData.get('content', None)
        categories = RequestData.get('categories', None)
        count = RequestData.get('count', 0)
        visibility = RequestData.get('visibility', "PUBLIC")
        unlisted = RequestData.get('unlisted', False)

        # Create a new post
        author = Author.objects.get(id=author_id)
        author_info = AuthorSerializer(author)
        author_json = author_info.data
        published = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
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
        Post.objects.create(title= title, id= post_id,  origin = origin, description = description, contentType = contentType,
        content = content, author=author, categories = categories, count= count, comments = comments, published = published, visibility= visibility,
        unlisted= unlisted, uuid = post_uuid)
        # serializer = self.serializer_class(data = post_data)
        # print(serializer)
        # if serializer.is_valid():
        return Response(post_data, status=200)
        # else:
        #     return Response(serializer.errors, status=400)

    # Get all posts of a author
    # URL: ://service/authors/{AUTHOR_ID}/posts/
    def getlist(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        queryset = Post.objects.filter(author = author_id, visibility = "PUBLIC")
        return Response(PostSerializer(queryset, many = True).data)

    # GET get a specific post using POST_ID
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def get(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id=post_id)
        post_serializer = PostSerializer(querypost)
        return Response(post_serializer.data)

    # POST update the post whose id is POST_ID (must be authenticated) 
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def update(self, request, *args, **kwargs):

        RequestData = request.data.copy()
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id = post_id)
        
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
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id = post_id)

        # delete the post
        try:
            querypost.delete()
        except ValueError:
            return Response("[POST_NOT_FOUND]", 500)
        return Response("[POST_DELETED]")

    # PUT [local] create a post where its id is POST_ID 
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def put(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id = post_id)

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
        published = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
        comments = None

        querypost.title = title
        querypost.origin = origin       
        querypost.description = description
        querypost.contentType = contentType
        querypost.content = content
        querypost.author = author
        querypost.categories = categories
        querypost.content = content
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

<<<<<<< HEAD
    # Get all posts of a author
    # URL: ://service/authors/{AUTHOR_ID}/posts/
    def getlist(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        queryset = Post.objects.filter(author = author_id, visibility = "PUBLIC")
        # queryset = Post.objects.all()

        post_data = PostSerializer(queryset, many = True)
        all_posts = {
            'type': 'posts',
            'item': post_data.data
        }
        return Response(all_posts, status=200)

    # GET get a specific post using POST_ID
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def get(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id=post_id)
        post_serializer = PostSerializer(querypost)
        return Response(post_serializer.data)

    # POST update the post whose id is POST_ID (must be authenticated) 
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def update(self, request, *args, **kwargs):

        RequestData = request.data.copy()
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id = post_id)
        
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
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id = post_id)

        # delete the post
        try:
            querypost.delete()
        except ValueError:
            return Response("[POST_NOT_FOUND]", 500)
        return Response("[POST_DELETED]")

    # PUT [local] create a post where its id is POST_ID 
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def put(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = HOST + request.get_full_path()[:-1]
        querypost = Post.objects.get(id = post_id)

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
        published = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
        comments = None

        querypost.title = title
        querypost.origin = origin       
        querypost.description = description
        querypost.contentType = contentType
        querypost.content = content
        querypost.author = author
        querypost.categories = categories
        querypost.content = content
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

    #GET Method
    #list all public post
    #url: http://127.0.0.1:8000/authors/1111111111/posts_all/
    def all_public(self, request, author_id):
        all_public_queryset = Post.objects.filter(visibility="PUBLIC")
        author_info = PostSerializer(all_public_queryset, many=True)
        response_msg = {
            "type": "Posts",
            "items": author_info.data

        }
        
        return Response(post_data, status=200)

    #GET Method
    #list all public post
    #url: http://127.0.0.1:8000/authors/1111111111/posts_all/
    def all_public(self, request, author_id):
        all_public_queryset = Post.objects.filter(visibility="PUBLIC")
        author_info = PostSerializer(all_public_queryset, many=True)
        response_msg = {
            "type": "Posts",
            "items": author_info.data
        }
        
        return Response(response_msg)