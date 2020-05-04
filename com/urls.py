from django.contrib import admin
from django.conf.urls.static import static
from django.conf.urls import url,include
from django.conf import settings
from django.conf import settings
import re
urlpatterns = [
    url(r'^accounts/', include('allauth.urls')),
    url('admin/', admin.site.urls),
    url(r'api/',include('core.urls',namespace="core")),
    url(r'',include('frontend.urls'))
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns+= static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
# if not settings.DEBUG:
#     urlpatterns += [re.path(r'^.*'),TemplateView.as_view(template_name='index.html')]