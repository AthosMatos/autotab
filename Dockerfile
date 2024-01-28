# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir asyncio websockets numpy scipy librosa keras midi2audio midiutil tensorflow soundfile

# Make port 50007 available to the world outside this container
EXPOSE 50007

# Run app.py when the container launches
CMD ["python", "./server.py"]
