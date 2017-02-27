---
title: Ubuntu修改Java安全性
date: 2017-02-17 14:29:58
tags: ubuntu
categories: Linux
---
调 Java 控制面板
打开终端
（已配置好ubuntu jdk/jre）
输入：$ javaws -viewer
弹出java控制面板

选择 安全，添加信任网址

接下来就可已 通过java web start（javaws）来运行小程序了

eg：$ javaws /home/token.jnlp
