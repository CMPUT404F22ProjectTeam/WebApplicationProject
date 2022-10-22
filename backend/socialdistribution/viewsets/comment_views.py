from urllib import response
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from socialdistribution.models import *


'''
URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments

GET [local, remote] get the list of comments of the post whose id is POST_ID (paginated)
POST [local] if you post an object of “type”:”comment”, it will add your comment to the post whose id is POST_ID
'''

HOST = 'http://localhost:8000'

class CommentViewSet(viewsets.ModelViewSet):
    
    def get(self, request):
        return Response()