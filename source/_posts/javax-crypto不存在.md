---
title: javax crypto不存在
date: 2017-02-20 15:38:01
tags: 
categories: Maven
---
pom.xml中需要添加一个jce.jar包.

jce.jar
为 cryptographic（加密）操作提供类和接口。在此包中定义的 cryptographic 操作包括加密、密钥生成和密钥协商，以及消息验证代码 (MAC) 生成.
<!--more-->
加密支持包括对称密码、不对称密码、块密码和流密码。此包还支持安全流和封装的对象。

此包中提供的许多类都是基于提供程序的。该类本身定义应用程序可以写入其中的编程接口。然后可由第三方供应商编写实现本身，并根据需要无缝嵌入。因此，应用程序开发人员可以利用任意数量的基于提供程序的实现，而无需添加或重写代码。
```
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-compiler-plugin</artifactId>
	<configuration>
		<source>1.5</source>
		<target>1.5</target>
		<compilerArguments>
		    <verbose />
            <!-- 下面这行添加jce.jar，注意它和rt.jar中间分隔符“:” -->
		    <bootclasspath>${java.home}/lib/rt.jar:${java.home}/lib/jce.jar</bootclasspath>
		</compilerArguments>
	</configuration>
</plugin>
```
参考：
[http://blog.sina.com.cn/s/blog_6657f20e01015qxs.html](http://blog.sina.com.cn/s/blog_6657f20e01015qxs.html)
[http://www.bubuko.com/infodetail-1842079.html](http://www.bubuko.com/infodetail-1842079.html)
