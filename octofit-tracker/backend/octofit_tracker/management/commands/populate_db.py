from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
import datetime


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Users
        users = [
            User(email='ironman@avengers.com', username='ironman', password='password123'),
            User(email='captainamerica@avengers.com', username='captainamerica', password='password123'),
            User(email='thor@avengers.com', username='thor', password='password123'),
            User(email='batman@justiceleague.com', username='batman', password='password123'),
            User(email='superman@justiceleague.com', username='superman', password='password123'),
            User(email='wonderwoman@justiceleague.com', username='wonderwoman', password='password123'),
        ]
        for user in users:
            user.save()
        self.stdout.write('Created users')

        # Teams
        Team(name='Team Marvel', members=['ironman', 'captainamerica', 'thor']).save()
        Team(name='Team DC', members=['batman', 'superman', 'wonderwoman']).save()
        self.stdout.write('Created teams')

        # Activities
        activities = [
            Activity(user='ironman', activity_type='running', duration=30.0, date=datetime.date(2024, 1, 1)),
            Activity(user='captainamerica', activity_type='strength training', duration=45.0, date=datetime.date(2024, 1, 2)),
            Activity(user='thor', activity_type='walking', duration=60.0, date=datetime.date(2024, 1, 3)),
            Activity(user='batman', activity_type='running', duration=50.0, date=datetime.date(2024, 1, 1)),
            Activity(user='superman', activity_type='strength training', duration=40.0, date=datetime.date(2024, 1, 2)),
            Activity(user='wonderwoman', activity_type='walking', duration=35.0, date=datetime.date(2024, 1, 3)),
        ]
        for activity in activities:
            activity.save()
        self.stdout.write('Created activities')

        # Leaderboard
        leaderboard = [
            Leaderboard(user='ironman', score=300),
            Leaderboard(user='captainamerica', score=450),
            Leaderboard(user='thor', score=600),
            Leaderboard(user='batman', score=500),
            Leaderboard(user='superman', score=400),
            Leaderboard(user='wonderwoman', score=350),
        ]
        for entry in leaderboard:
            entry.save()
        self.stdout.write('Created leaderboard')

        # Workouts
        workouts = [
            Workout(name='Avengers Cardio Blast', description='High intensity cardio inspired by Iron Man', duration=30),
            Workout(name='Shield Training', description='Captain America strength and agility workout', duration=45),
            Workout(name='Thunder Strength', description='Thor-inspired heavy lifting routine', duration=60),
            Workout(name='Dark Knight HIIT', description='Batman-style high intensity interval training', duration=40),
            Workout(name='Kryptonian Core', description='Superman core and endurance workout', duration=50),
            Workout(name='Amazonian Warrior', description='Wonder Woman combat and flexibility training', duration=55),
        ]
        for workout in workouts:
            workout.save()
        self.stdout.write('Created workouts')

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
