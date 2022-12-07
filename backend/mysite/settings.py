"""
Django settings for mysite project.

Generated by 'django-admin startproject' using Django 3.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os
from pathlib import Path
import django_on_heroku

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'g*vfd9q12!^)i8iauztr4n*mgu9m*xlk5hp8t*7(4(h%+3p_di'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'socialdistribution',
    'corsheaders',
    'drf_yasg',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'mysite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mysite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# cite from
# https://www.youtube.com/watch?v=dYDoGHV-9hY
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'd61t5m59r5hh02',
        'USER': 'tsumkmeykfefgj',
        'PASSWORD': 'da16de73f71592ccbd769ee2145883a0141e5ed73bdbf9f96efb0cb4ac2f60de',
        'HOST': 'ec2-44-209-24-62.compute-1.amazonaws.com',
        'PORT': 5432
    # },
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql',
    #     'NAME': 'postgres',
    #     'USER': 'postgres',
    #     'PASSWORD': 'mysite',
    #     'HOST': '127.0.0.1',
    #     'PORT': '5432',
    }
}
# 'NAME':'postgres',
#         'USER':'postgres',
#         'PASSWORD':'mysite',
#         'HOST': '127.0.0.1',
#         'PORT': '5432'
# postgres://bxcjbfoqiaefgn:b9976001b7740660c9805b2718a549263b6440a4bca5c42ac051a2833a5df004@ec2-52-1-17-228.compute-1.amazonaws.com:5432/d9vf71ecj532f3
# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # 'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static/'),
# ]


STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

AUTH_USER_MODEL = 'socialdistribution.Author'

CORS_ALLOW_ALL_ORIGINS = True

CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

CORS_ORIGIN_WHITELIST = (
    'http://127.0.0.1:8000',
    'http://localhost:8000',
    'http://localhost:3000',
)

JWT_AUTH = {
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'mysite.utils.my_jwt_response_handler',
    'JWT_VERIFY_EXPIRATION': False,
}

MEDIA_ROOT = os.path.join(BASE_DIR, 'static/media') 
MEDIA_URL = '/IMG/'
django_on_heroku.settings(locals())
