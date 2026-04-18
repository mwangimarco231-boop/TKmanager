from rest_framework import serializers
from .models import Tasks
from django.contrib.auth.models import User


class TaskSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = [
            'id',
            'title',
            'description',
            'completed',
            'updated_at',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at', 'completed_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        # .create_user handles password hashing automatically
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
        return user
