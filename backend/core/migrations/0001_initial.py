# Generated by Django 4.2 on 2023-07-29 08:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('clients', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('equipment_name', models.CharField(max_length=30)),
                ('serial_number', models.CharField(max_length=50, primary_key=True, serialize=False, unique=True)),
                ('install_date', models.DateField()),
                ('contract_end', models.DateField()),
                ('status', models.BooleanField()),
                ('first_serv', models.DateField(blank=True, null=True)),
                ('second_serv', models.DateField(blank=True, null=True)),
                ('validation', models.BooleanField(blank=True, null=True)),
                ('contract_type', models.CharField(max_length=30)),
                ('contract_renewal_month', models.DateField(blank=True)),
                ('last_service', models.DateField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('_id', models.AutoField(primary_key=True, serialize=False)),
                ('region', models.CharField(max_length=30)),
                ('name', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.IntegerField(null=True)),
                ('contact_person', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='JobCard',
            fields=[
                ('jobcard_id', models.AutoField(primary_key=True, serialize=False)),
                ('received_by', models.CharField(max_length=30)),
                ('requested_by', models.CharField(max_length=30)),
                ('ok_checklist', models.CharField(max_length=30, null=True)),
                ('faulty_checklist', models.CharField(max_length=30, null=True)),
                ('spare_used', models.CharField(max_length=30)),
                ('labor_charge', models.CharField(max_length=30)),
                ('total_cost', models.CharField(max_length=30)),
                ('jobcard_created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('uploaded_media', models.FileField(blank=True, null=True, upload_to='jobcards/')),
                ('contract_type', models.CharField(choices=[('comprehensive', 'Comprehensive'), ('on_call', 'On-Call'), ('reagent', 'Reagent'), ('standard', 'Standard'), ('warranty', 'Warranty'), ('break_down', 'Break Down')], default='', max_length=30)),
                ('jobcard_type', models.CharField(choices=[('application', 'Application'), ('service', 'Service')], default='service', max_length=30)),
                ('root_cause', models.TextField(blank=True)),
                ('comments', models.TextField(blank=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='engineer_jobcards', to=settings.AUTH_USER_MODEL)),
                ('equipment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.equipment')),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.institution')),
                ('ticket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clients.ticket')),
            ],
            options={
                'ordering': ('-jobcard_created_at',),
            },
        ),
        migrations.AddField(
            model_name='equipment',
            name='institution',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='equipments', to='core.institution'),
        ),
    ]
