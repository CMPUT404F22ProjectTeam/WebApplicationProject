# Generated by Django 4.1.2 on 2022-11-25 03:04

from django.db import migrations, models
import socialdistribution.models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0029_alter_inbox_message'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inbox',
            name='message',
            field=models.JSONField(default=socialdistribution.models.default_list, null=True),
        ),
    ]