import datetime
from urllib import response
from rest_framework import viewsets
from rest_framework.response import Response
import uuid
from django.http import JsonResponse
from socialdistribution.models import *
from socialdistribution.serializers import PostSerializer, AuthorSerializer, LikesSerializer
from . import urlhandler

'''
You can like posts and comments
Send them to the inbox of the author of the post or comment
URL: ://service/authors/{AUTHOR_ID}/inbox/
POST [local, remote]: send a like object to AUTHOR_ID
URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/likes
GET [local, remote] a list of likes from other authors on AUTHOR_ID’s post POST_ID
URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments/{COMMENT_ID}/likes
GET [local, remote] a list of likes from other authors on AUTHOR_ID’s post POST_ID comment COMMENT_ID
'''


def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{host}/authors/{id}"
    return author_id


class LikesViewSet(viewsets.ModelViewSet):
    serializer_class = LikesSerializer
    queryset = Likes.objects.all()

    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/likes
    # GET [local, remote] a list of likes from other authors on AUTHOR_ID’s post POST_ID
    def getlist(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, kwargs.get('author_id'))
        object_id = request.build_absolute_uri()[:-6]
        queryset = Likes.objects.filter(object=object_id)
        queryset = list(queryset.values())
        return Response(LikesSerializer(queryset, many=True).data)

    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/likes
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments/{COMMENT_ID}/likes
    # POST [local, remote] a list of likes from other authors on AUTHOR_ID’s post POST_ID
    def postlist(self, request, *args, **kwargs):
        RequestData = request.data.copy()
        author_id = getAuthorIDFromRequestURL(request, kwargs.get('author_id'))
        object_id = request.build_absolute_uri()[:-6]
        context = RequestData.get('context', None)
        summary = RequestData.get('summary', None)

        # liked = Liked.objects.filter(author = author_id)
        # Author_instance = Author.objects.get(id = author_id)
        if 'comments' in object_id:
            # create in database
            Likes.objects.create(
                context=context, summary=summary, author=author_id, comment=object_id)
            like_data = {'type': 'like', 'context': context,
                         'summary': summary, 'author': author_id, 'comment': object_id}
        else:
            # create in database
            Likes.objects.create(
                context=context, summary=summary, author=author_id, object=object_id)
            like_data = {'type': 'like', 'context': context,
                         'summary': summary, 'author': author_id, 'post': object_id}

        # liked.items.append(like_data)
        # liked.save()

        queryset = Likes.objects.filter(object=object_id)
        queryset = list(queryset.values())

        return Response(LikesSerializer(queryset, many=True).data)

    # URL: ://service/authors/{AUTHOR_ID}/inbox/
    # POST [local, remote]: send a like object to AUTHOR_ID
    def create(self, request, *args, **kwargs):
        RequestData = request.data.copy()
        author_id = getAuthorIDFromRequestURL(request, kwargs.get('author_id'))
        context = RequestData.get('context', None)
        summary = RequestData.get('summary', None)
        author_id = RequestData.get('author', None)
        object_id = RequestData.get('object', None)

        # create a new likes
        likes_data = {
            "context": context,
            "summary": summary,
            "type": "Like",
            "author": author_id,
            "object": object_id
        }

        # create in database
        Likes.objects.create(context=context, summary=summary,
                             author=author_id, object=object_id)

        return Response(likes_data, status=200)

    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments/{COMMENT_ID}/likes
    # GET [local, remote] a list of likes from other authors on AUTHOR_ID’s post POST_ID comment COMMENT_ID

    def getcomments(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, kwargs.get('author_id'))
        comment_id = request.build_absolute_uri()[:-5]
        queryset = Likes.objects.filter(comment=comment_id)
        queryset = list(queryset.values())
        return Response(LikesSerializer(queryset, many=True).data)
