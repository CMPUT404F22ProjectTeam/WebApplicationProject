# Generated by Django 4.1.2 on 2022-10-30 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0019_remove_comment_username_alter_followrequest_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='followrequest',
            name='id',
            field=models.CharField(max_length=255, primary_key=True, serialize=False),
        ),
    ]
