# Generated by Django 3.1.6 on 2022-10-21 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0009_inbox'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='admin_permission',
            field=models.BooleanField(default='False'),
        ),
    ]
