from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):    # request
    return HttpResponse("authors works :)")     # response