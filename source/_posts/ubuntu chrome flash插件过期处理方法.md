---
title: ubuntu chrome flash插件过期处理方法
date: 2017-04-10 16:34:08
tags: 
categories: Linux
---
1. 下载符合自己系统版本的adobe flash player版本，格式如tar.gz
2. 找到目录：/home/你的计算机用户名/.config/google-chrome/PepperFlash
<!--more-->
3. 将解压后flash插件文件夹里的 libpepflashplayer.so 文件复制到上面目录下
4. 修改：/usr/share/applications/google-chrome.desktop 文件，在
   Exec=/usr/bin/google-chrome-stable %U
   后面加点东西
   Exec=/usr/bin/google-chrome-stable %U --ppapi-flash-path=/home/jalenchu/.config/google-chrome/PepperFlash/libpepflashplayer.so
5. 重启浏览器查看：chrome://plugins/