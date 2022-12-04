# import json
# from django.test import TestCase

# from django.contrib.auth.models import User
# from django.urls import reverse
# from rest_framework import status
# from rest_framework.authtoken.models import Token
# from rest_framework.test import APITestCase

# from .serializers import *
# from .models import *

# # Create your tests here.

# class ActiveTestCase(APITestCase):
#     def new_user_test(self):
#         test_data = {
#             "username": "Ryanh",
#             "github": "Ryanh",
#         }
#         response = self.client.post("/author/", test_data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         json_response = json.loads(response.content.decode('utf-8'))
#         self.assertEqual(json_response["success"], True)
#         self.assertEqual(json_response['msg'], "Pending admin approval")

#         ryan_user = Author.objects.get(displayName="Ryan")
#         self.assertFalse(ryan_user.user.is_active)


from django.test import TestCase, override_settings
from rest_framework.authtoken.models import Token, TokenProxy
from rest_framework.test import APIClient, APITestCase, URLPatternsTestCase
from .models import *
from rest_framework import status

from .viewsets.author_views import AuthorViewSet
from .viewsets.post_views import PostViewSet
from .viewsets.comment_views import CommentViewSet
from .viewsets.friend_view import FriendViewSet
from .viewsets.liked_view import LikedViewSet
from .viewsets.likes_view import LikesViewSet
from .viewsets.image_post_view import ImagePostViewSet
from .viewsets.inbox_view import InboxViewSet
import json

# CreateAuthor Testcase here
class AuthorAndAuthenticationTestCase(APITestCase):

    def setUp(self):
        # create several users:
        self.author1 = Author.objects.create(
            username="user1", id="user1@gmail.com", password="user1")
        self.author2 = Author.objects.create(
            username="user2", id="user2@gmail.com", password="user2")
        self.author3 = Author.objects.create(
            username="user3", id="user3@gmail.com", password="user3")
        self.response_code = 200

    def test_create_author(self):
        self.assertTrue(self.author1.id)
        self.assertTrue(self.author2.id)
        self.assertTrue(self.author3.id)

    def test_register(self):
        request_body = {
            "Username": [str(self.author1.username)],
            "Password": [str(self.author1.password)]
        }

        response = self.client.post(
            "/socialdistribution/authors", request_body)
        self.assertEqual(self.response_code, status.HTTP_200_OK)

    def test_get_profile(self):
        response = self.client.get(
            "/socialdistribution/authors/" + str(self.author1.id))
        self.assertEqual(self.response_code, status.HTTP_200_OK)

    def test_update_profile(self):
        request_body = {
            "Username": [str(self.author1.username)],
            "Password": [str(self.author1.password)]
        }
        response = self.client.get(
            "/api/authors/" + str(self.author1.id), request_body)

        self.assertEqual(self.response_code, status.HTTP_200_OK)


class PostTests(APITestCase):
    def test_post_1(self):
        author_data1 = {
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_1",
            "host": "https://fallprojback.herokuapp.com",
            "displayName": "unitest_author_1",
            "url": "https://fallprojback.herokuapp.com/authors/unitest_author_1",
            "github": "test1@github.com",
            "password": "123456"
        }
        response = self.client.post("/signup/", author_data1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_json = json.loads(response.content.decode('utf-8'))
        # public post
        post_test_data1 = {
            "title": "post test 1",
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_1/posts/post_test_1",
            "source": "https://roadmap.sh/backend",
            "origin": "https://roadmap.sh/backend",
            "description": "Post test 1",
            "content": "This is a Post test",
        }
        response = self.client.post(response_json['url']+'/posts/', post_test_data1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert
        post = Post.objects.get(id=post_test_data1['id'])
        self.assertEqual(post.title, "post test 1")
        self.assertEqual(
            post.id, "https://fallprojback.herokuapp.com/authors/unitest_author_1/posts/post_test_1")
        self.assertEqual(post.source, "https://roadmap.sh/backend")
        self.assertEqual(post.origin, "https://roadmap.sh/backend")
        self.assertEqual(post.content, "This is a Post test")

    def test_post_2(self):
        author_data2 = {
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_2",
            "host": "https://fallprojback.herokuapp.com",
            "displayName": "unitest_author_2",
            "url": "https://fallprojback.herokuapp.com/authors/unitest_author_2",
            "github": "test2@github.com",
            "profileImage": None,
            "password": "123456"
        }
        response = self.client.post("/signup/", author_data2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_json = json.loads(response.content.decode('utf-8'))
        # public post
        post_test_data2 = {
            "title": "post test 2",
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_2/posts/post_test_2",
            "source": "https://roadmap.sh/backend",
            "origin": "https://roadmap.sh/backend",
            "description": "Post test 2",
            "content": "This is a Post test",
        }
        response = self.client.post(
            response_json['url']+'/posts/', post_test_data2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert
        post = Post.objects.get(id=post_test_data2['id'])
        self.assertEqual(post.title, "post test 1")
        self.assertEqual(
            post.id, "https://fallprojback.herokuapp.com/authors/unitest_author_1/posts/post_test_1")
        self.assertEqual(post.source, "https://roadmap.sh/backend")
        self.assertEqual(post.origin, "https://roadmap.sh/backend")
        self.assertEqual(post.content, "This is a Post test")

    def test_post_3(self):
        author_data3 = {
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_3",
            "host": "https://fallprojback.herokuapp.com",
            "displayName": "unitest_author_3",
            "url": "https://fallprojback.herokuapp.com/authors/unitest_author_3",
            "github": "test3@github.com",
            "profileImage": None,
            "password": "123456"
        }
        response = self.client.post("/signup/", author_data3)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_json = json.loads(response.content.decode('utf-8'))
        # public post
        post_test_data3 = {
            "title": "post test 3",
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_3/posts/post_test_3",
            "source": "https://roadmap.sh/backend",
            "origin": "https://roadmap.sh/backend",
            "description": "Post test 3",
            "content": "This is a Post test",
        }
        response = self.client.post(
            response_json['url']+'/posts/', post_test_data3)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert
        post = Post.objects.get(id=post_test_data3['id'])
        self.assertEqual(post.title, "post test 1")
        self.assertEqual(
            post.id, "https://fallprojback.herokuapp.com/authors/unitest_author_1/posts/post_test_1")
        self.assertEqual(post.source, "https://roadmap.sh/backend")
        self.assertEqual(post.origin, "https://roadmap.sh/backend")
        self.assertEqual(post.content, "This is a Post test")

    def test_update_post_1(self):
        update_post_test_data1 = {
            "title": "post test 1",
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_1/posts/post_test_1",
            "source": "https://roadmap.sh/backend",
            "origin": "https://roadmap.sh/backend",
            "description": "Update Post test 1",
            "content": "This is a update Post test",
        }
        response = self.client.post("https://fallprojback.herokuapp.com/authors/unitest_author_1"+'/posts/', update_post_test_data1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert
        post = Post.objects.get(id=update_post_test_data1['id'])
        self.assertEqual(post.title, "post test 1")
        self.assertEqual(
            post.id, "https://fallprojback.herokuapp.com/authors/unitest_author_1/posts/post_test_1")
        self.assertEqual(post.source, "https://roadmap.sh/backend")
        self.assertEqual(post.origin, "https://roadmap.sh/backend")
        self.assertEqual(post.content, "This is a Post test")

    def test_get_post_1(self):
        response = self.client.get("https://fallprojback.herokuapp.com/authors/unitest_author_1/posts/post_test_1")
        self.assertEqual(self.response_code, status.HTTP_200_OK)




class CommentTests(APITestCase):
    def test_comment_1(self):
        # author
        author_data1 = {
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_1",
            "host": "https://fallprojback.herokuapp.com",
            "displayName": "unitest_author_1",
            "url": "https://fallprojback.herokuapp.com/authors/unitest_author_1",
            "github": "test1@github.com",
            "password": "123456"
        }
        # post
        post_test_data1 = {
            "title": "post test 1",
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_1/posts/post_test_1",
            "source": "https://roadmap.sh/backend",
            "origin": "https://roadmap.sh/backend",
            "description": "Post test 1",
            "content": "This is a Post test",
        }
        comment_test_data1 = {
            "author": author_data1["id"],
            "comment": "This is a comment test",
            "contentType": "plain/text",
            "id": post_test_data1["id"]+'/comments/comment_test_1'
        }
        response = self.client.post(post_test_data1["id"]+'/comments/', comment_test_data1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        comment = Comment.objects.get(id=comment_test_data1["id"])
        self.assertEqual(comment.id, comment_test_data1["id"])
        self.assertEqual(comment.comment, comment_test_data1["comment"])
        self.assertEqual(comment.author, comment_test_data1["author"])
        self.assertEqual(comment.contentType, comment_test_data1["contentType"])

    def test_comment_2(self):
        # author
        author_data1 = {
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_1",
            "host": "https://fallprojback.herokuapp.com",
            "displayName": "unitest_author_1",
            "url": "https://fallprojback.herokuapp.com/authors/unitest_author_1",
            "github": "test1@github.com",
            "password": "123456"
        }
        # post
        post_test_data1 = {
            "title": "post test 1",
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_1/posts/post_test_1",
            "source": "https://roadmap.sh/backend",
            "origin": "https://roadmap.sh/backend",
            "description": "Post test 1",
            "content": "This is a Post test",
        }
        comment_test_data1 = {
            "author": author_data1["id"],
            "comment": "This is a comment test 2",
            "contentType": "plain/text",
            "id": post_test_data1["id"]+'/comments/comment_test_2'
        }
        response = self.client.post(
            post_test_data1["id"]+'/comments/', comment_test_data1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        comment = Comment.objects.get(id=comment_test_data1["id"])
        self.assertEqual(comment.id, comment_test_data1["id"])
        self.assertEqual(comment.comment, comment_test_data1["comment"])
        self.assertEqual(comment.author, comment_test_data1["author"])
        self.assertEqual(comment.contentType,
                         comment_test_data1["contentType"])

    def test_comment_3(self):
        # author
        author_data1 = {
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_1",
            "host": "https://fallprojback.herokuapp.com",
            "displayName": "unitest_author_1",
            "url": "https://fallprojback.herokuapp.com/authors/unitest_author_1",
            "github": "test1@github.com",
            "password": "123456"
        }
        # post
        post_test_data1 = {
            "title": "post test 1",
            "id": "https://fallprojback.herokuapp.com/authors/unitest_author_1/posts/post_test_1",
            "source": "https://roadmap.sh/backend",
            "origin": "https://roadmap.sh/backend",
            "description": "Post test 1",
            "content": "This is a Post test",
        }
        comment_test_data1 = {
            "author": author_data1["id"],
            "comment": "This is a comment test 3",
            "contentType": "plain/text",
            "id": post_test_data1["id"]+'/comments/comment_test_3'
        }
        response = self.client.post(
            post_test_data1["id"]+'/comments/', comment_test_data1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        comment = Comment.objects.get(id=comment_test_data1["id"])
        self.assertEqual(comment.id, comment_test_data1["id"])
        self.assertEqual(comment.comment, comment_test_data1["comment"])
        self.assertEqual(comment.author, comment_test_data1["author"])
        self.assertEqual(comment.contentType,
                         comment_test_data1["contentType"])




class FollowRequestTests(APITestCase):
    pass


class InboxTests(APITestCase):
    pass


class LikesTests(APITestCase):
    pass


class LikedTests(APITestCase):
    pass


class FriendTests(APITestCase):
    pass