docker build . -t spidervex.azurecr.io/api-gateway
docker push spidervex.azurecr.io/api-gateway

docker run -p 3000:3000 spidervex.azurecr.io/api-gateway