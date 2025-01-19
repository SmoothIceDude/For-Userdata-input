# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci
RUN echo "Dependencies installed and testing run command"

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Default environment variable for MongoDB (overridden via .env in production)
ENV MONGO_URI=mongodb://mongo:27017/userdb

# Add additional environment variables (if needed)
# ENV PORT=3000

# Run the application
CMD ["node", "server.js"]












