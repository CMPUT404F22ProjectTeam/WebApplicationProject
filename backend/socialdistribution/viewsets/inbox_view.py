import datetime
from urllib import response
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import uuid
from django.http import JsonResponse
from socialdistribution.models import *
from socialdistribution.serializers import *
from . import urlhandler

# HOST = 'http://127.0.0.1:8000'



def getAuthorIDFromRequestURL(request, id):
    host = urlhandler.get_Safe_url(request.build_absolute_uri())
    author_id = f"{host}/authors/{id}"
    return author_id



class InboxViewSet(viewsets.ModelViewSet):
    serializer_class = InboxSerializer
    # The inbox is all the new posts from who you follow
    # URL: : // service/authors/{AUTHOR_ID}/inbox


    # URL: : // service/authors/{AUTHOR_ID}/inbox
    # GET[local]: if authenticated get a list of posts sent to AUTHOR_ID(paginated)
    def getInbox(self, request, *args, **kwargs):
        # author_id = getAuthorIDFromRequestURL(request, kwargs['author_id'])
        url = request.build_absolute_uri()
        author_id = url[:-6]
        try:
            inbox = Inbox.objects.filter(author=author_id)
        except Inbox.DoesNotExist:
            message = []
            inbox = Inbox.objects.create(author=author_id, message=message)
            # inbox_data = {
            #     'type': 'inbox',
            #     'author': author_id,
            #     'message': []
            # }
            # inbox = Inbox.objects.get(author=author_id)
            return Response(InboxSerializer(inbox).data)

        inbox = list(inbox.values())
        inbox_info = InboxSerializer(inbox, many=True)
        # inbox_info = []
        # for content in inbox:
        #     inbox_info.append(content.get('message'))


        inbox_data = {
            'type': 'inbox',
            'author': author_id,
            'message': inbox_info.data
        }
        return Response(InboxSerializer(inbox_data).data)

    # URL: : // service/authors/{AUTHOR_ID}/inbox
    # POST[local, remote]: send a post to the author
    # if the type is “post” then add that post to AUTHOR_ID’s inbox
    # if the type is “follow” then add that follow is added to AUTHOR_ID’s inbox to approve later
    # if the type is “like” then add that like to AUTHOR_ID’s inbox
    # if the type is “comment” then add that comment to AUTHOR_ID’s inbox
    def postInbox(self, request, *args, **kwargs):
        RequestData = request.data.copy()
        author_id = getAuthorIDFromRequestURL(request, kwargs.get('author_id'))
        type = RequestData.get('type', None)
        # message = RequestData.get('type', None)
        # inbox = Inbox.objects.filter(author=author_id)
        # if inbox.exists():

        #     inbox = Inbox.objects.get(author=author_id)
        # else:
        #     Inbox.objects.create(author=author_id)
        #     inbox = Inbox.objects.get(author=author_id)

        # if type == "post":

        # elif type == "follow":
        #     pass
        # elif type == "like":
        #     pass
        # elif type == "comment":
        #     pass


        Inbox.objects.create(author=author_id, message=RequestData)


        return Response(RequestData)

    # URL: : // service/authors/{AUTHOR_ID}/inbox
    # DELETE[local]: clear the inbox
    def deleteInbox(self, request, *args, **kwargs):
        author_id = getAuthorIDFromRequestURL(request, kwargs['author_id'])
        Inbox.objects.filter(author=author_id).delete()
        # inbox = Inbox.objects.filter(author=author_id)
        # if inbox.exists():
        #     inbox = get_object_or_404(Inbox, author=author_id)
        #     inbox.message.clear()
        #     inbox.save()


        # inbox_data = {
        #     'type': 'inbox',
        #     'author': author_id,
        #     'message': []
        # }
        return Response("Inbox has deleted with author id: {0}".format(author_id))


    # # if authenticated get a list of posts sent to AUTHOR_ID (paginated)
    # # POST [local]: if authenticated get a list of posts sent to AUTHOR_ID (paginated)
    # # URL: ://service/authors/{AUTHOR_ID}/inbox


    # def creat_post_rec(self, author_id, item):
    #     # type POST
    #     # find the record in database

    #     # update message
    #     inbox = Inbox.objects.get(author=author_id)
    #     items=inbox.message
    #     items.append(item)
    #     inbox.message = items
    #     inbox.save()


    #     # try:
    #     #     print("GO TRY___________")
    #     #     inbox = Inbox.objects.get(author=author_id)
    #     #     items=inbox.message
    #     #     items.append(item)
    #     #     print("AFTER _________"+items)
    #     #     inbox.message = items
    #     #     inbox.save()
    #     #     print("FINISH UPDATE")
    #     # except:
    #     #     items_list=[]
    #     #     items_list.append(item)
    #     #     Inbox.objects.create(author=author_id, message=items_list)


    #     return

    # def creat_comment_rec(self, author_id, item):

    #     print("TRANSFER TO INBOX")
    #     # update comment in inbox
    #     inbox = Inbox.objects.get(author=author_id)
    #     items=inbox.message
    #     items.append(item)
    #     inbox.message = items
    #     inbox.save()
    #     return
