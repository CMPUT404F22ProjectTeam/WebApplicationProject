# Generated by Django 3.1.6 on 2022-10-21 04:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialdistribution', '0011_auto_20221021_0417'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='github',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='author',
            name='profileImage',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
