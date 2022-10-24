from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .viewsets.author_views import AuthorViewSet
from .viewsets.post_views import PostViewSet
from .viewsets.comment_views import CommentViewSet


urlpatterns = [
    path('login/', AuthorViewSet.as_view({'put': 'sign_up'})),
    path('authors/', AuthorViewSet.as_view({'get': 'list_all'})),
    path('authors/<str:author_id>/', AuthorViewSet.as_view({'get': 'find_author', 'post': 'update_profile'})),

    path('posts/', PostViewSet.as_view),
    path('comments/', CommentViewSet.as_view({'post': 'create_comment'})),


    
]
