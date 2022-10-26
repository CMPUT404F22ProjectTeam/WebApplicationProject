# Generated by Django 4.1.2 on 2022-10-26 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0014_post_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='comments',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='count',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
