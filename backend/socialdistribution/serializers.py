from dataclasses import field
from rest_framework import serializers
from .models import *

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['type', 'id', 'host', 'displayName', 'url', 'github', 'profileImage']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['type', 'title', 'id','source', 'origin', 'description','contentType','content', 'author', 'published', 'count', 'published','visibility', 'unlisted']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['type', 'author', 'comment', 'contentType', 'published', 'id']

class FollowersSerializer(serializers.Serializer):
    class Meta:
        model = FollowRequest
        field = ['type', 'summary', 'actor', 'object', 'relation', 'id']
        
class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ['context', 'summary', 'type', 'author', 'object']

