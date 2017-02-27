---
title: Ubuntu语言支持不见了？
date: 2017-02-17 12:38:41
tags: ubuntu
categories: Linux
---
请终端执行下列语句：
$ sudo apt-get install language-selector-gnome
说明：ubuntu安装中文输入法时，尽量不要安装 im-switch （新版本已被im-config替代），安装im-switch 会导致内置的im-config和languagesupport被卸载，所以解决方法就是先卸载掉 im-switch ，重新装回 im-config和language support。
