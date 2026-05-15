from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
import datetime


class OctoFitAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(email='ironman@avengers.com', username='ironman', password='password123')
        self.team = Team.objects.create(name='Team Marvel', members=['ironman', 'captainamerica'])
        self.activity = Activity.objects.create(user='ironman', activity_type='running', duration=30.0, date=datetime.date(2024, 1, 1))
        self.leaderboard = Leaderboard.objects.create(user='ironman', score=300)
        self.workout = Workout.objects.create(name='Avengers Cardio Blast', description='High intensity cardio', duration=30)

    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {'email': 'thor@avengers.com', 'username': 'thor', 'password': 'password123'}
        response = self.client.post('/api/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_team(self):
        data = {'name': 'Team DC', 'members': ['batman', 'superman']}
        response = self.client.post('/api/teams/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_activity(self):
        data = {'user': 'thor', 'activity_type': 'walking', 'duration': 60.0, 'date': '2024-01-03'}
        response = self.client.post('/api/activities/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_leaderboard_entry(self):
        data = {'user': 'thor', 'score': 600}
        response = self.client.post('/api/leaderboard/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_workout(self):
        data = {'name': 'Thunder Strength', 'description': 'Thor-inspired lifting', 'duration': 60}
        response = self.client.post('/api/workouts/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
