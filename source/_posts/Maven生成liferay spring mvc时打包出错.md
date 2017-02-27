---
title: Maven生成liferay spring mvc时打包出错
date: 2017-02-27 14:14:15
tags: 新建,模板,小书匠
categories: Maven
---
1. 错误信息
当终端执行：mvn clean package时候，出现
错误1：Failed to determine Java version for profile tiger
错误2：maven-compiler-plugin is missing
错误3：maven-surefire-plugin is missing
<!--more-->
```
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.454 s
[INFO] Finished at: 2017-02-27T13:56:45+08:00
[INFO] Final Memory: 12M/212M
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal com.liferay.maven.plugins:liferay-maven-plugin:6.2.5:build-css (default) on project liferay-springmvc-test: Some problems were encountered while processing the POMs:
[ERROR] [ERROR] Failed to determine Java version for profile tiger @ line 21, column 10
[ERROR] [WARNING] 'build.plugins.plugin.version' for org.apache.maven.plugins:maven-compiler-plugin is missing. @ org.springframework:spring-parent:3.0.7.RELEASE, /home/jalenchu/.m2/repository/org/springframework/spring-parent/3.0.7.RELEASE/spring-parent-3.0.7.RELEASE.pom, line 232, column 15
[ERROR] [WARNING] 'build.plugins.plugin.version' for org.apache.maven.plugins:maven-surefire-plugin is missing. @ org.springframework:spring-parent:3.0.7.RELEASE, /home/jalenchu/.m2/repository/org/springframework/spring-parent/3.0.7.RELEASE/spring-parent-3.0.7.RELEASE.pom, line 240, column 15: 3 problems were encountered while building the effective model for org.springframework:spring-webmvc:3.0.7.RELEASE
[ERROR] [ERROR] Failed to determine Java version for profile tiger @ line 21, column 10
[ERROR] [WARNING] 'build.plugins.plugin.version' for org.apache.maven.plugins:maven-compiler-plugin is missing. @ org.springframework:spring-parent:3.0.7.RELEASE, /home/jalenchu/.m2/repository/org/springframework/spring-parent/3.0.7.RELEASE/spring-parent-3.0.7.RELEASE.pom, line 232, column 15
[ERROR] [WARNING] 'build.plugins.plugin.version' for org.apache.maven.plugins:maven-surefire-plugin is missing. @ org.springframework:spring-parent:3.0.7.RELEASE, /home/jalenchu/.m2/repository/org/springframework/spring-parent/3.0.7.RELEASE/spring-parent-3.0.7.RELEASE.pom, line 240, column 15
[ERROR] -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoExecutionException
```
2. 解决方法
(1) 删除本地仓库重新下载maven插件，not work
(2) 修改pom，替换之前的maven-compiler-plugin插件，注意在build标签里
```
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-compiler-plugin</artifactId>
	<configuration>
		<source>1.7</source>
			<target>1.7</target>
			<compilerArguments>
			<verbose />
			<bootclasspath>${java.home}/lib/rt.jar:${java.home}/lib/jce.jar</bootclasspath>
			</compilerArguments>
	</configuration>
</plugin>
```