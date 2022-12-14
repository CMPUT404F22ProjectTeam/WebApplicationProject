from urllib import response
from rest_framework import viewsets
from socialdistribution.serializers import AuthorSerializer
from socialdistribution.models import Author, FollowRequest, Friend
from rest_framework.response import Response
from socialdistribution.serializers import FollowersSerializer
from . import urlhandler
from rest_framework import permissions
from django.http import JsonResponse
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework import viewsets, permissions, authentication
import json

#HOST = 'http://127.0.0.1:8000'
HOST='https://fallprojback.herokuapp.com'


def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{host}/authors/{id}"
    return author_id

def checkTrueFriend(obj_id, act_id):
    id_1 = f"{obj_id}to{act_id}"
    id_2 = f"{act_id}to{obj_id}"
    try:
        follow_req_obj1 = FollowRequest.objects.get(id=id_1)
        follow_req_obj2 = FollowRequest.objects.get(id=id_2)
        if follow_req_obj1.relation =='F' and follow_req_obj2.relation =='F':
            follow_req_obj1.relation = 'T'
            follow_req_obj1.save()
            follow_req_obj2.relation ='T'
            follow_req_obj2.save()
            Friend.objects.create(actor=act_id, object=obj_id)
            return True

    except:
        return False



# @permission_classes([permissions.IsAuthenticated])
# @authentication_classes([authentication.BasicAuthentication])

class FriendViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.AllowAny,)
    
    #GET Method
    #get all follows of given author_id
    #URL: ://service/authors/{AUTHOR_ID}/followers
    def get_followers(self, request, *args, **kwargs):

        followers_list = []
        # get real aurhor id
        real_author_id = getAuthorIDFromRequestURL(request, kwargs['author_id'])
        # check = {'object':real_author_id,'relation':'F'}
        followers_queryset = FollowRequest.objects.filter(object=real_author_id)
        for item in followers_queryset:
            # follower_list.append(item.actor)
            if item.relation == 'F' or item.relation == 'T':
                follower = Author.objects.get(id=item.actor)
                followers_list.append(follower)

        #print(followers_list)

        if len(followers_list) == 0 :
            response_msg = {
            "type": "followers",
            "items": []                

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
    def is_follower(self, request, *args, **kwargs):
        real_author_id = kwargs['author_id']
        real_object_id = kwargs['foreign_author_id']
        print("---------------------")
        id = real_object_id+'to'+real_author_id
        print(id)

        try:
            exist = FollowRequest.objects.get(id=id)
            if exist.relation == 'F':
                response_msg = 'Friend'
            elif exist.relation == 'T':
                response_msg = 'True Friend' # can change to friend
            else:
                response_msg = False
        except:
            response_msg = False

        return Response(response_msg)
        

    # PUT  
    # Add FOREIGN_AUTHOR_ID as a follower of AUTHOR_ID (must be authenticated)
    # URL: ://service/authors/{AUTHOR_ID}/followers/{FOREIGN_AUTHOR_ID}
    def accept_follow_request(self, request, *args, **kwargs):
        actor_id = kwargs['foreign_author_id']
        obj_id = kwargs['author_id']
        id = f'{actor_id}to{obj_id}'
        try:
            follow_request = FollowRequest.objects.get(id=id)
            follow_request.relation = 'F'
            follow_request.save()
            response_msg = 'Successfully added'
        except:
            response_msg = 'No follow request'

        checkTrueFriend(actor_id, obj_id)
        # print("????????????????????????????????????" + str(is_true_friend))

        return Response(response_msg, 200)

    
    
    # DELETE
    # remove FOREIGN_AUTHOR_ID as a follower of AUTHOR_ID
    # URL: ://service/authors/{AUTHOR_ID}/followers/{FOREIGN_AUTHOR_ID}
    def remove_follower(self, request, *args, **kwargs):

        actor_id = kwargs['foreign_author_id']
        obj_id = kwargs['author_id']
        id = f'{obj_id}to{actor_id}'
        id_2 = f'{actor_id}to{obj_id}'

        try:
            follower = FollowRequest.objects.get(id=id)
            if follower.relation == 'F':
                follower.delete()
                response_msg = "Successfully delete"

            elif follower.relation == 'T':
                follower.delete()
                follower2 = FollowRequest.objects.get(id=id_2)
                follower2.relation = 'F'
                follower2.save()
                response_msg = "Successfully delete"
                
            else:
                response_msg = 'Not your follower'

        except:
            response_msg = 'Not your follower'
        
        return Response(response_msg)


    # URL: ://service/authors/{AUTHOR_ID}/truefriend
    # get all true friend
    def is_true_friend(self, request, *args, **kwargs):
        real_author_id = getAuthorIDFromRequestURL(request, kwargs['author_id'])
        #print("=========")
        # print(real_author_id)
        
        friend_queryset = FollowRequest.objects.filter(relation='T', actor=real_author_id)
        queryset = list(friend_queryset.values('object'))
        print(queryset)

        if not queryset:
            print("22222222")
            return Response([])
        elif len(queryset) == 1:
            queryset = list(friend_queryset.values('object'))[0].get('object')
            username = Author.objects.get(id =queryset)
            items = []
            items.append({'Truefriend': queryset,
                                "username": str(username)})
            return Response(items)
        else:
            
            items = []
            for i in range(len(friend_queryset)):
                queryset = list(friend_queryset.values('object'))[i].get('object')
                username = Author.objects.get(id = queryset)
                username=str(username).strip()
                
                items.append({'Truefriend': queryset,
                    "username": username})
            return Response(items)
                


        


    






