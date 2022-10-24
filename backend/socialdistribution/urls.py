from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .viewsets.author_views import AuthorViewSet
from .viewsets.post_views import PostViewSet
from .viewsets.comment_views import CommentViewSet


urlpatterns = [
    path('authors/', AuthorViewSet.as_view({'put': 'sign_up'})),
    path('author/<str:author_id>/posts/', PostViewSet.as_view({'get': 'getlist', 'post': 'create'})),
    path('author/<str:author_id>/posts/<str:post_id>/', PostViewSet.as_view({'get': 'get', 'put': 'put', 'post': 'update', 'delete': 'delete'})),
]