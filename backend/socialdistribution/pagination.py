# https://blog.csdn.net/weixin_42134789/article/details/109975003

from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = 'size'
    max_page_size = 1000


