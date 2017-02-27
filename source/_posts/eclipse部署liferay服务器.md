---
title: eclipse部署liferay服务器
date: 2017-02-27 15:14:15
tags: 
categories: Liferay
---
Maven生成的liferay项目导入eclipse后需要在eclipse里部署tomcat，启动服务器和添加项目方便！
1. 打开eclipse，将下载好的liferay服务器添加进去，双击服务器，设置服务器启动参数：
（1） 打开Generate Information下面的“open launch configuration”；
（2） 选择“Arguments”
<!--more-->
（3） Copy下面内容，路径记得替换自己的服务器位置，缺少的文件自己创建
```
 -Djava.util.logging.config.file=/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62/conf/logging.properties -DBONITA_HOME=/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62/bonita -Djava.util.logging.config.file=/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62/external/logging/logging.properties -Djava.security.auth.login.config=/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62/external/security/jaas-standard.cfg -server -Xshare:auto -Xms256m -Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -DisableExplicitGC -XX:SurvivorRatio=1 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:+CMSParallelRemarkEnabled -XX:+UseCMSCompactAtFullCollection -XX:CMSFullGCsBeforeCompaction=0 -XX:+CMSClassUnloadingEnabled -XX:LargePageSizeInBytes=128M -XX:+UseFastAccessorMethods -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=70 -XX:SoftRefLRUPolicyMSPerMB=0 -Dexo.data.dir=/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62/external/xcmis/ext-exo-data -Dorg.exoplatform.container.standalone.config=/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62/external/xcmis/ext-exo-conf/exo-configuration-hsql.xml -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -Djava.endorsed.dirs="/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62/endorsed" -classpath /home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62/bin/bootstrap.jar -Dcatalina.base="/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62" -Dcatalina.home="/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62" -Djava.io.tmpdir=/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62/temp -Dwtp.deploy="/home/jalenchu/jalen_chu/tools/liferay/tomcat/liferay-portal-6.2-ce-ga6/tomcat-7.0.62/wtpwebapps"
 ```
(之前遇到没有添加上面参数就启动服务器，liferay会报内存溢出)

2. Timeouts里的启动时间设置为300秒

3. Server Locations里选择第二项：Use Tomcat installation(takes control of Tomcat installation) 

4. 记得保存这些配置，ctrl + s

（之后添加导入的maven项目即可）
