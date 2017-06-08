---
title: github博客绑定自己域名
date: 2017-06-08 16:34:08
tags: 
categories: Website
---
向你的 DNS 配置中添加 3 条记录
<!--more-->
```
@          A             192.30.252.153
@          A             192.30.252.154
www      CNAME    username.github.io.
```
用你自己的 Github 用户名替换 username推荐使用 DNSPOD 的服务，使用国外的 DNS 解析服务可能有被墙的风险。至于如何使用 DNSPOD 解析域名，参考
http://jingyan.baidu.com/article/546ae1857c4ee81149f28cbe.html3. 等待你的 DNS 配置生效对DNS的配置不是立即生效的，过10分钟再去访问你的域名看看有没有配置成功 : )
