from django.contrib import admin
from .models import *
# Register your models here.

class AuthorAdminSite(admin.ModelAdmin):
    model = Author
    feilds = ['admin_permission']

admin.site.register(Author, AuthorAdminSite)
admin.site.register(Post)
admin.site.register(Comment)



