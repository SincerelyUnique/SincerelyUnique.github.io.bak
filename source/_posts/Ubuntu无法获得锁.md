---
title: Ubuntu无法获得锁
date: 2017-02-17 12:45:21
tags: ubuntu
categories: Linux
---
提示：“E: 无法获得锁 /var/lib/dpkg/lock - open (11: 资源暂时不可用)
E: 无法锁定管理目录(/var/lib/dpkg/)，是否有其他进程正占用它？”

1. 终端输入 ps -aux ，列出进程。找到含有apt‘-get的进程，直接sudo kill PID（含有apt-get进程的PID）。
2. 强制解锁,命令:
                              sudo rm /var/cache/apt/archives/lock
                              sudo rm /var/lib/dpkg/lock
3. $ sudo apt-get update
4. $ sudo apt-get upgrade
5. $ sudo apt-get -f install
