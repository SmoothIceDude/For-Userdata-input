 # Attention to run this application. You will need to run two seperate containers
  
created by CA

 1.) Mongo DB (see README in its own folder)  

 2.) web-form-app (see README in its own folder)

* Please note that MongoDB takes a considerable amount of time, approx 6 minutes to build  
* If package-lock.json is missing, generate it locally

```bash
cd web-form-app
rm -rf node_modules package-lock.json
npm install
``

the URI for the mongoDB is extremely important and can be set to cloud or on-prem


# project hierarchy represented in ASCII format

For-Userdata-input
├── .git
├── README.md
|-- docker-compose.yml
├── mongoDB
│   ├── Dockerfile
│   └── README.md
└── web-form-app
    ├── .env
    ├── Dockerfile
    ├── README.md
    ├── index.js
    ├── package-lock.json
    ├── package.json
    ├── server.js



Directory Context: The docker-compose tool runs in the context of the directory where the file is located. Placing it at the root ensures all services (mongoDB and web-form-app) can be accessed and managed together.

###### Start the Application

```bash
docker compose up --build
```
  
###### Stop the Application

```bash
docker-compose down --columes
```
##### Rebuild Specific Service: If you only changed something in web-form-app:
  
```bash
docker-compose build web-form-app
docker-compose up
```


### Logs and Debugging
View Logs:

```bash
docker logs mongodb
docker logs web-form-app
```
  
### Test MongoDB Connection: Use docker exec to connect to the MongoDB container and verify it’s running:

```bash
docker exec -it mongodb mongo -u admin -p securepassword
```

### Access Node.js App: Open http://localhost:3000 in your browser or use curl to test:

curl http://localhost:3000






# What Happens When You Run docker-compose up --build?
  
### 1.) Build Phase:
  
Docker Compose will locate the Dockerfile in each service's context (e.g., mongoDB/Dockerfile and web-form-app/Dockerfile) and build the images.
If images are already built and no changes are detected, it will skip rebuilding unless you force it with --build.
  
### 2.) Network Setup:
  
Docker Compose creates a network (e.g., app-network) so containers can communicate using their service names as hostnames.
  
### 3.) Container Startup:
  
All containers are started in the correct order. The depends_on directive ensures the correct dependency sequence (e.g., MongoDB starts before the web-form-app).
