# Use Node.js official image as base
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


#FROM node:18-alpine as build

# Set working directory
#WORKDIR /app

# Copy package files
#COPY package*.json ./

# Install dependencies
#RUN npm ci --only=production

# Copy source code
#COPY . .

# Build the application
#RUN npm run build

# Use nginx to serve the built app
FROM nginx:alpine

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
