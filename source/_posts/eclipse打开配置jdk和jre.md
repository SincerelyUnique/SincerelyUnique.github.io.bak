---
title: eclipse打开配置JDK和Jre
date: 2017-02-27 8:31:19
tags:
categories: IDE
---

1. 打开eclipse时候，报错误信息：
JVM terminated. Exit code=1
/usr/bin/java
-Dosgi.requiredJavaVersion=1.8
-XX:+UseG1GC
<!--more-->
-XX:+UseStringDeduplication
-Dosgi.requiredJavaVersion=1.8
-Xms256m
-Xmx1024m
-jar /home/jalenchu/jalen_chu/tools/liferay/eclipse//plugins/org.eclipse.equinox.launcher_1.3.200.v20160318-1642.jar
-os linux
-ws gtk
-arch x86_64
-showsplash /home/jalenchu/jalen_chu/tools/liferay/eclipse//plugins/org.eclipse.platform_4.6.1.v20160907-1200/splash.bmp
-launcher /home/jalenchu/jalen_chu/tools/liferay/eclipse/eclipse
-name Eclipse
--launcher.library /home/jalenchu/jalen_chu/tools/liferay/eclipse//plugins/org.eclipse.equinox.launcher.gtk.linux.x86_64_1.1.400.v20160518-1444/eclipse_1617.so
-startup /home/jalenchu/jalen_chu/tools/liferay/eclipse//plugins/org.eclipse.equinox.launcher_1.3.200.v20160318-1642.jar
--launcher.appendVmargs
-exitdata 8c000a
-product org.eclipse.epp.package.jee.product
-vm /usr/bin/java
-vmargs
-Dosgi.requiredJavaVersion=1.8
-XX:+UseG1GC
-XX:+UseStringDeduplication
-Dosgi.requiredJavaVersion=1.8
-Xms256m
-Xmx1024m
-jar /home/jalenchu/jalen_chu/tools/liferay/eclipse//plugins/org.eclipse.equinox.launcher_1.3.200.v20160318-1642.jar 


2. 解决方法
打开eclipse.ini文件，添加如下：
-vm
/home/jalenchu/jalen_chu/tools/jdk/jdk1.8.0_111/bin/java
添加位置，在-vmargs上面：
-startup
plugins/org.eclipse.equinox.launcher_1.3.200.v20160318-1642.jar
--launcher.library
plugins/org.eclipse.equinox.launcher.gtk.linux.x86_64_1.1.400.v20160518-1444
-product
org.eclipse.epp.package.jee.product
--launcher.defaultAction
openFile
-showsplash
org.eclipse.platform
--launcher.defaultAction
openFile
--launcher.appendVmargs
-vm
/home/jalenchu/jalen_chu/tools/jdk/jdk1.8.0_111/bin/java
-vmargs
-Dosgi.requiredJavaVersion=1.8
-XX:+UseG1GC
-XX:+UseStringDeduplication
-Dosgi.requiredJavaVersion=1.8
-Xms256m
-Xmx1024m
