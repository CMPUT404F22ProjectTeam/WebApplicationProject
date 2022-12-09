from urllib import response
from rest_framework import viewsets
from socialdistribution.serializers import FollowersSerializer
from socialdistribution.models import Author
from rest_framework.response import Response
from socialdistribution.models import *
from . import urlhandler
from rest_framework import permissions

from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework import viewsets, permissions, authentication

HOST = 'http://127.0.0.1:8000'

#HOST='https://fallprojback.herokuapp.com'

def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{host}/authors/{id}"
    return author_id


# @permission_classes([permissions.IsAuthenticated])
# @authentication_classes([authentication.BasicAuthentication], authentication.TokenAuthentication])

class FollowRequestViewSet(viewsets.ModelViewSet):
    queryset=FollowRequest.objects.all()
    #permission_classes = [permissions.AllowAny]
    serializer_class = FollowersSerializer
    # permission_classes = (permissions.AllowAny,)

    # POST Method
    # author sent a follow request to object
    # URL: ://service/authors/{AUTHOR_ID}/follow_request/<str:object_author_id>/
    def sent_follow_request(self, request, *args, **kwargs):

        #get current id and object id
        real_author_id = getAuthorIDFromRequestURL(request, kwargs['author_id'])
        real_object_id = getAuthorIDFromRequestURL(request, kwargs['object_author_id'])
        
        #parse data for response
        actor = Author.objects.get(id=real_author_id)
        actor_username = actor.displayName
        object = Author.objects.get(id=real_object_id)
        object_username = object.displayName
        summary = f'{actor_username} wants to follow {object_username}'


        request_status = "R" # R :sending requirement 
        id=f"{kwargs['author_id']}to{kwargs['object_author_id']}"


        
        # check if already exist request
        try:
            is_send = FollowRequest.objects.get(id=id)
            relation = is_send.relation
            if relation == 'R':
                response_msg = "request has been sent"
            else:
                response_msg = "Friend"
        except:
            FollowRequest.objects.create(
                summary=summary, actor=real_author_id, object=real_object_id, relation=request_status, id=id)
            response_msg = "Sending"


            # inbox handle
            actor_username = list(Author.objects.filter(
                id=real_author_id).values('displayName'))[0].get('displayName')
            object_username = list(Author.objects.filter(
                id=real_object_id).values('displayName'))[0].get('displayName')
            msg = {
                "type": "Follow",
                "summary": summary,
                "actor": real_author_id,
                "actor_username": actor_username,
                "object": real_object_id,
                "object_username": object_username,
                "relation": request_status,
                "id": id
            }
            Inbox.objects.create(author=real_object_id, message=msg)



        return Response(response_msg)

    # GET Method
    # author get all follow request from object
    # URL: ://service/authors/{AUTHOR_ID}/follow_request
    def get_follow_request(self, request, *args, **kwargs):

        request_list = []

        #get current id and object id
        real_author_id = getAuthorIDFromRequestURL(request, kwargs['author_id'])

        request_set = FollowRequest.objects.filter(
            object=real_author_id, relation='R')
        for item in request_set:
            actors = Author.objects.get(id=item.actor)
            request_list.append(
                {'displayName': actors.displayName, 'id': actors.id})

        if len(request_list) == 0:
            return Response({})

        else:
            return Response(request_list)
