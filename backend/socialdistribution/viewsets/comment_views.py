from urllib import response
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from socialdistribution.models import *
import uuid
import datetime


'''
URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments

GET [local, remote] get the list of comments of the post whose id is POST_ID (paginated)
POST [local] if you post an object of “type”:”comment”, it will add your comment to the post whose id is POST_ID
'''

HOST = 'http://localhost:8000'

def real_post_id(request):
    url = request.build_absolute_uri()[:-1]
    post_id = url.split('/')[4]
    return post_id

def current_id(request):
    url = request.build_absolute_uri()[:-1]
    author_id = url.split('/')[2]
    current_author_id = f'HOST/authors/{author_id}'
    return current_author_id


# URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments POST Method
class CommentViewSet(viewsets.ModelViewSet):
    

    def create_comment(self, request, author_id):
        
        # get post and author id
        current_author_id = current_id(request)
        post_id = real_post_id(request)
        comment_content = request.data.get('content')
        # print(current_author_id)
        # print(post_id)

        # create the data for comment
        publish_time = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
        comment_uuid = str(uuid.uuid4().hex)
        comment_type = "text/markdown"

        #get post origin author
        post = Post.objects.get(id=post_id)
        

        return response()


    


        