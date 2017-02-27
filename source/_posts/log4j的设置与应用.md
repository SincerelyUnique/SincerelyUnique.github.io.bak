---
title: log4j的设置与应用
date: 2017-02-22 14:27:07
tags: log4j
categories: Java
---
一.单独使用
<!--more-->
1.log4j.properties
```
###Setting###

log4j.rootLogger = debug,stdout,D,E,I



###Output to console###

log4j.appender.stdout = org.apache.log4j.ConsoleAppender

log4j.appender.stdout.Target = System.out

log4j.appender.stdout.layout = org.apache.log4j.PatternLayout

log4j.appender.stdout.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n



###Output debug to debug.log###

log4j.appender.D = org.apache.log4j.DailyRollingFileAppender

log4j.appender.D.File = /home/jalenchu/jalen_chu/logs/debug.log

log4j.appender.D.Append = true

log4j.appender.D.Threshold = DEBUG 

log4j.appender.D.layout = org.apache.log4j.PatternLayout

log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n



###Output info to info.log###

log4j.appender.I = org.apache.log4j.DailyRollingFileAppender

log4j.appender.I.File = /home/jalenchu/jalen_chu/logs/info.log

log4j.appender.I.Append = true

log4j.appender.I.Threshold = INFO 

log4j.appender.I.layout = org.apache.log4j.PatternLayout

log4j.appender.I.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n



###Output error to error.log###

log4j.appender.E = org.apache.log4j.DailyRollingFileAppender

log4j.appender.E.File =/home/jalenchu/jalen_chu/logs/error.log

log4j.appender.E.Append = true

log4j.appender.E.Threshold = ERROR 

log4j.appender.E.layout = org.apache.log4j.PatternLayout

log4j.appender.E.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
```

2.test.java
```
package log4j.test;



import org.apache.log4j.Logger;



public class Log4jTest 

{

    	private static Logger logger = Logger.getLogger(Log4jTest.class);

	

	public static void main(String[] args) 

	{

		    logger.error("This is an error message!");

		

	    	logger.info("This is an info message");

		

    		logger.debug("This is a debug message");

	}

}
```

二.在web项目中使用,使用servlet( log4j.properties同上 )

1.web.xml
```
<servlet> 

        <servlet-name>Log4JInitServlet</servlet-name>  

        <servlet-class>log4j.test.Log4JInitServlet</servlet-class>  

        <init-param>  

            <param-name>log4j-properties-location</param-name>  

            <param-value>/WEB-INF/classes/log4j.properties</param-value>  

        </init-param>  

        <load-on-startup>1</load-on-startup>  

</servlet> 




<servlet-mapping> 

        <servlet-name>Log4JTestServlet</servlet-name>  

        <url-pattern>/*</url-pattern>  

</servlet-mapping> 



<servlet> 

        <servlet-name>Log4JTestServlet</servlet-name>  

        <servlet-class>log4j.test.Log4JTestServlet</servlet-class>  

</servlet>
```

2.Log4JInitServlet.java
```
package log4j.test;



import java.io.File;

import java.io.IOException;



import javax.servlet.ServletConfig;

import javax.servlet.ServletContext;

import javax.servlet.ServletException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.http.HttpServlet;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;



import org.apache.log4j.BasicConfigurator;

import org.apache.log4j.PropertyConfigurator;



@WebServlet("/Log4JInitServlet")

public class Log4JInitServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;



	public Log4JInitServlet() {

		super();

	}



	public void init(ServletConfig config) throws ServletException {

		System.out.println("Log4JInitServlet 正在初始化 log4j日志设置信息");

		String log4jLocation = config.getInitParameter("log4j-properties-location");



		ServletContext sc = config.getServletContext();



		if (log4jLocation == null) {

			System.err.println("*** 没有 log4j-properties-location 初始化的文件, 所以使用 BasicConfigurator初始化");

			BasicConfigurator.configure();

		} else {

			String webAppPath = sc.getRealPath("/");

			String log4jProp = webAppPath + log4jLocation;

			File yoMamaYesThisSaysYoMama = new File(log4jProp);

			if (yoMamaYesThisSaysYoMama.exists()) {

				System.out.println("使用: " + log4jProp + "初始化日志设置信息");

				PropertyConfigurator.configure(log4jProp);

			} else {

				System.err.println("*** " + log4jProp + " 文件没有找到， 所以使用 BasicConfigurator初始化");

				BasicConfigurator.configure();

			}

		}

		super.init(config);

	}



	protected void doGet(HttpServletRequest request, HttpServletResponse response)

			throws ServletException, IOException {



	}



	protected void doPost(HttpServletRequest request, HttpServletResponse response)

			throws ServletException, IOException {



	}

}
```

3.Log4JTestServlet.java
```
package log4j.test;



import java.io.IOException;



import javax.servlet.ServletConfig;

import javax.servlet.ServletException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.http.HttpServlet;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;



import org.apache.log4j.Logger;



@WebServlet("/Log4JTestServlet")

public class Log4JTestServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private static Logger logger = Logger.getLogger(Log4JTestServlet.class);



	public Log4JTestServlet() {

		super();

	}



	public void init(ServletConfig config) throws ServletException {



	}



	protected void doGet(HttpServletRequest request, HttpServletResponse response)

			throws ServletException, IOException {



		logger.debug("This is debug message.");



		logger.info("This is info message.");



		logger.error("This is error message.");

	}



	protected void doPost(HttpServletRequest request, HttpServletResponse response)

			throws ServletException, IOException {

		doGet(request, response);

	}

}
```
