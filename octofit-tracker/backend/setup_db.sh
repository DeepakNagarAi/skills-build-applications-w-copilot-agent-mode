#!/bin/bash
# Run from repo root — do not cd into directories

# Activate venv
source octofit-tracker/backend/venv/bin/activate

# Run migrations
python octofit-tracker/backend/manage.py makemigrations
python octofit-tracker/backend/manage.py migrate

# Populate DB
python octofit-tracker/backend/manage.py populate_db

# Verify with mongosh
mongosh octofit_db --eval "
  db.getCollectionNames().forEach(col => {
    print('\\n=== ' + col + ' ===');
    printjson(db[col].findOne());
  });
"
