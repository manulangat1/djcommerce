# Generated by Django 2.2.6 on 2019-11-02 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20191102_1734'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
    ]
