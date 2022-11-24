import datetime
from urllib import response
from rest_framework import viewsets
from rest_framework.response import Response 
import uuid
from django.http import JsonResponse
from socialdistribution.models import *
from socialdistribution.serializers import *
from . import urlhandler

'''
URL: ://service/authors/{AUTHOR_ID}/liked
GET [local, remote] list what public things AUTHOR_ID liked.
It’s a list of of likes originating from this author
Note: be careful here private information could be disclosed.
'''

HOST = 'http://127.0.0.1:8000'

def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{HOST}/authors/{id}"
    return author_id

class LikedViewSet(viewsets.ModelViewSet):
    queryset = Likes.objects.all()

    # URL: ://service/authors/{AUTHOR_ID}/liked
    # GET [local, remote] list what public things AUTHOR_ID liked
    def list(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, kwargs['id'])
        liked = Likes.objects.filter(author = author_id)
        liked_info = LikesSerializer(liked, many = True)
        liked_data = {
            'type': 'liked',
            'items': liked_info.data
        }
        return Response(liked_data)
