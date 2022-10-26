from email.policy import default
from urllib import response
import uuid
from socialdistribution.serializers import AuthorSerializer
from socialdistribution.models import *
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator



#https://stackoverflow.com/questions/534839/how-to-create-a-guid-uuid-in-python
#https://docs.djangoproject.com/en/4.1/ref/request-response/
#https://stackoverflow.com/questions/58862330/what-parameter-in-username-request-data-getusername-0
#https://www.django-rest-framework.org/tutorial/2-requests-and-responses/

# Create your views here.
HOST = "http://127.0.0.1:8000/"

class AuthorViewSet(viewsets.ModelViewSet):

    # URL: ://service/authors OR  GET ://service/authors?page=10&size=5    GET Method DONE
    def list_all(self, request):

        #check url have to pagenation
        url = request.build_absolute_uri()
        is_pagination = True if 'page' in url else False

        if is_pagination:
            size = request.build_absolute_uri()[-1]
            author_queryset = Author.objects.all()
            # set up pagination
            pagination = Paginator(author_queryset, size)
            page = request.GET.get('page')
            authors = pagination.get_page(page)

        else:
            authors = Author.objects.all()
        
        all_authors = AuthorSerializer(authors, many=True)
        authors_response = {'type': 'authors',
        'items':all_authors.data} 
        return Response(authors_response)



          
    
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
        profileImage = request.data.get('profileImage',None)       
        id = request.build_absolute_uri()[:-1]
        author = Author.objects.get(id=id)
        
        if username:
            author.displayName = username
        if github:
            author.github = f'https://github.com/{github}'
        # if profileImage:
        #     author.profileImage = profileImage

        author.save()
        author_info = AuthorSerializer(author)
        return Response(author_info.data)

    # URL: ://service/login   PUT Method
    # def sign_up(self, request):
    #     # process data for response
    #     username = request.data.get('username')
    #     password = request.data.get('password')

    #     author_id = str(uuid.uuid4().hex)
    #     id = HOST + f'authors/{author_id}'
    #     host = HOST
    #     url =  HOST + f'authors/{author_id}'
    #     admin_permission = request.data.get('admin_permission','False')
    #     github = request.data.get('github')
    #     profileImage = request.data.get('profileImage')

    #     # handle errors
    #     if username == None or password == None:
    #         return Response({"msg": "Please input your username or password"}, 500)

    #     #save in database
    #     Author.objects.create(id=id, host=host, username=username, url=url, github=github, profileImage =profileImage, admin_permission=admin_permission)

    #     # Response 
    #     response_msg = {'id': id, 
    #     "host": host, 
    #     "username": username, 
    #     'url': url,
    #     'github' : github , 
    #     'profileImage': profileImage}
        
    #     return JsonResponse(response_msg)
        

    

