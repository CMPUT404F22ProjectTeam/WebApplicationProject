from email.policy import default
from urllib import response
import uuid
from socialdistribution.models import *
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse

#https://stackoverflow.com/questions/534839/how-to-create-a-guid-uuid-in-python
#https://docs.djangoproject.com/en/4.1/ref/request-response/
#https://stackoverflow.com/questions/58862330/what-parameter-in-username-request-data-getusername-0

# Create your views here.
HOST = "http://127.0.0.1:8000/"

class AuthorViewSet(viewsets.ModelViewSet):
    
    # URL: ://service/login   PUT Method
    def sign_up(self, request):
        # process data for response
        username = request.data.get('username')
        password = request.data.get('password')

        author_id = str(uuid.uuid4().hex)
        id = HOST + f'authors/{author_id}'
        host = HOST
        url =  HOST + f'authors/{author_id}'
        print(id)
        admin_permission = request.data.get('admin_permission','False')
        github = request.data.get('github')
        profileImage = request.data.get('profileImage')

        # handle errors
        if username == None or password == None:
            return Response({"msg": "Please input your username or password"}, 500)

        #save in database
        Author.objects.create(id=id, host=host, username=username, url=url, github=github, profileImage =profileImage, admin_permission=admin_permission)

        # Response 
        response_msg = {'id': id, 
        "host": host, 
        "username": username, 
        'url': url,
        'github' : github , 
        'profileImage': profileImage}
        
        return JsonResponse(response_msg)
        

    

