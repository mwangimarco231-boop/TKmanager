from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Tasks
from .serializers import TaskSerializers, UserSerializer
from django.contrib.auth.models import User

# Create your views here.


class TasksVewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tasks.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
