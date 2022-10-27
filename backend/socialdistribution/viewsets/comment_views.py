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


'''
URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments

GET [local, remote] get the list of comments of the post whose id is POST_ID (paginated)
POST [local] if you post an object of “type”:”comment”, it will add your comment to the post whose id is POST_ID
'''

HOST = 'http://127.0.0.1:8000'

def real_post_id(request):
    url = request.build_absolute_uri()[:-1]
    post_id = url.split('/')[6]
    return post_id

def current_id(request):
    url = request.build_absolute_uri()[:-1]
    author_id = url.split('/')[4]
    current_author_id = HOST + f'/authors/{author_id}'
    return current_author_id



class CommentViewSet(viewsets.ModelViewSet):
    # POST Method create a new comment
    # URL: ://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments 
    def create_comment(self, request, author_id, post_id):
        # print(author_id) #404hhh
        # print(post_id) #edb04567-c77f-4886-b87d-797bc5ce3ad1

        # get data from request
        current_author_id = current_id(request) # http://localhost:8000/authors/404hhh
        comment_content = request.data.get('content')

        # create the data for comment
        publish_time = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
        comment_uuid = str(uuid.uuid4().hex)
        comment_type = "text/markdown"

        #get post origin author
        post = Post.objects.get(uuid=post_id)
        comment_id = post.id + comment_uuid # http://127.0.0.1:8000/authors/test000/posts/edb04567-c77f-4886-b87d-797bc5ce3ad1
        current_author = Author.objects.get(id = current_author_id)
        author_info = AuthorSerializer(current_author)
        author_json = author_info.data

        #save in database and response message
        Comment.objects.create(id=comment_id, author=current_author_id, comment=comment_content,
        contentType=comment_type, published=publish_time)

        # add comment in post taoble
        post.comments = str(comment_id) + '/n'+ str(post.comments)
        
        print(">>>>>>>>>>>>>>>>>>>>>")
        print(post.comments)
        post.save()

        response_msg = {"type":"comment",
        "author": author_json,
        "comment": post.comments,
        "contentType": comment_type,
        "published": publish_time,
        "id": comment_id}

        return JsonResponse(response_msg)

    # URL://service/authors/{AUTHOR_ID}/posts/{POST_ID}/comments
    # http://service/posts/{post_id}/comments?page=4&size=40 
    # GET Method list all comments pagination
    def all_post_comments(self, request, author_id, post_id):
        
        #check url have to pagenation
        url = request.build_absolute_uri()
        is_pagination = True if 'page' in url else False
        
        # use post uuid get all comment correspond to this post and save in a list
        comments = []
        post = Post.objects.get(uuid=post_id)
        comment_list = post.comments.split("/n")[:-1]
        
        # parse all comments to dictionary
        for item in comment_list:
            comments_queryset = Comment.objects.get(id=item)
            comments.append(comments_queryset)


        if is_pagination:
            # set up pagination
            size = request.build_absolute_uri()[-1]
            pagination = Paginator(comments, size)
            page = request.GET.get('page')
            comments = pagination.get_page(page)

        all_comments = CommentSerializer(comments, many=True)
        real_post_id = HOST + f'/authors/{author_id}/posts/{post_id}'
        real_comment_id = real_post_id + f'/comments'
        comments_response = {
            "type": "comments",
            "page": page,
            "size": size,
            "post": real_post_id,
            "id":real_comment_id,
            "comments": all_comments.data}

        return JsonResponse(comments_response)






        


    


        