# Active Context

## Current State
Project is in initial setup phase. No application code exists yet — only scaffolding, instructions, and workflow files.

## Immediate Next Steps
1. Create `octofit-tracker/backend/` and `octofit-tracker/frontend/` directories
2. Create `octofit-tracker/backend/requirements.txt` with required packages
3. Create Python virtual environment at `octofit-tracker/backend/venv`
4. Install requirements via pip
5. Create Django project using `django-admin startproject octofit_tracker` in `octofit-tracker/backend/`
6. Configure MongoDB (`octofit_db`) in `settings.py` using Djongo
7. Run `makemigrations` and `migrate`
8. Populate DB with test data via management command
9. Scaffold React frontend

## Key Constraints
- Never `cd` into directories when running commands — always point to the directory in the command
- Use Django ORM only (no direct MongoDB scripts) for DB operations
- Test data should use superhero themes (Marvel/DC teams)
