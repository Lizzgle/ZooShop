# Generated by Django 4.2.5 on 2023-09-15 02:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_employee_options_alter_employee_managers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchase',
            name='supplier',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='main.supplier'),
        ),
    ]
