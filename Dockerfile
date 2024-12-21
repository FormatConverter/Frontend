# Use Node.js as the base image for building the app
FROM node:18-slim as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# Build the React application
RUN npm run build

# Use Nginx as the final image to serve the React app
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
