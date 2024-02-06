FROM python:3.9-slim

WORKDIR /usr/src/app

COPY requirements.txt ./

# Install dependencies in a single layer
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 80

CMD ["python", "./server.py"]
