# Generated by Django 4.2.5 on 2023-09-15 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_remove_employee_supplier_supplier_employee'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='supplier',
            name='employee',
        ),
        migrations.AddField(
            model_name='employee',
            name='supplier',
            field=models.ManyToManyField(null=True, to='main.supplier'),
        ),
    ]
