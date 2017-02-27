---
title: SenchaCmd学习笔记（1）
date: 2017-02-22 11:48:08
tags: sencha
categories: Extjs
---
1.安装SenchaCmd，图形界面，安装版本：SenchaCmd-6.0.2.14-linux-amd64.sh，
<!--more-->
```
jalen_chu@jalen:~$ cd /home/jalen_chu/Jalen_chu/Jar/EXTJS

jalen_chu@jalen:~/Jalen_chu/Jar/EXTJS$

jalen_chu@jalen:~/Jalen_chu/Jar/EXTJS$ ./SenchaCmd-6.0.2.14-linux-amd64.sh
```
一直next，安装路径为默认：/home/jalen_chu/bin/Sencha/Cmd/6.0.2.14，结束安装

2.配置环境变量path并查看
```
$ sudo gedit ./.bashrc

export PATH=/home/jalen_chu/bin/Sencha/Cmd/6.0.2.14:$PATH

$ echo $PATH
/home/jalen_chu/bin/Sencha/Cmd/6.0.2.14:/usr/lib/jvm/jdk1.7.0_75/bin:/home/jalen_chu/Jalen_chu/Shell:/usr/lib/jvm/jdk1.7.0_75/jre/bin:/usr/lib/jvm/jdk1.7.0_75:/home/jalen_chu/Jalen_chu/Tools/apache-maven-3.3.9/bin:/home/jalen_chu/Jalen_chu/Tools/apache-ant-1.9.6/bin:/home/jalen_chu/bin:/usr/lib/jvm/jdk1.7.0_75/bin:/bin:/usr/lib/jvm/jdk1.7.0_75/jre/bin:/usr/lib/jvm/jdk1.7.0_75:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games（显示所有path）

$ sencha                       (输出版本号及帮助文档)
结束
```

3.用SenchaCmd生成Extjs6应用程序
找到Extjs6解压包，路径：/home/jalen_chu/Jalen_chu/Jar/EXTJS/ext-6.0.0

应用程序生成目录：/home/jalen_chu/bin/Sencha/Projects/myapp

生成操作：
```
$ sencha -sdk /home/jalen_chu/Jalen_chu/Jar/EXTJS/ext-6.0.0 generate app MyApp /home/jalen_chu/bin/Sencha/Projects/myapp

$ cd /home/jalen_chu/bin/Sencha/Projects/myapp

$ sencha app watch

......(输出一堆，到：

Waiting for changes...

)

结束
```

4.启动服务器
先给tomcat创建一个新的port：1841，（service.xml添加一个connector节点）

启动tomcat后，打开浏览器切换到当前端口即可显示


5.浏览一下之前生成的项目

app：包含model，store和application.js，store是model实例的集合，store通过代理访问下载数据并提供查询，排序等。

classic和modern：含应用代码，各自包含sass与src，src包含应用程序视图，main.scss文件包含移动端和桌面的样式，同时主根目录下也有个

	控制全局样式的sass文件夹。（sass是在Extjs里很重要的样式设置文件）

Extjs支持MVC和MVVM两种架构
