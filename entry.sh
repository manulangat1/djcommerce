#!/bin/bash

echo Starting Django-React Blueprint with Gunicorn!
exec gunicorn com.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3