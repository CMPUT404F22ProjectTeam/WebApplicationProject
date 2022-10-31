from rest_framework import viewsets
from socialdistribution.models import Author, FollowRequest
from rest_framework.response import Response
from socialdistribution.serializers import FollowersSerializer

HOST = 'http://127.0.0.1:8000'
class FriendViewSet(viewsets.ModelViewSet):

    #GET Method
    #get all follows of given author_id
    #URL: ://service/authors/{AUTHOR_ID}/followers
    def get_followers(self, request, author_id):

        # get real aurhor id
        real_author_id = HOST + f'/authors/{author_id}'
        followers_queryset = FollowRequest.objects.filter(object=real_author_id)
        
        for item in followers_queryset:
            print(item.object)

        return Response('a')
