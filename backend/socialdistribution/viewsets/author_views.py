from urllib import response
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

# Create your views here.
class AuthorViewSet(viewsets.ModelViewSet):
    def sign_up(self, request):
        return Response()
        

