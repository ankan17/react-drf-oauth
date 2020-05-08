from django.db import models


class Secret(models.Model):
    key = models.TextField()
    value = models.IntegerField()

    def __str__(self):
        return self.key
