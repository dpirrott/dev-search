# Generated by Django 4.0.6 on 2022-07-30 19:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_review_trigger'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='trigger',
        ),
    ]
