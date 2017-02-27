---
title: Ubuntu代理设置
date: 2017-02-17 12:46:30
tags: ubuntu proxy
categories: Linux
---
1. 修改apt.conf
```
$ sudo gedit /etc/apt/apt.conf
```
2. edit:
```
<!--more-->
Acquire::http::proxy "http://用户名:密码@172.26.100.238:64000/";
Acquire::https::proxy "https://用户名:密码@172.26.100.238:64000/";
Acquire::ftp::proxy "ftp://用户名:密码@172.26.100.238:64000/";
Acquire::socks::proxy "socks://用户名:密码@172.26.100.238:64000/";
```
3. 注意特殊符号
如“@”用“40%”代替：
@ use %40 to display!
