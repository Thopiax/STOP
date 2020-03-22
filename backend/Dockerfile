FROM python:3.6.4

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

COPY . /app/backend

EXPOSE 5000
ENTRYPOINT ["python", "-m", "backend.service"] 

