# Generated by Django 4.1.2 on 2022-10-26 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0013_merge_20221025_0630'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='uuid',
            field=models.CharField(max_length=60, null=True),
        ),
    ]
