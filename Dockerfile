# Use an official NGINX image
FROM nginx:alpine

# Copy your application files to the NGINX web root
COPY nginx.conf /etc/nginx/nginx.conf


# Expose the default NGINX HTTP port
EXPOSE 80
