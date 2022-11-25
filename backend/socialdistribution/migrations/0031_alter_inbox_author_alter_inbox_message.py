# Generated by Django 4.1.2 on 2022-11-25 03:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import socialdistribution.models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0030_alter_inbox_message'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inbox',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='inbox',
            name='message',
            field=models.JSONField(default=socialdistribution.models.default_list),
        ),
    ]
