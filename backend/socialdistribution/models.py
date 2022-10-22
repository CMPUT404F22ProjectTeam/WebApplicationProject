
from email.policy import default
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
# from django.contrib.auth.models import PermissionsMixin

def default_list():
    return []
# Create your models here.
class Author(AbstractUser):

    type = "author"

    id = models.URLField(primary_key=True, max_length=255)
    host = models.URLField(max_length=255, default = '')
    displayName = models.CharField(max_length=255, default = '')
    url = models.URLField(max_length=255, default = '')
    github = models.URLField(blank=True,default = '')
    profileImage = models.ImageField(blank=True)


class FollowRequest(models.Model):

    type = "Follow"
    summary = models.CharField(max_length=255)
    # actor sent request to object's inbox
    actor = models.CharField(max_length=255)
    object = models.CharField(max_length=255)


class Friend(models.Model):

    type = "Friend"

    actor = models.CharField(max_length=255)
    object = models.JSONField(default=default_list)


class Liked(models.Model):

    type = "liked"

    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    items = models.JSONField(default=default_list)


class Likes(models.Model):

    type = "Like"

    context = models.CharField(max_length=255,  default="")
    summary = models.CharField(max_length=255, default="")
    author = models.URLField(max_length=255, default="")
    object = models.URLField(max_length=255, default="")
    

class Inbox(models.Model):
    
    type = "Inbox"
    author = models.CharField(max_length=256, default="")
    message = models.JSONField(null=True)


# Damian
class Comment(models.Model):

    type = "comment"
    
    author = models.CharField(max_length=60)
    comment = models.TextField()
    contentType = models.CharField(max_length=60)
    published = models.DateTimeField(default=timezone.now)
    id = models.URLField(primary_key=True, max_length=255)

    def __str__(self) -> str:
        return self.comment

# Damian
class Post(models.Model):

    type = "post"
    title = models.CharField(max_length=255, default = '')
    id = models.URLField(primary_key=True, max_length=255)
    source = models.URLField(max_length=255)
    origin = models.URLField(max_length=255)
    description = models.TextField(max_length=255, default = '')
    contentType = models.CharField(max_length=60)
    content = models.TextField(blank=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    #categories
    published = models.DateTimeField(default=timezone.now)
    count = models.ImageField(default=0, blank=True)
    visibility = models.CharField(default="PUBLIC")
    unlisted = models.BooleanField(default="False")

    def __str__(self) -> str:
        return self.content




