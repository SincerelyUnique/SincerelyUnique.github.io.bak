---
title: eclipse打开卡在加载页面不动
date: 2017-02-20 16:28:48
tags: eclipse
categories: IDE
---
手动备份： eclipse/workspace/.metadata/.plugins 下 org.eclipse.core.resources 文件夹

然后删除

重启eclipse，进去把之前打开的类或文件关掉

再进入那个目录把新生成的org.eclipse.core.resources文件夹删除，把备份的重新copy进去，

重启eclipse


