# Generated by Django 3.1.6 on 2022-10-20 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0008_likes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Inbox',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(default='', max_length=256)),
                ('message', models.JSONField(null=True)),
            ],
        ),
    ]