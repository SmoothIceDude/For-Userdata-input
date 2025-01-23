# To use this you need to run:

```bash
docker build -t custom-mongodb .
```


# Step 1.) Create a Docker Network
First, create a custom Docker network to allow both containers to communicate:
  
```bash
docker network create app-network
```
  
# Step 2.) Run the Custom MongoDB Container
Run your custom MongoDB container in the newly created network:
  
# Step 3.) Run MongoDB and attach it to the app-network
This command initializes the MongoDB instance with the username admin and password securepassword.

  
  
```bash
docker run -d \
  --name mongodb \
  --network app-network \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=securepassword \
  mongo:latest
  ```




#### Old way  
```bash
docker run -d --name mongodb --network=app-network --name mongo -p 27017:27017 custom-mongodb
```








LAST 

Steps to Ensure the Application Can Communicate with MongoDB
1. Check the Current MongoDB Container Network

Find out which network the MongoDB container is running in

```bash
docker inspect mongodb | grep NetworkMode
```