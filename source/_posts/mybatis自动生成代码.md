---
title: mybatis自动生成代码
date: 2017-03-10 15:19:15
tags:
categories: Mybatis
---
当我们使用mybatis时，为减少代码量，可以选择自动生成数据库连接代码，下面是以连接postgresql为例
1. 准备jar包（2个），
postgresql-9.2-1003-jdbc4.jar （jdbc驱动）
mybatis-generator-core-1.3.2.jar （改为可执行文件）
my.xml （需要根据这个文件配置进行生成）
UserInfo.java (1个pojo类)
<!--more-->
2. 修改my.xml,注意修改包名，还有路径，最好用绝对路径
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN" "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd" >
<generatorConfiguration>
        <classPathEntry
        location="/home/jalenchu/jalen_chu/download/Jar/postgresql-9.2-1003-jdbc4.jar" />
        <context id="tts2">
                <jdbcConnection driverClass="org.postgresql.Driver"
                        connectionURL="jdbc:postgresql://localhost:5432/test_mybatis_db"
                        userId="postgres" password="dbms4Fna">
                </jdbcConnection>

        <javaModelGenerator targetPackage="com.qunar.study.entity" targetProject="/home/jalenchu/jalen_chu/mybatis/java">
                        <property name="enableSubPackages" value="false" />
                        <property name="trimStrings" value="true" />
                </javaModelGenerator>

        <sqlMapGenerator targetPackage="mybatis" targetProject="/home/jalenchu/jalen_chu/mybatis/resources/">
                </sqlMapGenerator>

        <javaClientGenerator type="XMLMAPPER" targetPackage="com.qunar.study.mapper" targetProject="/home/jalenchu/jalen_chu/mybatis/java">
                        <property name="enableSubPackages" value="false" />
                </javaClientGenerator>
                 
         <table schema="public" tableName="userinfo" domainObjectName="UserInfo"></table>
        <!--    
        <table schema="public" tableName="operation" domainObjectName="Operation" enableCountByExample="true" enableUpdateByExample="true" enableDeleteByExample="true" enableSelectByExample="true" selectByExampleQueryId="true" ></table>
        -->
        </context>
</generatorConfiguration>
```
3. 打开终端，执行
```
java -jar mybatis-generator-core-1.3.2.jar -configfile my.xml -overwrite
```
4. 结束后可以看到文件都生成到/home/jalenchu/jalen_chu/mybatis目录下，copy到你的项目文件中就可以了
（1）生成目录/home/jalenchu/jalen_chu/mybatis/java/com/qunar/study/entity
UserInfoExample.java
UserInfo.java
（2）生成目录/home/jalenchu/jalen_chu/mybatis/java/com/qunar/study/mapper
UserInfoMapper.java
（3）生成目录/home/jalenchu/jalen_chu/mybatis/resources/mybatis
UserInfoMapper.xml