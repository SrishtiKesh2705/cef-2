from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import UserManager

class User(AbstractUser):

    class Role(models.TextChoices):
        STUDENT="STUDENT","Student"
        CLUB="CLUB","Club"
        ADMIN="ADMIN","Admin"

    username=None
    name=models.CharField(max_length=100)
    college_name=models.CharField(max_length=150)
    email=models.EmailField(unique=True)
    role=models.CharField(
        max_length=10,
        choices=Role.choices
    )

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["name","college_name","role"]

    objects=UserManager()