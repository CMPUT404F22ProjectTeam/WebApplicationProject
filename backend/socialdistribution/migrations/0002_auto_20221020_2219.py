# Generated by Django 3.1.6 on 2022-10-20 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='displayName',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='author',
            name='github',
            field=models.URLField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='author',
            name='host',
            field=models.URLField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='author',
            name='profileImage',
            field=models.ImageField(blank=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='author',
            name='url',
            field=models.URLField(default='', max_length=255),
        ),
    ]