# Generated by Django 4.2.5 on 2023-09-24 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_remove_employee_supplier_profile_supplier'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='birthdate',
            field=models.DateField(null=True),
        ),
    ]
