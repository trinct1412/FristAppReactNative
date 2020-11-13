# Generated by Django 2.2.6 on 2019-11-11 06:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('asendo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='evaluation',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invoice', to=settings.AUTH_USER_MODEL),
        ),
    ]