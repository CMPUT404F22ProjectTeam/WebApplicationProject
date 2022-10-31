from urllib import response
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

        # print(followers_list)

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


    # GET
    # check if FOREIGN_AUTHOR_ID is a follower of AUTHOR_ID
    # URL: ://service/authors/{AUTHOR_ID}/followers/{FOREIGN_AUTHOR_ID}
    def is_follower(self, request, author_id, foreign_author_id):
        real_author_id = HOST + f'/authors/{author_id}'
        real_object_id = HOST + f'/authors/{foreign_author_id}'
        id = f'{foreign_author_id}to{author_id}'
        # print(">>>>>>>>>>>>>>>>>>>>>")
        # print(id)
        try:
            exist = FollowRequest.objects.get(id=id)
            if exist.relation == 'F':
                response_msg = True
            elif exist.relation == 'T':
                response_msg = True # can change to friend
            else:
                response_msg = False
        except:
            response_msg = False

        return Response(response_msg)
        

    # PUT  
    # Add FOREIGN_AUTHOR_ID as a follower of AUTHOR_ID (must be authenticated)
    # URL: ://service/authors/{AUTHOR_ID}/followers/{FOREIGN_AUTHOR_ID}
    def accept_follow_request(self, request, author_id, foreign_author_id):

        id = f'{foreign_author_id}to{author_id}'

        try:
            follow_request = FollowRequest.objects.get(id=id)
            follow_request.relation = 'F'
            follow_request.save()
            response_msg = 'Successfully added'
        except:
            response_msg = 'No follow request'

        return Response(response_msg)

    # DELETE
    # remove FOREIGN_AUTHOR_ID as a follower of AUTHOR_ID
    # URL: ://service/authors/{AUTHOR_ID}/followers/{FOREIGN_AUTHOR_ID}
    def remove_follower(self, request, author_id, foreign_author_id):

        id = f'{foreign_author_id}to{author_id}'

        try:
            follower = FollowRequest.objects.get(id=id)
            if follower.relation == 'F':
                follower.delete()
                response_msg = "Successfully delete"
            else:
                response_msg = 'Not your follower'
        except:
            response_msg = 'Not your follower'

        return Response(response_msg)

    






