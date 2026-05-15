from django.db import models


class User(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=255)

    class Meta:
        db_table = 'users'


class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.JSONField(default=list)

    class Meta:
        db_table = 'teams'


class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity_type = models.CharField(max_length=100)
    duration = models.FloatField()
    date = models.DateField()

    class Meta:
        db_table = 'activities'


class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    score = models.IntegerField(default=0)

    class Meta:
        db_table = 'leaderboard'


class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.IntegerField()

    class Meta:
        db_table = 'workouts'
