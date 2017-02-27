---
title: ServerApplicationContext类与web.xml里配置servlet
date: 2017-02-22 14:20:33
tags: servlet
categories: Spring
---
1. web.xml
<!--more-->
```
<context-param>

		<param-name>contextConfigLocation</param-name>

		<param-value>/WEB-INF/spring-lineStatusMonitor-server.xml

		</param-value>

	</context-param>



	<!-- listener -->

	<listener>

		<listener-class>org.springframework.web.context.ContextLoaderListener

		</listener-class>

	</listener>



	<servlet>

		<servlet-name>ServerApplicationContext</servlet-name>

		<servlet-class>com.sanmina.mes.dashboard.server.servlet.ServerApplicationContext

		</servlet-class>

		<load-on-startup>3</load-on-startup>

	</servlet>



	<!-- CXF REST -->

<servlet>

		<display-name>CXFNonSpringJaxrsServlet</display-name>

		<servlet-name>CXFNonSpringJaxrsServlet</servlet-name>

		<servlet-class>org.apache.cxf.jaxrs.servlet.CXFNonSpringJaxrsServlet	</servlet-class>

		<init-param>

			<param-name>jaxrs.serviceClasses</param-name>

			<param-value>

			com.sanmina.mes.dashboard.server.wsServer.MesrService,

			com.sanmina.mes.dashboard.server.wsServer.CacheWebService,

<!-- 			com.sanmina.mes.dashboard.server.test.restful.MesrRestful, -->

<!-- 			com.sanmina.mes.dashboard.server.test.restful.ProductLineRestful -->

			</param-value>

		</init-param>

		<init-param>

			<param-name>jaxrs.providers</param-name>

				<param-value>org.apache.cxf.jaxrs.provider.json.JSONProvider,

				   org.apache.cxf.rs.security.cors.CrossOriginResourceSharingFilter 

				</param-value>

<!-- 			<param-value>org.apache.cxf.jaxrs.provider.JSONProvider</param-value> -->

		</init-param>

		<init-param>

			<param-name>jaxrs.address</param-name>

			<param-value>/resources</param-value>

		</init-param>

		<init-param>

			<param-name>jaxrs.features</param-name>

			<param-value>org.apache.cxf.jaxrs.swagger.Swagger2Feature(basePath=/vision-server/rest/resources)</param-value>

		</init-param>

	</servlet>

	<servlet-mapping>

		<servlet-name>CXFNonSpringJaxrsServlet</servlet-name>

		<url-pattern>/rest/*</url-pattern>

	</servlet-mapping>
```

2. ServerApplicationContext.java
```
package com.sanmina.mes.dashboard.server.servlet;



import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;



import org.apache.log4j.Logger;

import org.springframework.context.ApplicationContext;

import org.springframework.web.context.support.WebApplicationContextUtils;



public class ServerApplicationContext extends HttpServlet {

	protected static Logger logger = Logger.getLogger(ServerApplicationContext.class);

	private static final long serialVersionUID = 1L;

	private static ApplicationContext serverContext = null;

	public static String threadPropertiesPath ; 

	

	public static String getThreadPropertiesPath() {

		return threadPropertiesPath;

	}



	public static void setThreadPropertiesPath(String threadPropertiesPath) {

		ServerApplicationContext.threadPropertiesPath = threadPropertiesPath;

	}



	@Override

	public void init() throws ServletException {

		super.init();

		javax.servlet.ServletContext servletContext = getServletContext();

		serverContext = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);

		setThreadPropertiesPath(getServletContext().getRealPath("WEB-INF")+"/thread.properties");

	}

	

	public static ApplicationContext getApplicationContext() {

		return serverContext;

	}

	

	public static void setApplicationContextForTest(ApplicationContext ctx ) {

		  serverContext =ctx;

	}

}
```

3. 代码里面调用
```
LineStatusMonitorService lineStatusMonitorService = (LineStatusMonitorService) ServerApplicationContext

					.getApplicationContext().getBean("lineStatusMonitorService");
```
