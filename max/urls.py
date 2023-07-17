from django.urls import path
from .views import HomePageView,WithVehicle,WithoutVehicle,UpdateWithVehicleTimeOutView,UpdateWithoutVehicleTimeOutView
from django.urls import re_path
from django.views.generic import TemplateView
from . import views
from .views import ExitWithoutVehicle,ExitWithVehicle
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
path("",HomePageView.as_view(),name="home"),
path("withvehicle/",WithVehicle.as_view(),name="withvehicle"),
path("withoutvehicle/",WithoutVehicle.as_view(),name="withoutvehicle"),
path('update_withvehicle_time_out/<int:withvehicle_id>/', UpdateWithVehicleTimeOutView.as_view(), name='update_withvehicle_time_out'),
path('update_withoutvehicle_time_out/<int:withoutvehicle_id>/', UpdateWithoutVehicleTimeOutView.as_view(), name='update_withoutvehicle_time_out'),
path('ExitWithoutVehicle/',ExitWithoutVehicle.as_view(),name='ExitWithoutVehicle'),
path('ExitWithVehicle/',ExitWithVehicle.as_view(),name='ExitWithVehicle'),
re_path(r'^.*/$',TemplateView.as_view(template_name='404.html')),
]

