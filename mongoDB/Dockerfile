# Use the official MongoDB image
FROM mongo:5

# Expose MongoDB's default port
EXPOSE 27017

# Set environment variables for authentication (optional)
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=securepassword

# Use a volume for persistent data storage
VOLUME /data/db

# Default command to start MongoDB
CMD ["mongod", "--bind_ip_all"]