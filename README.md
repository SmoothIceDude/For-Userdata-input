 # Attention to run this application. You will need to run two seperate containers
  
created by CA

 1.) Mongo DB (see README in its own folder)  

 2.) web-form-app (see README in its own folder)

* Please note that MongoDB takes a considerable amount of time, approx 6 minutes to build  


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


```bash
docker-compose up --build
```


# What Happens When You Run docker-compose up --build?
  
### 1.) Build Phase:
  
Docker Compose will locate the Dockerfile in each service's context (e.g., mongoDB/Dockerfile and web-form-app/Dockerfile) and build the images.
If images are already built and no changes are detected, it will skip rebuilding unless you force it with --build.
  
### 2.) Network Setup:
  
Docker Compose creates a network (e.g., app-network) so containers can communicate using their service names as hostnames.
  
### 3.) Container Startup:
  
All containers are started in the correct order. The depends_on directive ensures the correct dependency sequence (e.g., MongoDB starts before the web-form-app).
