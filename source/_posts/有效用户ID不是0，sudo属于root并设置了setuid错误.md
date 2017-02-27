---
title: 有效用户ID不是0，sudo属于root并设置了setuid错误
date: 2017-02-22 14:10:04
tags:
categories: Linux
---
原因： 使用了chmod 777 * -R 想修改权限结果导致sudo不能用了，
<!--more-->

到recovery mode下去修改权限：

mount -o remount rw /

chown root:root /usr/bin/sudo

chmod 4755 /usr/bin/sudo

重启后还是提示有问题：

sudo：在加载插件“sudoers_policy”时在 /etc/sudo.conf 第 0 行出错
sudo：/usr/lib/sudo/sudoers.so 必须只对其所有者可写
sudo：致命错误，无法加载插件



后来实在没辙了，我直接apt-get remove sudo, apt-get install sudo这样重新安装了一下，终于又可以用了。ok



在这次的小插曲中我还发现了su 和sudo是又区别的，虽然我的sudo不能用了，我还是可以用 su root 进入root用户的。
