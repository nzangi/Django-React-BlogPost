# Generated by Django 5.0.2 on 2024-03-08 15:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0002_comments_date_commented'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comments',
            options={'ordering': ['-date_commented']},
        ),
    ]
