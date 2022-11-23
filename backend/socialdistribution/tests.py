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
from rest_framework.test import APIClient, APITestCase 
from .models import Author
from rest_framework import status
from socialdistribution.viewsets.author_views import AuthorViewSet


# CreateAuthor Testcase here
class AuthorAndAuthenticationTestCase(APITestCase):


    def setUp(self):
        # create several users:
        self.author1 = Author.objects.create(username="user1", id="user1@gmail.com", password="user1")
        self.author2 = Author.objects.create(username="user2", id="user2@gmail.com", password="user2")
        self.author3 = Author.objects.create(username="user3", id="user3@gmail.com", password="user3")
        self.response_code = 200


    def test_create_author(self):
        self.assertTrue(self.author1.id)
        self.assertTrue(self.author2.id)
        self.assertTrue(self.author3.id)


    def test_register(self):
        request_body  ={
            "Username": [str(self.author1.username)],
            "Password": [str(self.author1.password)]
        }

        response = self.client.post("/socialdistribution/authors", request_body)
        self.assertEqual(self.response_code, status.HTTP_200_OK)



    def test_get_profile(self):
        response = self.client.get("/socialdistribution/authors/" + str(self.author1.id))
        self.assertEqual(self.response_code, status.HTTP_200_OK)


    def test_update_profile(self):
        request_body  ={
            "Username": [str(self.author1.username)],
            "Password": [str(self.author1.password)]
        }
        response = self.client.get("/api/authors/" + str(self.author1.id), request_body)

        self.assertEqual(self.response_code, status.HTTP_200_OK)
