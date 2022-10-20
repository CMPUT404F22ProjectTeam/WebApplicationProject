# Generated by Django 3.1.6 on 2022-10-20 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0007_auto_20221020_2309'),
    ]

    operations = [
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('context', models.CharField(default='', max_length=255)),
                ('summary', models.CharField(default='', max_length=255)),
                ('author', models.URLField(default='', max_length=255)),
                ('object', models.URLField(default='', max_length=255)),
            ],
        ),
    ]
