import datetime
from urllib import response
from rest_framework import viewsets
from rest_framework.response import Response 
import uuid
from django.http import JsonResponse
from socialdistribution.models import *
from socialdistribution.serializers import PostSerializer
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

HOST = 'http://localhost:8000'


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
        source = RequestData.get('source', None)
        origin = RequestData.get('origin', None)
        description = RequestData.get('description', None)
        contentType = RequestData.get('content_type', "text/plain")
        content = RequestData.get('content', None)
        author = RequestData.get('author', None)
        # author_id应该用不到author直接就是authorid
        categories = RequestData.get('categories', None)
        published = RequestData.get('published', None)
        count = RequestData.get('count', None)
        count = str(len(content))
        #visibility = RequestData.get('visibility', None)
        visibility = RequestData.get('visibility', "PUBLIC")
        #unlisted = RequestData.get('unlisted', None)
        unlisted = RequestData.get('unlisted', False)
        print("==================")
        print(author_id)
        print(count)
        # Create a new post
        publish_time = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
        post_uuid = str(uuid.uuid4())
        post_id = f"{author_id}/posts/{post_uuid}"
        comments = f"{post_id}/comments/"
        post_data = {
            "title": title,
            "id": post_id,
            "source": source,
            "origin": origin,
            "description": description,
            "contentType": contentType,
            "content": content,
            "author": author_id,
            "categories": categories,
            "count": count,
            "comments": comments,
            "published": publish_time,
            "visibility": visibility,
            "unlisted": unlisted
        }

        serializer = self.serializer_class(data = post_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)

    # Get all posts of a author
    # URL: ://service/authors/{AUTHOR_ID}/posts/
    def getlist(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        queryset = Post.objects.filter(author = author_id)
        return Response(PostSerializer(queryset, many = True).data)

    # GET get a specific post using POST_ID
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def get(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = request.get_full_path().split('/')[-1]
        querypost = Post.objects.get(id = post_id)
        return Response(PostSerializer(querypost, many = True).data)

    # POST update the post whose id is POST_ID (must be authenticated) 
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def update(self, request, *args, **kwargs):
        RequestData = request.data.copy()
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = request.get_full_path().split('/')[-1]
        querypost = Post.objects.get(id = post_id)

        
        # update the post
        title = RequestData.get('title', None)
        source = RequestData.get('source', None)
        origin = RequestData.get('origin', None)
        description = RequestData.get('description', None)
        contentType = RequestData.get('content_type', None)
        content = RequestData.get('content', None)
        author = RequestData.get('author', None)
        categories = RequestData.get('categories', None)
        published = RequestData.get('published', None)
        count = RequestData.get('count', None)
        visibility = RequestData.get('visibility', None)
        unlisted = RequestData.get('unlisted', None)

        # update the post
        querypost.title = title
        querypost.source = source
        querypost.origin = origin
        querypost.description = description
        querypost.contentType = contentType
        querypost.content = content
        querypost.author = author
        querypost.categories = categories
        querypost.published = published
        querypost.count = count
        querypost.visibility = visibility
        querypost.unlisted = unlisted

        querypost.save()
        
        return Response("[POST]")
    
    # DELETE delete the post whose id is POST_ID (must be authenticated)
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def delete(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = request.get_full_path().split('/')[-1]
        querypost = Post.objects.get(id = post_id)

        # delete the post
        try:
            querypost.delete()
        except ValueError:
            return Response("[POST_NOT_FOUND]")
        return Response("[POST_DELETED]")

    # PUT [local] create a post where its id is POST_ID 
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}
    def put(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, self.kwargs["author_id"])
        post_id = request.get_full_path().split('/')[-1]
        querypost = Post.objects.get(id = post_id)

        # create a post whose id is POST_ID
        title = request.data.get('title', None)
        source = request.data.get('source', None)
        origin = request.data.get('origin', None)
        description = request.data.get('description', None)
        contentType = request.data.get('content_type', None)
        content = request.data.get('content', None)
        author = request.data.get('author', None)
        categories = request.data.get('categories', None)
        published = request.data.get('published', None)
        count = request.data.get('count', None)
        comments = request.data.get('comments', None)
        visibility = request.data.get('visibility', None)
        unlisted = request.data.get('unlisted', None)
        # create a post
        post_data = {
            "title": title,
            "id": post_id,
            "source": source,
            "origin": origin,
            "description": description,
            "contentType": contentType,
            "content": content,
            "author": author,
            "categories": categories,
            "count": count,
            "comments": comments,
            "published": published,
            "visibility": visibility,
            "unlisted": unlisted
        }
        # check inbox post
        # NOT DONE yet
        serializer = self.serializer_class(data = post_data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data, status=200)


'''
class Post(models.Model):

    type = "post"
    title = models.CharField(max_length=255, default = '')
    id = models.URLField(primary_key=True, max_length=255)
    source = models.URLField(max_length=255)
    origin = models.URLField(max_length=255)
    description = models.TextField(max_length=255, default = '')
    contentType = models.CharField(max_length=60)
    content = models.TextField(blank=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    #categories
    published = models.DateTimeField(default=timezone.now)
    count = models.ImageField(default=0, blank=True)
    visibility = models.CharField(max_length=50, default="PUBLIC")
    unlisted = models.BooleanField(default="False")
'''