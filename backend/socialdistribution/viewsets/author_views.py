from email.policy import default
from urllib import response
import uuid
from socialdistribution.serializers import AuthorSerializer
from socialdistribution.models import *
from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator
from django.http import HttpResponseNotFound, HttpResponse
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework import viewsets, permissions, authentication
from . import urlhandler
import requests

# Create your views here.
# HOST = "https://fallprojback.herokuapp.com/"
# https://github.com/encode/django-rest-framework/issues/1067

def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{host}/authors/{id}"
    return author_id

class IsAuthenticatedOrCreate(permissions.BasePermission):
    # permission override, to prevent login before registration
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            if view.action == "create":
                return True
            else:
                return False
        else:
            return True

def validate_url(url):
    statuscode=requests.get(url).status_code
    return statuscode

# @permission_classes([permissions.IsAuthenticated])
# @authentication_classes([authentication.BasicAuthentication])
class AuthorViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticatedOrCreate,)
    # permission_classes = (permissions.AllowAny,)
    def get_serializer_class(self):
        return AuthorSerializer

    # GET Method
    # URL: ://service/authors OR  GET ://service/authors?page=10&size=5
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
                            'items': all_authors.data}
        return Response(authors_response)

    # GET METHOD
    # URL://service/authors/{AUTHOR_ID}/
    def find_author(self, request, *args, **kwargs):

        # get the id from request and delete the "/"
        id = request.build_absolute_uri()[:-1]

        try:
            author = Author.objects.get(id=id)
            author_info = AuthorSerializer(author)
            return Response(author_info.data)
        except:
            return HttpResponseNotFound('<h1>Author does not exist</h1>')

    # POST METHOD
    # URL://service/authors/{AUTHOR_ID}/
    def update_profile(self, request, *args, **kwargs):

        host = urlhandler.get_Safe_url(request.build_absolute_uri())
        username = request.data.get('username', None)
        github = request.data.get('github', None)
        profileImage = request.data.get('profileImage', None)
        id = request.build_absolute_uri()[:-1]
        author = Author.objects.get(id=id)

        if username:
            author.username = username
            author.displayName = username
        if github:
            github_link = f'https://github.com/{github}'
            is_valid = validate_url(github_link)
            if is_valid == 404:
                github_link = None
                return Response({"msg": "Sorry this github account is invalid"}, 200)
            else:
                author.github = github

        if profileImage:
            author.profileImage = profileImage

        author.save()
        author_info = AuthorSerializer(author)
        return Response(author_info.data)

    # URL: ://service/sign_up/   PUT Method
    def sign_up(self, request, *args, **kwargs):
        # process data for response
        username = request.data.get('username')
        password = request.data.get('password')

        author_id = str(uuid.uuid4().hex)
        host = urlhandler.get_Safe_url(request.build_absolute_uri())
        id =  f'{host}/authors/{author_id}'
        url = id 
        admin_permission = request.data.get('admin_permission', 'False')
        github = request.data.get('github','False')
        profileImage = request.data.get('profileImage')

        try:
            author_obj = Author.objects.get(username=username)
            if author_obj:
                return Response({"msg": "Username has already been used, please re-enter"}, 200)
        except:
            pass
        # handle errors
        if username == None or password == None:
            return Response({"msg": "Please input your username or password"}, 200)

        if github:
            github_link = f'https://github.com/{github}'
            is_valid = validate_url(github_link)
            print(is_valid)
            if is_valid == 404:
                github_link = None
                return Response({"msg": "Sorry this github account is invalid"}, 200)


        
        #save in database
        Author.objects.create(id=id, host=host, username=username, url=url, github=github, displayName=username, 
                              profileImage=profileImage, admin_permission=admin_permission, password=password)


        # Response
        response_msg = {'id': id,
                        "host": host,
                        "displayName": username,
                        'url': url,
                        'github': github_link,
                        'profileImage': profileImage}
        print(response_msg)
        return JsonResponse(response_msg)

    # GET
    # URL://service/login
    def login(self, request, *args, **kwargs):

        # get username and password
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            author = Author.objects.get(username=username)
            if password == author.password:
                if not author.admin_permission:
                    serializer = AuthorSerializer(author)
                    return Response(serializer.data)
                else:
                    return Response(False)
            else:
                return HttpResponse('<p>Wrong password</p>')

        except:
            return HttpResponse('<p>User dose not exist</p>')
