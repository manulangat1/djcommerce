# FROM python:3.6
# ENV PYTHONUNBUFFERED 1
# WORKDIR /code
# VOLUME /code
# ADD . /code
# RUN pip install -r requirements.txt
# CMD ["sh", "entry.sh"]


# === Stage 1: Builder ===
FROM python:3.6 AS builder

ENV PYTHONUNBUFFERED 1
WORKDIR /code

# Copy only requirements first for better cache use
COPY requirements.txt /code/

# Install dependencies
RUN pip install --upgrade pip && \
    pip install --user -r requirements.txt

# === Stage 2: Final image ===
FROM python:3.6

ENV PYTHONUNBUFFERED 1
WORKDIR /code
VOLUME /code

# Copy source code
COPY . /code

# Copy installed Python packages from builder
COPY --from=builder /root/.local /root/.local

# Make sure PATH includes local bin (for installed scripts)
ENV PATH=/root/.local/bin:$PATH



# Collect static files at build time
RUN python manage.py collectstatic --noinput

# CMD ["sh", "entry.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
