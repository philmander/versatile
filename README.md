versatile
============

### Docker image

Build
```
docker build -t philmander/versatile .
```

Run
```
docker rm versatile
docker run --name versatile -v /home/philip/log:/usr/log -p 8020:9999 -d philmander/versatile
```