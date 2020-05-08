from rest_framework import generics, permissions

from . import models, serializers


class SecretListView(generics.ListAPIView):
    queryset = models.Secret.objects.all()
    serializer_class = serializers.SecretSerializer
    permission_classes = [permissions.IsAuthenticated]
