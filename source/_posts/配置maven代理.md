---
title: 配置maven代理
date: 2017-02-22 14:42:55
tags: proxy
categories: Maven
---
setting.xml  添加
<!--more-->
```
    <proxy>

      <id>https</id>

      <active>true</active>

      <protocol>https</protocol>

      <username>jalen_chu</username>

      <password>dec@2015</password>

      <host>172.26.100.xxx</host>

      <port>64000</port>

    </proxy>

    

     <proxy>

      <id>http</id>

      <active>true</active>

      <protocol>http</protocol>

      <username>jalen_chu</username>

      <password>dec@2015</password>

      <host>172.26.100.xxx</host>

      <port>64000</port>

    </proxy>
```
