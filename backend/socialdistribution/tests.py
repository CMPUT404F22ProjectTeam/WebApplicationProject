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
    
