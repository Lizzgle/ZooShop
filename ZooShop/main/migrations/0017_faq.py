# Generated by Django 4.2.5 on 2023-09-25 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_news_little_content'),
    ]

    operations = [
        migrations.CreateModel(
            name='Faq',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(blank=True, max_length=64)),
                ('content', models.TextField()),
            ],
        ),
    ]
