import datetime
from urllib import response
from rest_framework import viewsets
from rest_framework.response import Response
import uuid
from django.http import JsonResponse
from socialdistribution.models import *
from socialdistribution.serializers import *
from . import urlhandler
from rest_framework import permissions
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework import viewsets, permissions, authentication
'''
URL: ://service/authors/{AUTHOR_ID}/liked
GET [local, remote] list what public things AUTHOR_ID liked.
It’s a list of of likes originating from this author
Note: be careful here private information could be disclosed.
'''


def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{host}/authors/{id}"
    return author_id



# @permission_classes([permissions.IsAuthenticated])
# @authentication_classes([authentication.BasicAuthentication])

class LikedViewSet(viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    # permission_classes = (permissions.AllowAny,)
    # URL: ://service/authors/{AUTHOR_ID}/liked
    # GET [local, remote] list what public things AUTHOR_ID liked
    def list(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, kwargs['author_id'])
        liked = Likes.objects.filter(author=author_id)
        if liked.exists():
            liked = list(liked.values())
            liked_info = LikesSerializer(liked, many=True)
            liked_data = {
                'type': 'liked',
                'author': author_id,
                'items': liked_info.data
            }
            return Response(liked_data)
        else:
            liked_data = {
                'type': 'liked',
                'author': author_id,
                'items': []
            }
            return Response(liked_data)
