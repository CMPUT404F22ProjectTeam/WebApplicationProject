from rest_framework import viewsets
from socialdistribution.serializers import AuthorSerializer
from socialdistribution.models import Author, FollowRequest
from rest_framework.response import Response
from socialdistribution.serializers import FollowersSerializer

HOST = 'http://127.0.0.1:8000'
class FriendViewSet(viewsets.ModelViewSet):

    #GET Method
    #get all follows of given author_id
    #URL: ://service/authors/{AUTHOR_ID}/followers
    def get_followers(self, request, author_id):

        followers_list = []
        # get real aurhor id
        real_author_id = HOST + f'/authors/{author_id}'
        check = {'object':real_author_id,'relation':'F'}
        followers_queryset = FollowRequest.objects.filter(**check)
        for item in followers_queryset:
            # follower_list.append(item.actor)
            follower = Author.objects.get(id=item.actor)
            followers_list.append(follower)

        print(followers_list)

        if len(followers_list) == 0 :
            response_msg = {
            "type": "followers",
            "items": []                

            }

        elif len(followers_list) == 1 :
            author_info = AuthorSerializer(followers_list).data
            response_msg = {
            "type": "followers",
            "items": author_info               

            }
        else:
            author_info = AuthorSerializer(followers_list, many=True).data

            response_msg = {
            "type": "followers",
            "items": author_info
            }
        
        return Response(response_msg)

