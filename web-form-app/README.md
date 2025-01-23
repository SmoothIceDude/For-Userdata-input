Instructions how to use


* please note this took almost 5 minutes to fully build consider alpine instead

* Also the web app will never see mongo unless it attaches itself to the network using 
the flag for network

`--network app-network` 


# How to build:
```bash
docker build -t user-form-app .
```





```bash
docker run -d \
  --name web-form-app \
  --network app-network \
  -p 3000:3000 \
  -e MONGO_URI=mongodb://mongodb:27017/mydatabase \
  my-web-app
```




#### Old way
# How to run the container
```bash
docker run -p 3000:3000 user-form-app
```