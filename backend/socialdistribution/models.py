
from email.policy import default
# from tkinter.tix import Tree
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
    host = models.URLField(max_length=255, default='')
    displayName = models.CharField(max_length=255, default='')
    url = models.URLField(max_length=255, default='')
    github = models.URLField(null=True, blank=True)
    profileImage = models.ImageField(null=True, blank=True)
    admin_permission = models.BooleanField(default="False")
    password = models.CharField(max_length=255, default='')


class FollowRequest(models.Model):

    type = "Follow"
    summary = models.CharField(max_length=255)
    # actor sent request to object's inbox
    actor = models.CharField(max_length=255)
    object = models.CharField(max_length=255)
    relation = models.CharField(default='N', max_length=50)
    id = models.CharField(primary_key=True, max_length=255)


class Friend(models.Model):

    type = "Friend"

    actor = models.CharField(max_length=255)
    object = models.JSONField(default=default_list)


class Liked(models.Model):

    type = "liked"

    author = models.URLField(max_length=255, default="")
    items = models.JSONField(default=default_list)


class Likes(models.Model):

    type = "Like"

    context = models.CharField(max_length=255,  default="")
    summary = models.CharField(max_length=255, default="")
    author = models.URLField(max_length=255, default="")
    object = models.URLField(max_length=255, default="")
    comment = models.CharField(max_length=255, default="")


class Inbox(models.Model):

    type = "Inbox"

    author = models.CharField(max_length=256, default="")
    message = models.JSONField(default=default_list)


# Damian
class Comment(models.Model):

    type = "comment"

    author = models.URLField(max_length=255, default="")
    comment = models.TextField(default="")
    contentType = models.CharField(max_length=60)
    published = models.DateTimeField(default=timezone.now)
    id = models.URLField(primary_key=True, max_length=255)

    def __str__(self) -> str:
        return self.comment

# Damian


class Post(models.Model):
    class Visibility(models.TextChoices):
        PUBLIC = 'PUBLIC'
        PRIVATE = 'PRIVATE'
        FRIENDONLY = 'FRIENDS'

    class ContentType(models.TextChoices):
        MARKDOWN = 'text/markdown'
        PLAIN = 'text/plain'
        APPLICATION = 'application/base64'
        IMAGE_PNG = 'image/png;base64'
        IMAGE_JPEG = 'image/jpeg;base64'

    type = "post"
    title = models.CharField(max_length=255, default="")
    id = models.URLField(primary_key=True, max_length=255)
    source = models.URLField(max_length=255, null=True)
    origin = models.URLField(max_length=255)
    description = models.TextField(max_length=255, default="")
    contentType = models.CharField(max_length=60, choices=ContentType.choices, default=ContentType.PLAIN)

    content = models.TextField(blank=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    categories = models.JSONField(default=default_list, null=True)
    published = models.DateTimeField(default=timezone.now)
    count = models.IntegerField(default=0, blank=True)
    comments = models.TextField(null=True)
    visibility = models.CharField(
        max_length=50, choices=Visibility.choices, default=Visibility.PUBLIC)
    unlisted = models.BooleanField(default="False")
    uuid = models.CharField(max_length=60, null=True)

    def __str__(self) -> str:
        return self.content


class PostImage(models.Model):
    type = "postImage"
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(null=True, blank=True)
