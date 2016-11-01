#!/usr/bin/env bash

host="philip@139.162.158.136"
site="versatile"

rm $site-1.0.0.tgz
npm pack

#copy and unpack
scp /home/philip/Me/$site/$site-1.0.0.tgz $host:/home/philip/deploy
ssh $host rm /home/philip/deploy/$site/package -r
ssh $host tar -zxf /home/philip/deploy/$site-1.0.0.tgz  -C /home/philip/deploy/$site

#move to new
ssh $host -t "rm /home/philip/www/\"$site\"_new -r"
ssh $host cp /home/philip/deploy/$site/package/ /home/philip/www/"$site"_new -r
ssh $host -t "cd /home/philip/www/\"$site\"_new && npm rebuild"

#stop and create rollback
ssh $host pm2 stop /home/philip/www/$site/app.js
ssh $host -t "rm /home/philip/www/\"$site\"_old -rf"
ssh $host mv /home/philip/www/"$site" /home/philip/www/"$site"_old

#deploy new and start
ssh $host mv /home/philip/www/"$site"_new /home/philip/www/"$site"
ssh $host pm2 start /home/philip/www/"$site"/app.js --name="$site"