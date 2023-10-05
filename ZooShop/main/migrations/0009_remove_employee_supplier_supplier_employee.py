# Generated by Django 4.2.5 on 2023-09-15 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_employee_supplier_alter_supplier_phone'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='supplier',
        ),
        migrations.AddField(
            model_name='supplier',
            name='employee',
            field=models.ManyToManyField(null=True, to='main.employee'),
        ),
    ]
