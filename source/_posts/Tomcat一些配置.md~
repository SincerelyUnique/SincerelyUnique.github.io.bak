---
title: Tomcat一些配置
date: 2017-02-22 14:31:19
tags:
categories: Tomcat
---
一

bin：命令路径

conf：配置

lib：核心类库（Jar），可扩展，放第三方类库

logs：空路径，存放运行后日志文件

temp：保存web应用运行过程中生成的临时文件

webapps：自动部署web应用，web应用复制过去就好咯

work：保存运行时生成的.class文件

License等相关文档
<!--more-->


二

环境变量： JAVA_HOME ,指向JDK安装bin目录



三

启动：bin路径下startup.bat，双击啊

浏览器：http：//localhost：8080



四

配置，界面配置&文件配置（记事本或vi）

1.conf下 server.xml  68行 可以更改 端口 port=8080 建议1024以上，防止冲突

2.实现运行多个服务，复制server.xml里面<Service>元素

3.列出web应用根路径下所有页面，server.xml里104,105行，listings修改为true



五

进入控制台

浏览器：1 server status控制台， 2 manager app控制台   3 host manager控制台

webapps/manager/WEB-INF/web.xml

Tomcat默认采用文件安全域，Tomcat用户由conf下tomcat-users.xml文件控制



六

部署web应用

1 利用Tomcat的自动部署： 复制到webapps下 ok 

2 利用控制台部署：浏览器控制台Deploy下，url

3 增加自定义的web部署文件：conf下新建Catalina文件夹，Catalina下新建localhost文件夹，localhost下新建任意名.xml文件

4 修改server.xml文件部署web应用：修改可能破坏Tomcat系统文件，不建议



七

配置Tomcat的数据源

Tomcat5.5 开始内置了DBCP数据源

1 全局数据源：所有web应用都可以访问

2 局部数据源：单个web应用访问

都要JDBC驱动，将JDBC复制到Tomcat的lib路径

1 局部数据元无需修改系统配置文件，修改用户自己的web部署文件，更好封装性，如修改conf/Catalina/localhost/dd.xml,增加个,<resource>

  再次启动Tomcat该应用可通过该JNDI（就是为某个java对象起一个名字）来访问数据源

2  全局数据源修改server.xml，有可能破坏Tomcat，不建议
