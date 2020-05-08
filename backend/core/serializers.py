from rest_framework import serializers

from . import models


class SecretSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Secret
        fields = ('key', 'value')
