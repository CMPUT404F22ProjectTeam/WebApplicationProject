from django.urls import path, include
from rest_framework import routers
from django.conf.urls import include

from .viewsets.friend_view import FriendViewSet
from .viewsets.follow_request_view import FollowRequestViewSet
from .viewsets.author_views import AuthorViewSet
from .viewsets.post_views import PostViewSet
from .viewsets.comment_views import CommentViewSet
from .viewsets.friend_view import FriendViewSet
from .viewsets.liked_view import LikedViewSet
from .viewsets.likes_view import LikesViewSet
from .viewsets.image_post_view import ImagePostViewSet
from .viewsets.inbox_view import InboxViewSet

urlpatterns = [

    path('signup/', AuthorViewSet.as_view({'put': 'sign_up'})),
    path('login/', AuthorViewSet.as_view({'get': 'login'})),
    # Author url
    path('authors/', AuthorViewSet.as_view({'get': 'list_all'})),
    path('authors/<str:author_id>/',
         AuthorViewSet.as_view({'get': 'find_author', 'post': 'update_profile'})),

    # Post url
    path('authors/<str:author_id>/posts/',
         PostViewSet.as_view({'get': 'getlist', 'post': 'create'})),
    path('authors/<str:author_id>/posts/<str:post_id>', PostViewSet.as_view(
        {'get': 'get', 'put': 'put', 'post': 'update', 'delete': 'delete'})),
    path('authors/<str:author_id>/posts_all/',
         PostViewSet.as_view({'get': 'all_public'})),
    path('authors/<str:author_id>/posts_friend_only/',
         PostViewSet.as_view({'get': 'friend_only'})),

    # Comment url
    path('authors/<str:author_id>/posts/<str:post_id>/comments',
         CommentViewSet.as_view({'post': 'create_comment', 'get': 'all_post_comments'})),

    # follow request
    path('authors/<str:author_id>/follow_request/<str:object_author_id>/',
         FollowRequestViewSet.as_view({'post': 'sent_follow_request'})),
    path('authors/<str:author_id>/follow_request',
         FollowRequestViewSet.as_view({'get': 'get_follow_request'})),

    # likes request
    path('authors/<str:author_id>/posts/<str:post_id>/likes',
         LikesViewSet.as_view({'get': 'getlist', 'post': 'postlist'})),
    path('authors/<str:author_id>/posts/<str:post_id>/inbox/',
         LikesViewSet.as_view({'post': 'create'})),
    path('authors/<str:author_id>/posts/<str:post_id>/comments/<str:comment_id>/likes',
         LikesViewSet.as_view({'get': 'getcomments', 'post': 'postlist'})),

    # liked request
    path('authors/<str:author_id>/liked',
         LikedViewSet.as_view({'get': 'list'})),

    # follow/friend
    path('authors/<str:author_id>/followers',
         FriendViewSet.as_view({'get': 'get_followers'})),
    path('authors/<str:author_id>/followers/<str:foreign_author_id>', FriendViewSet.as_view(
        {'get': 'is_follower', 'put': 'accept_follow_request', 'delete': 'remove_follower'})),

    # image posts request
    path('authors/<str:author_id>/posts/<str:post_id>/image',
         ImagePostViewSet.as_view({'get': 'getimage', 'post': 'postimage'})),

    # get inbox post
    path('author/<str:author_id>/inbox',
         InboxViewSet.as_view({'get': 'get_posts'})),

]
