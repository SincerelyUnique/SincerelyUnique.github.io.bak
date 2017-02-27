---
title: 上传war包到服务器
date: 2017-02-22 14:05:53
tags:
categories: Linux
---
1>ssh  root@172.26.100.160
2>password xxx
6>cd /usr/local/tomcat/webapps
7> rm -rf  dashboard-serve*
7> mv /root/dashboard-server.war   ./
<!--more-->

B
3>sftp root@172.26.100.160
4>password xxxx
5>put /usr/local/server/eclipse/workspace/mes-dashboard-server/dashboardServerWeb/target/vision-server.war ./ 


验证部署是否成功 http://172.26.100.xxx:8080/vision-server/rest

maven 打包命令
/workspace/mes-dashboard-lineStatusMonitor-portlet$ mvn clean package

http://172.26.100.xxx
root密码：xxxx

