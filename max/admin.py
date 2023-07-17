from django.contrib import admin
from django.contrib.auth.hashers import make_password
from .models import withoutvehicle,withvehicle
from django.contrib import admin
from django.contrib.auth.models import User

from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    list_filter = ('is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username',)

class withoutvehileAdmin(admin.ModelAdmin):
    list_display = ("id","id_number", "name", "phone_number", "company", "purpose","time_in", "time_out",  "today")
    list_filter = ['today']
    search_fields = ['id_number', 'name', 'phone_number', 'purpose', 'time_in', 'time_out']
    readonly_fields = ['time_in', 'time_out']
admin.site.register(withoutvehicle,withoutvehileAdmin)    
class withvehicleAdmin(admin.ModelAdmin):
    list_display = ("id", "id_number", "name", "vehicle_registration", "phone_number", "company", "purpose", "time_in", "time_out", "today")
    list_filter = ['today']
    readonly_fields = ['time_in', 'time_out']
    
admin.site.register(withvehicle,withvehicleAdmin)

