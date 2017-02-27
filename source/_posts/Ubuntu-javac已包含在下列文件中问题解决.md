---
title: Ubuntu javac已包含在下列文件中问题解决
date: 2017-02-17 14:24:45
tags: ubuntu javac
categories: Linux
---
问题：
jalen_chu@jalen:~$ javac
```
程序 'javac' 已包含在下列软件包中：

  default-jdk

  ecj

  gcj-4.8-jdk

  openjdk-7-jdk

  gcj-4.6-jdk

  openjdk-6-jdk

请尝试：sudo apt-get install <选定的软件包> 
```
<!--more-->
（Java -version同上）

方案：
输入：$ sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/jdk1.7.0_75/bin/javac 300
返回：update-alternatives: using /usr/lib/jvm/jdk1.7.0_75/bin/javac to provide /usr/bin/javac (javac) in 自动模式
javac
...
输入：$ sudo update-alternatives --install /usr/bin/Java java /usr/lib/jvm/jdk1.7.0_75/bin/java 300
返回：update-alternatives: using /usr/lib/jvm/jdk1.7.0_75/bin/java to provide /usr/bin/java (java) in 自动模式
java -version
...
