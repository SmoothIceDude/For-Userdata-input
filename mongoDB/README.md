# To use this you need to run:


```bash
docker build -t custom-mongodb .
```




1.) Create a Docker Network
First, create a custom Docker network to allow both containers to communicate:

```bash
docker network create app-network
```

2.) Run the Custom MongoDB Container
Run your custom MongoDB container in the newly created network:

```bash
docker run -d --name mongodb --network app-network -p 27017:27017 custom-mongodb
```








LAST 

Steps to Ensure the Application Can Communicate with MongoDB
1. Check the Current MongoDB Container Network

Find out which network the MongoDB container is running in

```bash
docker inspect mongodb | grep NetworkMode
```