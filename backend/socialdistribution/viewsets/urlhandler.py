from urllib.parse import urlparse

def get_Safe_url(url):
    url = urlparse(url)
    host = ''
    if url.port: # exist port
        host = '{url.scheme}://{url.hostname}:{url.port}'.format(url=url)
    else:
        # port does not exist
      if url.scheme == 'http':
          host = 'http://{url.hostname}'.format(url=url)
      else:
          host = 'https://{url.hostname}'.format(url=url)

    return host
