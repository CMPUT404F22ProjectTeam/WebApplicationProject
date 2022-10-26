from urllib import response
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from socialdistribution.serializers import AuthorSerializer
from socialdistribution.models import *
import uuid
import datetime


'''
URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments

GET [local, remote] get the list of comments of the post whose id is POST_ID (paginated)
POST [local] if you post an object of “type”:”comment”, it will add your comment to the post whose id is POST_ID
'''

HOST = 'http://127.0.0.1:8000'

def real_post_id(request):
    url = request.build_absolute_uri()[:-1]
    post_id = url.split('/')[6]
    return post_id

def current_id(request):
    url = request.build_absolute_uri()[:-1]
    author_id = url.split('/')[4]
    current_author_id = HOST + f'/authors/{author_id}'
    return current_author_id



class CommentViewSet(viewsets.ModelViewSet):
    
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments POST Method
    def create_comment(self, request, author_id, post_id):
        # print(author_id) #404hhh
        # print(post_id) #edb04567-c77f-4886-b87d-797bc5ce3ad1

        # get data from request
        current_author_id = current_id(request) #http://localhost:8000/authors/404hhh
        comment_content = request.data.get('content')

        # create the data for comment
        publish_time = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
        comment_uuid = str(uuid.uuid4().hex)
        comment_type = "text/markdown"

        #get post origin author
        post = Post.objects.get(uuid=post_id)
        comment_id = post.id + comment_uuid #http://127.0.0.1:8000/authors/test000/posts/edb04567-c77f-4886-b87d-797bc5ce3ad1
        current_author = Author.objects.get(id = current_author_id)
        author_info = AuthorSerializer(current_author)
        author_json = author_info.data

        #save in database and response message
        Comment.objects.create(id=comment_id, author=current_author_id, comment=comment_content,
        contentType=comment_type, published=publish_time)
        response_msg = {"type":"comment",
        "author": author_json,
        "comment": comment_content,
        "contentType": comment_type,
        "published": publish_time,
        "id": comment_id}

        return JsonResponse(response_msg)

    # URL://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments 
    # GET Method
    def all_post_comments(self, request, author_id, post_id):
        pass



        


    


        