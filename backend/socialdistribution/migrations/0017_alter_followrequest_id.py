# Generated by Django 4.1.2 on 2022-10-27 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0016_alter_post_source'),
    ]

    operations = [
        migrations.AlterField(
            model_name='followrequest',
            name='id',
            field=models.CharField(max_length=255, primary_key=True, serialize=False),
        ),
    ]
