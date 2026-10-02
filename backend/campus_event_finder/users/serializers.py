from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model=User
        fields=[
            "name",
            "college_name",
            "email",
            "password",
            "role",
        ]

    def validate(self, data):
        role=data.get("role")
        email=data.get("email","").lower()

        institutional_domains=(
            ".edu",
            ".ac.in",
            ".edu.in",
            ".ac.uk",
            ".edu.au",
        )

        if role==User.Role.STUDENT:
            if not email.endswith(institutional_domains):
                raise serializers.ValidationError({
                    "email":"Students must use a valid college or institutional email."
                })

        if role==User.Role.ADMIN:
            raise serializers.ValidationError({
                "role":"Admin accounts cannot be created through normal registration."
            })

        return data

    def create(self, validated_data):
        password=validated_data.pop("password")

        user=User(**validated_data)

        user.set_password(password)
        user.save()

        return user

class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=[
            "id",
            "name",
            "role",
        ]