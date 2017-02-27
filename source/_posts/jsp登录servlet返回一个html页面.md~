---
title: jsp登录servlet返回一个html页面
date: 2017-02-21 08:46:45
tags: servlet
categories: Servlet
---
1. 结构

            ServletDemo02----JavaResources---src---LoginServlet.java

                                         ----WebContent---WEB-INF---web.xml

                                         ----WebContent---index.html
<!--more-->
2. LoginServlet.java
```
import java.io.*; 
import javax.servlet.*; 
import javax.servlet.http.*; 
  
public class LoginServlet extends HttpServlet { 
    //重写doGet方法 
    public void doGet(HttpServletRequest request,  HttpServletResponse response)  throws ServletException,  IOException { 
        String username = request.getParameter("username");     
        String password = request.getParameter("password");        
          
        //服务器端打印信息  
        //System.out.println("username=" + username);  
        //System.out.println("password=" + password);  
        //设置编码格式  
        response.setContentType("text/html;charset=GB18030");  
          
        //返回html页面  
        response.getWriter().println("<html>");  
        response.getWriter().println("<head>");     
        response.getWriter().println("<title>登录信息</title>");      
        response.getWriter().println("</head>");    
        response.getWriter().println("<body>");     
        response.getWriter().println("欢迎【" + username + "】用户登录成功！！！");    
        response.getWriter().println("</body>");    
        response.getWriter().println("</html>");  
        }                     
    //重写doPost方法 
    public void doPost(HttpServletRequest request,  HttpServletResponse response)  throws ServletException,  IOException { 
        doGet(request, response);                     
    } 
}
```
3. web.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" id="WebApp_ID" version="3.0">
  <display-name>ServletDemo02</display-name>
 
 <servlet> 
        <servlet-name>MyServlet</servlet-name>  
        <servlet-class>LoginServlet</servlet-class>  
    </servlet> 
  
    <servlet-mapping> 
        <servlet-name>MyServlet</servlet-name>  
            <url-pattern>/LoginServlet</url-pattern>  
    </servlet-mapping> 
 
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
</web-app>
```
4. index.jsp
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
        <form action="http://localhost:8080/ServletDemo02/LoginServlet" method="post">  
            用户：<input type="text" name="username" /><br/>  
            密码：<input type="password" name="password" /><br/>  
        <input type="submit" value="登录" />  
</body>
</html>
```
