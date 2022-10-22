from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .viewsets.author_views import AuthorViewSet
from .viewsets.post_views import PostViewSet
from .viewsets.comment_views import CommentViewSet


urlpatterns = [
    path('authors/', AuthorViewSet.as_view({'put': 'sign_up'})),
    path('posts/', PostViewSet.as_view),
    path('comments/', CommentViewSet.as_view)
]