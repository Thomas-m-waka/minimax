# Generated by Django 4.1.5 on 2023-07-08 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('max', '0020_alter_withoutvehicle_id_picture_front'),
    ]

    operations = [
        migrations.AlterField(
            model_name='withoutvehicle',
            name='id_picture_front',
            field=models.ImageField(max_length=512, upload_to='images'),
        ),
    ]