---
title: eclipse安装插件方法
date: 2017-02-17 12:50:54
tags: eclipse
categories: IDE
---
以插件spket为例
1. 下载spket插件，解压得到features和plugins。
2. 打开eclipse根目录，创建两个文件夹：links（放配置文件）和 MyPlugins（放插件）
<!--more-->
(1)./eclipse/links 
此文件夹里创建文件spket.link,
注意后缀名为.link,
打开编辑（记事本）path：      path=MyPlugins/spket 
(2)./eclipse/MyPlugins
此文件夹放插件，将解压好的插件features和plugins复制过来注意路径
/eclipse/MyPlugins/spket/eclipse/features
/eclipse/MyPlugins/spket/eclipse/plugins
(3).完成，打开eclipse查看preference

