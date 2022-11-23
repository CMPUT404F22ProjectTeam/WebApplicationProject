from rest_framework import viewsets
from socialdistribution.models import Inbox


HOST = 'http://127.0.0.1:8000'

class InboxViewSet(viewsets.ModelViewSet):

    # if authenticated get a list of posts sent to AUTHOR_ID (paginated)
    # POST [local]: if authenticated get a list of posts sent to AUTHOR_ID (paginated)
    # URL: ://service/authors/{AUTHOR_ID}/inbox
    
    def creat_post_rec(self, author_id, item):
        # type POST
        # find the record in database

        # update message
        inbox = Inbox.objects.get(author=author_id)
        items=inbox.message
        items.append(item)
        inbox.message = items
        inbox.save()
        
        # try:
        #     print("GO TRY___________")
        #     inbox = Inbox.objects.get(author=author_id)
        #     items=inbox.message
        #     items.append(item)
        #     print("AFTER _________"+items)
        #     inbox.message = items
        #     inbox.save()
        #     print("FINISH UPDATE")
        # except:
        #     items_list=[]
        #     items_list.append(item)
        #     Inbox.objects.create(author=author_id, message=items_list)

        return    
    
    def creat_comment_rec(self, author_id, item):
        
        print("TRANSFER TO INBOX")
        # update comment in inbox
        inbox = Inbox.objects.get(author=author_id)
        items=inbox.message
        items.append(item)
        inbox.message = items
        inbox.save()
        return 




