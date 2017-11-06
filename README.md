versatile
============

### Docker image

Build
```
docker build -t versatilenl/site .
docker push versatilenl/site
```

Run
```
docker rm versatile
docker run --name versatile -v /home/philip/log:/usr/log -p 8020:9999 -d versatilenl/site
```