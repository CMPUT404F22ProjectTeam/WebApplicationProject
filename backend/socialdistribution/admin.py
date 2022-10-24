from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Author)
admin.site.register(FollowRequest)
admin.site.register(Friend)
admin.site.register(Liked)
admin.site.register(Likes)
admin.site.register(Inbox)



