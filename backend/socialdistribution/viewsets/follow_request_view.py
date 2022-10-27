from urllib import response
from rest_framework import viewsets
from socialdistribution.models import Author
from rest_framework.response import Response

HOST = 'http://127.0.0.1:8000'
class FollowRequestViewSet(viewsets.ModelViewSet):

    # POST sent a follow request
    # URL: ://service/authors/{AUTHOR_ID}/follow_request/
    def sent_follow_request(self, request, author_id, object_author_id):

        #get current id and object id
        real_author_id = HOST + f'/authors/{author_id}'
        # object_id = request.data.get('object')
        real_object_id = HOST + f'/authors/{object_author_id}'

        #parse data for response
        actor = Author.objects.get(id=real_author_id)
        actor_username = actor.displayName
        object = Author.objects.get(id=real_object_id)
        object_username = object.displayName



        summary = f'{actor_username} wants to follow {object_username}'

        # print(">>>>>>>>>>>>>>>>>>>>>")
        # print(summary)
        
        return Response("response")
        

