from email.policy import default
from urllib import response
import uuid
from socialdistribution.serializers import AuthorSerializer
from socialdistribution.models import *
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse

#https://stackoverflow.com/questions/534839/how-to-create-a-guid-uuid-in-python
#https://docs.djangoproject.com/en/4.1/ref/request-response/
#https://stackoverflow.com/questions/58862330/what-parameter-in-username-request-data-getusername-0
#https://www.django-rest-framework.org/tutorial/2-requests-and-responses/

# Create your views here.
HOST = "http://127.0.0.1:8000/"

class AuthorViewSet(viewsets.ModelViewSet):

    # URL: ://service/authors   GET Method
    def list_all(self, request):

        #get the request data from request
        page = request.data.get('page', None)
        size = request.data.get('size', None)
        
        #get all author from database
        if page == None and size == None:
            author_queryset = Author.objects.all()
            all_authors = AuthorSerializer(author_queryset, many=True)
            return Response(all_authors.data)
        else:
            TODO:Pagination
            pass
            #calculate the page search range


            #get data from database
    
    # URL://service/authors/{AUTHOR_ID}/ GET METHOD
    def find_author(self, request, author_id):

        # get the id from request and delete the "/"
        id = request.build_absolute_uri()[:-1]

        #find id in database
        try:
            author = Author.objects.get(id=id)
            author_info = AuthorSerializer(author)
            return Response(author_info.data)
        except:
            return Response(None)
    
    # URL://service/authors/{AUTHOR_ID}/ POST METHOD
    def update_profile(self, request, author_id):
        
        username = request.data.get('username', None)
        github = request.data.get('github', None)
        # profileImage        
        id = request.build_absolute_uri()[:-1]
        author = Author.objects.get(id=id)
        
        if username:
            author.displayName = username
        if github:
            author.github = github

        author.save()
        author_info = AuthorSerializer(author)
        return Response(author_info.data)

    # URL: ://service/login   PUT Method
    def sign_up(self, request):
        # process data for response
        username = request.data.get('username')
        password = request.data.get('password')

        author_id = str(uuid.uuid4().hex)
        id = HOST + f'authors/{author_id}'
        host = HOST
        url =  HOST + f'authors/{author_id}'
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
        

    

