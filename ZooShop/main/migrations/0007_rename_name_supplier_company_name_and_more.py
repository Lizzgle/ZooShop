# Generated by Django 4.2.5 on 2023-09-15 02:18

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_purchase_supplier'),
    ]

    operations = [
        migrations.RenameField(
            model_name='supplier',
            old_name='name',
            new_name='company_name',
        ),
        migrations.RemoveField(
            model_name='supplier',
            name='surname',
        ),
        migrations.AlterField(
            model_name='supplier',
            name='phone',
            field=models.CharField(default='+375 29 XXXXXXX', max_length=13, validators=[django.core.validators.RegexValidator(message="Phone number must be in the format: '+375 29 XXXXXXX'", regex='^\\+375 \\d{2} \\d{7}$')]),
        ),
    ]