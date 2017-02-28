---
title: eclipse开启远程调试
date: 2017-02-28 8:14:15
tags: 
categories: IDE
---
使用eclipse开启远程调试
1. 打开tomcat的bin目录，找到setenv.sh (注意的是windows环境下是修改.bat，linux下是修改.sh)，在末尾添加
```
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
```
其中address=5005是设置调试端口，不要和其他端口冲突
<!--more-->
改完后是这个样子的：
```
CATALINA_OPTS="$CATALINA_OPTS -Dfile.encoding=UTF8 -Djava.net.preferIPv4Stack=true  -Dorg.apache.catalina.loader.WebappClassLoader.ENABLE_CLEAR_REFERENCES=false -Duser.timezone=GMT -Xmx1024m -XX:MaxPermSize=256m -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005"
```

2. 打开eclipse，设置远程调试
Run ---->  Debug Configurations  ----> Remote Java Application ----> New ----> 选择调试的项目，host和端口（5005）

3. 结束，刷新下页面，进入调试状态。