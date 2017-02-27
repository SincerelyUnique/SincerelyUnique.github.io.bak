---
title: Maven生成liferay项目
date: 2017-02-27 11:11:19
tags: 
categories: Liferay
---
From Mercy: [https://my.oschina.net/mercyyang/blog/607773](https://my.oschina.net/mercyyang/blog/607773)
1. 切换到想要生成项目文件的路径
```
$ mvn archetype:generate

1768: remote -> sk.seges.sesam:sesam-annotation-archetype (-)
1769: remote -> tk.skuro:clojure-maven-archetype (A simple Maven archetype for Clojure)
1770: remote -> tr.com.lucidcode:kite-archetype (A Maven Archetype that allows users to create a Fresh Kite project)
1771: remote -> tr.com.obss.sdlc.archetype:obss-archetype-java (This archetype provides a common skelton for the Java packages.)
1772: remote -> tr.com.obss.sdlc.archetype:obss-archetype-webapp (This archetype provides a skelton for the Java Web Application packages.)
1773: remote -> ua.co.gravy.archetype:single-project-with-junit-and-slf4j (Create a single project with jUnit, Mockito and slf4j dependencies.)
1774: remote -> uk.ac.ebi.gxa:atlas-archetype (Archetype for generating a custom Atlas webapp)
1775: remote -> uk.ac.rdg.resc:edal-ncwms-based-webapp (-)
1776: remote -> uk.co.nemstix:basic-javaee7-archetype (A basic Java EE7 Maven archetype)
1777: remote -> uk.co.solong:angular-spring-archetype (So Long archetype for RESTful spring services with an AngularJS frontend. Includes debian deployment)
1778: remote -> us.fatehi:schemacrawler-archetype-maven-project (-)
1779: remote -> us.fatehi:schemacrawler-archetype-plugin-command (-)
1780: remote -> us.fatehi:schemacrawler-archetype-plugin-dbconnector (-)
1781: remote -> us.fatehi:schemacrawler-archetype-plugin-lint (-)
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 932:
```
2. 输入：liferay:portlet
```
Choose archetype:
1: remote -> com.liferay:com.liferay.project.templates.mvc.portlet (Liferay Project Templates MVC Portlet)
2: remote -> com.liferay:com.liferay.project.templates.portlet (Liferay Project Templates Portlet)
3: remote -> com.liferay:com.liferay.project.templates.portlet.configuration.icon (Liferay Project Templates Portlet Configuration Icon)
4: remote -> com.liferay:com.liferay.project.templates.portlet.provider (Liferay Project Templates Portlet Provider)
5: remote -> com.liferay:com.liferay.project.templates.portlet.toolbar.contributor (Liferay Project Templates Portlet Toolbar Contributor)
6: remote -> com.liferay.faces.archetype:com.liferay.faces.archetype.alloy.portlet (Maven archetype for a Liferay Faces Alloy portlet)
7: remote -> com.liferay.faces.archetype:com.liferay.faces.archetype.icefaces.portlet (Maven archetype for a Liferay ICEFaces portlet)
8: remote -> com.liferay.faces.archetype:com.liferay.faces.archetype.jsf.portlet (Maven archetype for a Liferay JSF portlet)
9: remote -> com.liferay.faces.archetype:com.liferay.faces.archetype.primefaces.portlet (Maven archetype for a Liferay PrimeFaces portlet)
10: remote -> com.liferay.faces.archetype:com.liferay.faces.archetype.richfaces.portlet (Maven archetype for a Liferay RichFaces portlet)
11: remote -> com.liferay.maven.archetypes:liferay-portlet-archetype (Provides an archetype to create Liferay portlets.)
12: remote -> com.liferay.maven.archetypes:liferay-portlet-icefaces-archetype (Provides an archetype to create Liferay ICEfaces portlets.)
13: remote -> com.liferay.maven.archetypes:liferay-portlet-jsf-archetype (Provides an archetype to create Liferay JSF portlets.)
14: remote -> com.liferay.maven.archetypes:liferay-portlet-liferay-faces-alloy-archetype (Provides an archetype to create Liferay Faces Alloy portlets.)
15: remote -> com.liferay.maven.archetypes:liferay-portlet-primefaces-archetype (Provides an archetype to create Liferay PrimeFaces portlets.)
16: remote -> com.liferay.maven.archetypes:liferay-portlet-richfaces-archetype (Provides an archetype to create Liferay RichFaces portlets.)
17: remote -> com.liferay.maven.archetypes:liferay-portlet-spring-mvc-archetype (Provides an archetype to create Liferay Spring MVC portlets.)
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): : 
```
3. 选择：11
```
Choose com.liferay.maven.archetypes:liferay-portlet-archetype version: 
1: 6.0.2
2: 6.0.3
3: 6.0.4
4: 6.0.5
5: 6.0.6
6: 6.1.0
7: 6.1.1
8: 6.1.2
9: 6.1.10
10: 6.1.20
11: 6.1.30
12: 6.1.30.1
13: 6.2.0-B1
14: 6.2.0-B2
15: 6.2.0-B3
16: 6.2.0-M5
17: 6.2.0-M6
18: 6.2.0-RC1
19: 6.2.0-RC2
20: 6.2.0-RC3
21: 6.2.0-RC4
22: 6.2.0-RC5
23: 6.2.0-ga1
24: 6.2.1
25: 6.2.2
26: 6.2.4
27: 6.2.5
28: 6.2.10.4
29: 6.2.10.5
30: 6.2.10.6
31: 6.2.10.7
32: 6.2.10.8
33: 6.2.10.9
34: 6.2.10.10
35: 6.2.10.11
36: 6.2.10.12
37: 6.2.10.13
38: 6.2.10.14
39: 6.2.10.15
40: 7.0.0-m1
41: 7.0.0-m2
Choose a number: 41: 
```
4. 选择一个想要的liferay版本，我用6.2.5的，选：27

5. 定义属性：
```
Define value for property 'groupId': com.liferay.test
Define value for property 'artifactId': liferay-test
Define value for property 'version' 1.0-SNAPSHOT: : 1.0-SNAPSHOT
Define value for property 'package' com.liferay.test: : com.liferay.test
Confirm properties configuration:
groupId: com.liferay.test
artifactId: liferay-test
version: 1.0-SNAPSHOT
package: com.liferay.test
```
6. 输入y，创建成功：
```
 Y: : y
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Archetype: liferay-portlet-archetype:6.2.5
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: groupId, Value: com.liferay.test
[INFO] Parameter: artifactId, Value: liferay-test
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] Parameter: package, Value: com.liferay.test
[INFO] Parameter: packageInPathFormat, Value: com/liferay/test
[INFO] Parameter: package, Value: com.liferay.test
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] Parameter: groupId, Value: com.liferay.test
[INFO] Parameter: artifactId, Value: liferay-test
[INFO] Project created from Archetype in dir: /home/jalenchu/jalen_chu/test/liferay-test
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 06:01 min
[INFO] Finished at: 2017-02-27T08:38:25+08:00
[INFO] Final Memory: 16M/194M
[INFO] ------------------------------------------------------------------------
```
7. pom中添加如下信息：
```
<properties>
        <liferay.app.server.deploy.dir>
        //根据自己的地址而定
            /home/mercy_yang/Documents/liferay-portal/liferay-portal-6.2-ce-ga3/tomcat-7.0.42/webapps
        </liferay.app.server.deploy.dir>

        <liferay.app.server.lib.global.dir>
            //根据自己的地址而定
            /home/mercy_yang/Documents/liferay-portal/liferay-portal-6.2-ce-ga3/tomcat-7.0.42/lib/ext
        </liferay.app.server.lib.global.dir>

        <liferay.app.server.portal.dir>
        //根据自己的地址而定
            /home/mercy_yang/Documents/liferay-portal/liferay-portal-6.2-ce-ga3/tomcat-7.0.42/webapps/root
        </liferay.app.server.portal.dir>

        <liferay.auto.deploy.dir>
            /home/mercy_yang/Documents/liferay-portal/liferay-portal-6.2-ce-ga3/deploy
        </liferay.auto.deploy.dir>

        <liferay.maven.plugin.version>
            6.2.0-ga1
        </liferay.maven.plugin.version>

        <liferay.version>
            6.2.0-ga1
        </liferay.version>
    </properties>
```
