from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    ordering = ("email",)

    list_display = (
        "email",
        "name",
        "college_name",
        "role",
        "is_staff",
        "is_active",
    )

    search_fields = (
        "email",
        "name",
        "college_name",
    )


