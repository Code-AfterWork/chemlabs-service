# Generated by Django 4.2 on 2023-07-05 18:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Issues',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('equipment', models.CharField(max_length=30)),
                ('issue', models.CharField(max_length=30)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Facility', to=settings.AUTH_USER_MODEL)),
                ('serial_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.equipments')),
            ],
        ),
    ]
