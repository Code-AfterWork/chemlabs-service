from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('oauth2/', include('oauth2_provider.urls', namespace='oauth2_provider')), # <- not working for now
    path('user/', include('users.urls', namespace='users')),
    path('client/', include('clients.urls', namespace='client')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
