"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include

from drf_yasg import openapi

from drf_yasg.views import get_schema_view as swagger_get_schema_view

from rest_framework_jwt.views import obtain_jwt_token as obtainJwtToken
# from rest_framework_jwt.views import refresh_jwt_token


schema_view = swagger_get_schema_view(
    openapi.Info(
        title="Socialdistribution API",
        default_version="1.0.0",
        description="API documentation of APP"
    ),
    public=True,
)

urlpatterns = [
    path('', include('socialdistribution.urls')),
    path('admin/', admin.site.urls),

    path('api/v1/',
         include([
             path('swagger/schema/', schema_view.with_ui('swagger',
                                                         cache_timeout=0), name="swagger-schema"),
         ])
         ),
    path('token-auth/', obtainJwtToken),

]


# path(r'^api-token-refresh/', refresh_jwt_token),
