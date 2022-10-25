from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .viewsets.author_views import AuthorViewSet
from .viewsets.post_views import PostViewSet
from .viewsets.comment_views import CommentViewSet


urlpatterns = [
    path('login/', AuthorViewSet.as_view({'put': 'sign_up'})),
    # Author url
    path('authors/', AuthorViewSet.as_view({'get': 'list_all'})),
    path('authors/<str:author_id>/', AuthorViewSet.as_view({'get': 'find_author', 'post': 'update_profile'})),

    # Post url
    path('authors/<str:author_id>/posts/', PostViewSet.as_view({'get': 'getlist', 'post': 'create'})),
    path('authors/<str:author_id>/posts/<str:post_id>/', PostViewSet.as_view({'get': 'get', 'put': 'put', 'post': 'update', 'delete': 'delete'})),
    
    # Comment url
    path('comments/', CommentViewSet.as_view({'post': 'create_comment'})),

]
