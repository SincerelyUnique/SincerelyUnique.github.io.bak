---
title: Ubuntu搜狗输入法安装
date: 2017-02-17 12:43:17
tags: ubuntu sougou
categories: Linux
---
1. 去搜狗Linux官网下载，sogoupinyin_2.0.0.0066_amd64.deb
<!--more-->
2. 安装deb包，可一双击使用ubuntu软件中心安装，或使用终端输入：$ sudo dpkg -i sogoupinyin_2.0.0.0066_amd64.deb  安装
   （dpkg相对于install来说是底层安装，可能会有些依赖问题，使用 ：$ sudo apt-get update 或 $ sudo apt-get upgrade 或 $ sudo apt-get -f install 更新一下
       适当更新一下可以安装一些依赖包，很有用的）
3. 配置fcitx，fcitx可以去ubuntu软件中心下载，之后是配置fcitx，终端输入： $ im-config   之后一直ok（或yes）继续，select name选择fcitx
4. 重启电脑
5. 终端输入： $ fcitx-config-gtk3 
6. 左下角“+”，添加搜狗输入法（取消only show current language）
7. 系统设置--语言支持--键盘输入方式切换成fctix
