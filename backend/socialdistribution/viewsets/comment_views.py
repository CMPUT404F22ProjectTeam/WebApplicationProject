from urllib import response
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from socialdistribution.serializers import AuthorSerializer, CommentSerializer
from socialdistribution.models import *
import uuid
import datetime
from django.core.paginator import Paginator
from socialdistribution.viewsets import inbox_view
from . import urlhandler
from rest_framework import permissions
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework import viewsets, permissions, authentication

'''
URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments

GET [local, remote] get the list of comments of the post whose id is POST_ID (paginated)
POST [local] if you post an object of “type”:”comment”, it will add your comment to the post whose id is POST_ID
'''

#HOST = 'http://127.0.0.1:8000'
HOST = 'https://fallprojback.herokuapp.com'


# def real_post_id(request):
#     url = request.build_absolute_uri()[:-1]
#     post_id = url.split('/')[6]
#     return post_id


# def current_id(request):
#     url = request.build_absolute_uri()[:-1]
#     author_id = url.split('/')[4]
#     host = urlhandler.get_Safe_url(request.build_absolute_uri())
#     current_author_id = host + f'/authors/{author_id}'
#     return current_author_id

def getPostIDFromRequestURL(author_id,id):
    post_id = f"{author_id}/posts/{id}"
    return post_id


def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{host}/authors/{id}"
    return author_id

# @permission_classes([permissions.IsAuthenticated])
# @authentication_classes([authentication.BasicAuthentication])
class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Comment.objects.all()
    #permission_classes = [permissions.AllowAny]
    serializer_class = CommentSerializer


    
    # POST Method create a new comment
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments
    def create_comment(self, request,  *args, **kwargs):
        # print(author_id) #404hhh
        # print(post_id) #edb04567-c77f-4886-b87d-797bc5ce3ad1

        # get data from request
        # http://localhost:8000/authors/404hhh
        current_author_id = getAuthorIDFromRequestURL(request, kwargs['author_id'])
        comment_content = request.data.get('content')

        # create the data for comment
        publish_time = datetime.datetime.utcnow().replace(
            tzinfo=datetime.timezone.utc).isoformat()
        comment_uuid = str(uuid.uuid4().hex)
        comment_type = "text/markdown"

        #get post origin author
        post_id = getPostIDFromRequestURL(current_author_id, kwargs['post_id'])
        post = Post.objects.get(id=post_id)
        # http://127.0.0.1:8000/authors/1111111111/posts/e164864f-1bf3-458c-bf50-a9627f275395/comments/960fb760b84342c7b14f88eadf83a408
        comment_id = post_id + f'/comments/{comment_uuid}'
        current_author = Author.objects.get(id=current_author_id)
        author_info = AuthorSerializer(current_author)
        author_json = author_info.data

        #save in database and response message
        Comment.objects.create(id=comment_id, author=current_author_id, comment=comment_content,
                               contentType=comment_type, published=publish_time)

        # add comment in post taoble
        post.comments = comment_id
        post.count += 1

        # print(post.count)
        post.save()

        response_msg = {"type": "comment",
                        "author": author_json,
                        "comment": post.comments,
                        "contentType": comment_type,
                        "published": publish_time,
                        "id": comment_id}

        Inbox.objects.create(author=current_author_id, message=response_msg)
        # print("UPDATE COMMENT TO INBOX")
        # inbox_view.InboxViewSet.creat_comment_rec(self, author_id, post_data)

        return JsonResponse(response_msg)

    # URL://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments
    # http://service/authors/{authors_id}/posts/{post_id}/comments?page=4&size=40
    # GET Method list all comments pagination
    def all_post_comments(self, request, *args, **kwargs):

        current_author_id = getAuthorIDFromRequestURL(request, kwargs['author_id'])
        post_id = getPostIDFromRequestURL(current_author_id, kwargs['post_id'])
        #check url have to pagenation
        url = request.build_absolute_uri()
        is_pagination = True if 'page' in url else False

        # use post uuid get all comment correspond to this post and save in a list
        comments = []
        post = Post.objects.get(id=post_id)
        author = Author.objects.get(id=current_author_id)
        username = author.displayName

        if post.comments == None:
            return Response({})

        else:

            comment_list = post.comments.split("/n")

            # parse all comments to dictionary

            for item in comment_list:
                try:
                    comments_queryset = Comment.objects.get(id=item)
                    comments.append(comments_queryset)
                except:
                    pass

            if is_pagination:
                # set up pagination
                size = request.build_absolute_uri()[-1]
                pagination = Paginator(comments, size)
                page = request.GET.get('page')
                comments = pagination.get_page(page)

            else:
                size = len(comment_list)
                page = 1

            all_comments = CommentSerializer(comments, many=True)
            real_comment_id = post_id + f'/comments'
            comments_response = {
                "type": "comments",
                "page": page,
                "size": size,
                "post": post_id,
                "id": real_comment_id,
                "comments": all_comments.data
            }

            return Response(comments_response)

