from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .viewsets.author_views import AuthorViewSet

urlpatterns = [
    path('authors/', AuthorViewSet.as_view({'put': 'sign_up'})),
]