from dataclasses import field
from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import *
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import get_user_model

User = get_user_model()


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['type', 'id', 'host', 'displayName',
                  'url', 'github', 'profileImage']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['type', 'title', 'id', 'source', 'origin', 'description', 'contentType',
                  'content', 'author', 'published', 'count', 'published', 'visibility', 'unlisted']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['type', 'author', 'comment',
                  'contentType', 'published', 'id']


class FollowersSerializer(serializers.Serializer):
    post_items = PostSerializer(serializers.Serializer)

    class Meta:
        model = FollowRequest
        field = ['type', 'summary', 'actor', 'object', 'relation', 'id']


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ['context', 'summary', 'type', 'author', 'object']


class ImagePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['post', 'image']


class InboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inbox
        fields = ['type', 'author', 'message']



# https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ['actor', 'object']

