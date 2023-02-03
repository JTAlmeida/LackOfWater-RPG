# Fullstack project with nginx + react + node + postgres + docker

## How to build for docker

1- Clone this repository;

2- Configure .env files for both frontend and backend;

3- Inside the cloned folder run:
```bash
docker-compose up --build
```

4- Have fun!

*Remember to clear volumes before a new build with*
```bash
docker-compose down -v
```

*IMPORTANT*: Dockerfile and docker-compose are configured to run in linux!
