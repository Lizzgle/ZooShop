# Generated by Django 4.2.5 on 2023-09-15 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_remove_supplier_employee_employee_supplier'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='supplier',
        ),
        migrations.AddField(
            model_name='profile',
            name='supplier',
            field=models.ManyToManyField(null=True, to='main.supplier'),
        ),
    ]
