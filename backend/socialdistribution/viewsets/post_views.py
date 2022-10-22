from urllib import response
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from socialdistribution.models import *
from socialdistribution.serializers import PostSerializer
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

class PostViewSet(viewsets.ModelViewSet):
    quaryset = Post.objects.all()
    serializer_class = PostSerializer

    def get(self, request):
        return Response()