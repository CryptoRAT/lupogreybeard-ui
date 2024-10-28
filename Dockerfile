# Build the React app
FROM node:20.16-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Build the React app for production
RUN yarn run build

# Stage 2: Serve the built app using a static file server (nginx)
FROM nginx:alpine

# Copy the built React app from the previous stage to the NGINX public directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom NGINX configuration file
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to serve the app
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
