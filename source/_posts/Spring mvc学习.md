---
title: Spring mvc学习
date: 2016-03-7 13:19:15
tags: 
categories: Spring
---
1. spring将请求在调度servlet，处理器映射，控制器及视图解析器之间移动
2. 请求由DispatcherServlet分配给Controller（根据处理器映射来确定），控制器处理后分发给一个视图
3. spring mvc所有请求都会通过一个前段控制器servlet（DispatcherServlet）
<!--more-->
4. 处理器映射会根据请求所携带的url信息来进行决策
5. 良好的控制器本身只处理很少甚至不处理工作，而是将业务委托个一个或多个对象
6. 控制器完成逻辑处理，通常会产生一些信息（返回的数据），并在浏览器上显示，这些信息被称为模型
7. 控制器最后要做的是模型数据打包，并且标识出用于渲染输出的视图名城，接下来将请求，模型，视图发送会DispatcherServlet
8. <servlet-name>restful</servlet-name>   ---->  会默认尝试从restful-servlet.xml的文件中加载应用上下文
9. 声明DispatcherServlet处理哪些url，可使用*.htm,/*,/app,书里推荐使用只使用/，即<url-pattern>/</url-pattern>，会默认处理所有的请求，包括静态资源的请求
10. 可以使用<mvc:resources mapping="/resources/**" location="/resources/" />来处理静态资源，静态资源处理器
11. 配置注解驱动的控制器Controller
12. spring mvc注解驱动特性：<mvc:annotation-driven/>
13. @Controller 声明为控制器，可被<context:component-scan base-package="XXX">查找到并注册为Bean
14. @Inject注入对象，jsr330规定，常与@Named一起使用，@Autowired，spring提供的注解，包含required属性，当设置为false时，没有找到bean，系统不会报错，@Autowired与@Inject可互换；@Resource，jsr250规定，一般会指定name属性
15. @RequestMapping两个作用：一是表明这个方法是一个请求处理方法（方法中定义参数作为控制器和视图之间传递的数据模型），即处理某个路径的请求；二是返回一个String类型值指定渲染的视图
16. 注意使用Mockito提供的mock进行测试
17. 视图技术：JSP，Velocity，或FreeMarker
18. 使用InternalResourceViewResolver作为视图解析器（spring便有12种，这只是其中之一），如下配置了一个bean，它本身是一个视图解析器，内部同时根据具体内容委托给不同的视图解析器
```
<bean class="org.springframework.web.servlet.view.ContentNegotiatingViewResolver">
  <property name="mediaTypes">
    <map>
      <entry key="html" value="text/html"/>
      <entry key="json" value="application/json"/>
    </map>
  </property>
  <property name="viewResolvers">
    <list>
      <bean class="org.springframework.web.servlet.view.UrlBasedViewResolver">
	//如果jsp使用了jstl标签，需配置以下viewClass，使用jstl的国际化支持
        <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/>
	//截取前缀和后缀，使页面命名的名字匹配@RequestMapping所返回的值，使之一致        
	<property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
      </bean>
    </list>
  </property>
  <property name="defaultViews">
    <list>
      <bean class="org.springframework.web.servlet.view.json.MappingJacksonJsonView">
        <property name="prefixJson" value="true"/>
      </bean>
    </list>
  </property>
</bean>
```
19. Apache Tiles页面布局模板框架,通过views.xml定义通用的布局和home tile
20. 如果方法上@RequestMapping注解没有绑定路径，默认处理类上@RequestMapping路径下请求，注意是post还是get请求
21. @Valid注解校验表单数据的传递，防止不合法的数据通过表单进行提交，是javaBean校验规范一部分
22. @PathVariable String username，请求路径“/{username}”，请求路径中的该位置的值将作为username的值传递进去
23. @Pattern注解可以定义regexp属性指定要匹配的正则表达式
24. spring注册multipart解析器
Appendix: spring in action 3
