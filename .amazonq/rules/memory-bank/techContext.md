# Technical Context

## Backend (Django)

### Key Packages (requirements.txt)
- Django==4.1.7
- djangorestframework==3.14.0
- django-cors-headers==4.5.0
- djongo==1.3.6
- pymongo==3.12
- sqlparse==0.2.4

### settings.py Requirements
```python
import os
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
if os.environ.get('CODESPACE_NAME'):
    ALLOWED_HOSTS.append(f"{os.environ.get('CODESPACE_NAME')}-8000.app.github.dev")
```
- INSTALLED_APPS must include: `octofit_tracker`, `rest_framework`, `djongo`, `corsheaders`
- CORS: allow all origins, methods, and headers
- DB engine: `djongo`, name: `octofit_db`, no auth required

### urls.py Pattern
```python
import os
codespace_name = os.environ.get('CODESPACE_NAME')
base_url = f"https://{codespace_name}-8000.app.github.dev" if codespace_name else "http://localhost:8000"
```

### Serializers
- Must convert ObjectId fields to strings

### DB Collections
- users (unique index on `email`)
- teams
- activities
- leaderboard
- workouts

### Management Command
- Path: `octofit-tracker/backend/octofit_tracker/management/commands/populate_db.py`
- Uses Django ORM for all data operations
- Sample data: superhero themes, Team Marvel & Team DC

## Frontend (React)

### Setup Commands
```bash
npx create-react-app octofit-tracker/frontend --template cra-template --use-npm
npm install bootstrap --prefix octofit-tracker/frontend
npm install react-router-dom --prefix octofit-tracker/frontend
```
- Add Bootstrap CSS import at top of `src/index.js`
- App image: `docs/octofitapp-small.png`

## MongoDB
- Check if running: `ps aux | grep mongod`
- Client: `mongosh`
- Package: `mongodb-org`
