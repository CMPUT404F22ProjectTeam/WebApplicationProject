from urllib.parse import urlparse

def get_Safe_url(url):
    url = urlparse(url)
    return url.scheme + "://" + url.netloc + url.path
