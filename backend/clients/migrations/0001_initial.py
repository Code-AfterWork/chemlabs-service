# Generated by Django 4.2 on 2023-07-10 17:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0002_remove_ticket_assigned_to_remove_ticket_created_by_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('equipment', models.CharField(max_length=30)),
                ('title', models.CharField(max_length=30)),
                ('status', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=30)),
                ('completed', models.BooleanField(blank=True, default=False, null=True)),
                ('assigned_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='completed_tickets', to='employees.employee')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('serial_number', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='core.equipment')),
            ],
        ),
    ]
