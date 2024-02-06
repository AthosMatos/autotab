# Step 1: Build the React application

# Use an official Node.js as a parent image
FROM node:alpine as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the React application from Nginx

# Use an official Nginx image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
