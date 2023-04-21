# Build stage
FROM node:14.15.5-alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application to the working directory
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:1.21.3-alpine

# Copy the build directory from the previous stage to the Nginx server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
