# Generated by Django 3.1.6 on 2022-10-20 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0002_auto_20221020_2219'),
    ]

    operations = [
        migrations.CreateModel(
            name='FollowRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('summary', models.CharField(max_length=255)),
                ('actor', models.CharField(max_length=255)),
                ('object', models.CharField(max_length=255)),
            ],
        ),
    ]