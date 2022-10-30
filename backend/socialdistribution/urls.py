from django.urls import path, include
from rest_framework import routers
from django.conf.urls import include

from .viewsets.friend_view import FriendViewSet
from .viewsets.follow_request_view import FollowRequestViewSet
from .viewsets.author_views import AuthorViewSet
from .viewsets.post_views import PostViewSet
from .viewsets.comment_views import CommentViewSet
from .viewsets.friend_view import FriendViewSet


urlpatterns = [
    # path('login/', AuthorViewSet.as_view({'put': 'sign_up'})),
    # Author url
    path('authors/', AuthorViewSet.as_view({'get': 'list_all'})),
    path('authors/<str:author_id>/', AuthorViewSet.as_view({'get': 'find_author', 'post': 'update_profile'})),

    # Post url
    path('authors/<str:author_id>/posts/', PostViewSet.as_view({'get': 'getlist', 'post': 'create'})),
    path('authors/<str:author_id>/posts/<str:post_id>/', PostViewSet.as_view({'get': 'get', 'put': 'put', 'post': 'update', 'delete': 'delete'})),
    path('authors/<str:author_id>/posts_all/', PostViewSet.as_view({'get': 'all_public'})),
    # Comment url
    path('authors/<str:author_id>/posts/<str:post_id>/comments', CommentViewSet.as_view({'post': 'create_comment', 'get': 'all_post_comments'})),

    # follow request
    path('authors/<str:author_id>/follow_request/<str:object_author_id>/', FollowRequestViewSet.as_view({'post': 'sent_follow_request'})),

    # follow/friend
    path('authors/<str:author_id>/followers', FriendViewSet.as_view({'get': 'get_followers'}))
]
