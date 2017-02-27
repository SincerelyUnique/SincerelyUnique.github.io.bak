---
title: maven打包跳过测试
date: 2017-02-22 14:16:22
tags: testng
categories: Maven
---
运行mvn install时跳过Test.
<!--more-->
方法一:
```
<project> 
  [...] 
  <build>
    <plugins> 
      <plugin> 
        <groupId>org.apache.maven.plugins</groupId>  
        <artifactId>maven-surefire-plugin</artifactId>  
        <version>2.18.1</version>  
        <configuration>  
          <skipTests>true</skipTests>  
        </configuration>  
      </plugin> 
    </plugins> 
  </build> 
  [...] 
</project> 
```

方法二:
mvn install -DskipTests
或者
mvn install -Dmaven.test.skip=true
 
详情参考:
[http://maven.apache.org/surefire/maven-surefire-plugin/examples/skipping-test.html](http://maven.apache.org/surefire/maven-surefire-plugin/examples/skipping-test.html)
[http://blog.csdn.net/thc1987/article/details/42458895](http://blog.csdn.net/thc1987/article/details/42458895)

