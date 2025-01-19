Instructions how to use


* please note this took almost 5 minutes to fully build consider alpine instead




# How to build:
```bash
docker build -t user-form-app .
```



# How to run the container
```bash
docker run -p 3000:3000 user-form-app
```

### Optional .env for unit testing

```bash
MONGO_URI=mongodb://your-mongo-host:27017/userdb
PORT=4000
```

#### If you are running multiple or need to test with an env use
# How to run the container
```bash
docker run -p 3000:3000 --env-file .env user-form-app
```


## If you want to run inline the env you can use:

```bash
docker run -p 3000:3000 -e MONGO_URI=mongodb://custom-mongo:27017/userdb user-form-app
```



##### Docker compose ######

Docker Compose allows you to define everything (e.g., ports, environment variables, volumes) in a docker-compose.yml file. Instead of running long docker run commands, you can start all services with:

```bash
docker-compose up
```

## Start everything with:
```bash
docker-compose up --build
```

