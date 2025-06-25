#!/bin/bash

echo Running collectstatic!
# exec gunicorn com.wsgi:application \
#     --bind 0.0.0.0:8000 \
#     --workers 3
exec python3 manage.py collectstatic --no-input