# Generated by Django 5.0.2 on 2024-03-08 14:58

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comments',
            name='date_commented',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
