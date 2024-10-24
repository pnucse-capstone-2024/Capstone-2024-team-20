# Use Node.js v20 for base image
FROM node:20 as build

# Configure work directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source codes
COPY . .

# Build react application
RUN npm run build

# Use Nginx to serve static files
FROM nginx:1.27

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Change authority of build files
RUN chown -R nginx:nginx /usr/share/nginx/html

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
