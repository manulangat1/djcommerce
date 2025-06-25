#!/bin/bash

echo Running collectstatic!

# python3 manage.py collectstatic --no-input

echo "Starting CMD: $@"
exec "$@"