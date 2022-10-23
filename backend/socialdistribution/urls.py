from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .viewsets.author_views import AuthorViewSet

urlpatterns = [
    path('login/', AuthorViewSet.as_view({'put': 'sign_up'})),
    path('authors/', AuthorViewSet.as_view({'get': 'list_all'})),
    path('authors/<str:author_id>/', AuthorViewSet.as_view({'get': 'find_author', 'post': 'update_profile'})),
]
