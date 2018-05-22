---
title: Sencha touch搭建和创建项目
date: 2017-02-21 09:11:01
tags:
categories: Extjs
---
*摘要: Senchacmd版本：Sencha Cmd v6.0.2.14 Sencha touch版本：touch-2.4.2*
<!--more-->
1.安装支持sencha touch浏览器

2.下载Sencha Touch

3.搭建JDK环境

4.搭建Ruby环境

5.搭建Android开发环境

6.安装Sencha Cmd

8.创建项目

    $  sencha -sdk /path/to/sdk generate app MyApp /path/to/myapp 

    （其中-sdk /path/to/sdk是指向你解压后的安装包的目录，MyApp是应用的名字，

    /path/to/myapp在磁盘上生成项目文件夹的名字）

9.程序编译和打包

    Sencha Cmd的编译打包实际上就是对应用的压缩。
    Sencha Cmd为我们提供了4种不同的编译和打包方式，分别是
    sencha app build testing 供测试，QA使用版本；
    sencha app build package 脱离web server，本地html文件资源包；
    sencha app build production 正式发布的 webapp 产品；
    sencha app build native 打包成移动应用如android的apk或ios的app；

参考:
[http://jingyan.baidu.com/article/cd4c29791a2f1c756f6e6054.html](http://jingyan.baidu.com/article/cd4c29791a2f1c756f6e6054.html)
