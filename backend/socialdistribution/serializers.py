from dataclasses import field
from rest_framework import serializers
from .models import *

class AuthorSerializer(serializers.Serializer):
    class Meta:
        model = Author
        field = ['type', 'id', 'host', 'displayName', 'url', 'github', 'profileImage','user']