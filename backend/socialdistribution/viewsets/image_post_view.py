import datetime
from urllib import response
from rest_framework import viewsets
from rest_framework.response import Response 
import uuid
from django.http import JsonResponse
from socialdistribution.models import *
from socialdistribution.serializers import ImagePostSerializer
from . import urlhandler
from rest_framework import permissions
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework import viewsets, permissions, authentication
'''
Image Posts are just posts that are images. But they are encoded as base64 data. You can inline an image post using a data url or you can use this shortcut to get the image if authenticated to see it.

URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/image
GET [local, remote] get the public post converted to binary as an iamge
return 404 if not an image
This end point decodes image posts as images. This allows the use of image tags in markdown.
You can use this to proxy or cache images.
'''

HOST = 'http://127.0.0.1:8000'

def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{host}/authors/{id}/"
    return author_id


# @permission_classes([permissions.IsAuthenticated])
# @authentication_classes([authentication.BasicAuthentication])
class ImagePostViewSet(viewsets.ModelViewSet):
    model = PostImage
    serializer_class = ImagePostSerializer
    permission_classes = (permissions.AllowAny,)
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/image
    def getimage(self, request, *args, **kwargs):
        
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        post_id = request.get_full_path()[:-6]
        print('post_id: ',post_id)
        images = PostImage.objects.filter(post = post_id)
        images = list(images.values())
        if(images):
            return (ImagePostSerializer(images, many=True).data)
        else:
            return Response("[404 Not Found]",status=404)
        

    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/image
    def postimage(self, request, *args, **kwargs):
        try:
            image = request.data['image']
            post_id = request.get_full_path()[:-6]
            images = self.model.objects.create(image=image,post=post_id)
            images = PostImage.objects.filter(post = post_id)
            images = list(images.values())
            return (ImagePostSerializer(images).data)
        except Exception:
            return Response(status=404)
