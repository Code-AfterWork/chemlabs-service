# Generated by Django 4.2 on 2023-07-10 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0002_remove_ticket_assigned_to_remove_ticket_created_by_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.institution')),
            ],
        ),
    ]