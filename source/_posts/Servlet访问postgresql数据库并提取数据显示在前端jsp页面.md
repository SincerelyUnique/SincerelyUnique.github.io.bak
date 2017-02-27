---
title: Servlet访问postgresql数据库并提取数据显示在前端jsp页面
date: 2017-02-21 08:49:28
tags: 
categories: Servlet
---
1. 结构
![](http://static.oschina.net/uploads/space/2016/0126/174342_ok9U_2550349.png)
<!--more-->
2. LoginTestServlet.java
```
package com.test; 
      
import java.io.IOException; 
import java.sql.Connection;
import java.sql.DriverManager; 
import java.sql.ResultSet; 
      

import java.sql.Statement;

import javax.servlet.ServletException; 
import javax.servlet.annotation.WebServlet; 
import javax.servlet.http.HttpServlet; 
import javax.servlet.http.HttpServletRequest; 
import javax.servlet.http.HttpServletResponse; 
import javax.servlet.http.HttpSession; 
      
 
      
    /** 
     * Servlet implementation class LoginTestServlet 
     */ 
    @WebServlet("/LoginTestServlet") 
    public class LoginTestServlet extends HttpServlet { 
        private static final long serialVersionUID = 1L;  
             
        /** 
         * @see HttpServlet#HttpServlet() 
         */  
        public LoginTestServlet() {  
            super();  
              
        }  
      
        /** 
         * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response) 
         */  
        protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
            doPost(request, response);  
        }  
      
        /** 
         * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response) 
         */  
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
            response.setContentType("text/html;charset=gb2312");  
            request.setCharacterEncoding("gb2312");  
              
            String result = "";  
          
            String username = request.getParameter("username");  
            String psw = request.getParameter("password");  
              
            if(username == "" || username == null || username.length()>20){  
                try {  
                    result = "请输入用户名（不能超过20个字符）";  
                    request.setAttribute("message", result);  
                    response.sendRedirect("login.jsp");  
                    return;  
                } catch (Exception e) {  
                    e.printStackTrace();  
                }  
            }  
              
            if(psw == "" || psw == null || psw.length() > 20){  
                try {  
                    result = "请输入密码（不能超过20个字符）";  
                    request.setAttribute("message", result);  
                    response.sendRedirect("login.jsp");  
                    return;  
                } catch (Exception e) {  
                    e.printStackTrace();  
                }  
            }  
              
            //登记JDBC驱动程序  
            try {  
                Class.forName("org.postgresql.Driver");  
            } catch (Exception e) {  
                System.out.print("Class Not Found Exception");  
            }  
              
            //链接URL  
            String url = "jdbc:postgresql://localhost:5432/mydb";  
            Connection conn = null;  
            Statement stmt = null;  
            ResultSet rs = null;  
              
            try {  
                conn = (Connection) DriverManager.getConnection(url,"postgres","postgres");  
                stmt = (Statement) conn.createStatement();  
                  
                String sql = "select * from userInfo where username='"+username+"' and userpsw= '"+psw+"'";  
                rs = stmt.executeQuery(sql);  
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
              
        HttpSession session = request.getSession();  
        session.setAttribute("username", username);  
              
        try {  
            if(rs.next()){  
                session.setAttribute("age",rs.getString("age")) ;  
                session.setAttribute("sex",rs.getString("sex")) ;  
                session.setAttribute("weight",rs.getString("weight")) ;  
                response.sendRedirect("success.jsp") ;  
                return;  
            }else{  
                session.setAttribute("message", "用户名或密码不匹配。");  
                response.sendRedirect("fail.jsp") ;  
                return;  
            }  
              
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        }  
      
    }
```
3. login.jsp
```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>User Login</title>
</head>
<body>
    <form method="POST" name="frmLogin" action="LoginTestServlet"> 
        <h1 align="center">用户登录</h1>  
        <center>  
            <table border="1">  
                <tr>  
                    <td>用户名：</td>  
                    <td>  
                        <input type="text" name="username" value="" size="20" maxlength="20" onfocus="if (this.value=='Your name')  this.value='';" />  
                    </td>  
                </tr>  
                <tr>  
                    <td>密  码：</td>  
                    <td>  
                        <input type="password" name="password" value="" size="20" maxlength="20" onfocus="if(this.value=='Your Password') this.value='';">  
                    </td>  
                </tr>  
                <tr>  
                    <td>  
                        <input type="submit" name="Submit" value=" 提交" onclick="return validateLogin()">  
                    </td>  
                    <td>  
                        <input type="reset" name="Reset" value="重置" />  
                    </td>  
                </tr>  
            </table>  
        </center>  
    </form> 
      
    <script type="text/javascript">  
               function validateLogin(){  
                 var sUserName = document.frmLogin.username.value;  
                 var sPassword = document.frmLogin.psssword.value;  
                if (sUserName ==""){  
                 alert("请输入用户名!");  
                 return false ;  
                }  
                  
                if (sPassword ==""){  
                 alert("请输入密码!");  
                 return false ;  
                }  
        }  
    </script> 
</body>
</html>
```
4. success.jsp
```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<% 
   String userName = (String)session.getAttribute("username") ; 
   String age = (String)session.getAttribute("age") ; 
   String weight = (String)session.getAttribute("weight") ; 
   String sex = (String)session.getAttribute("sex") ; 
   System.out.println("性别：A" + sex +"A")  ; 
 /*   if (sex.trim().equals("M")) { 
    sex ="男" ; 
   }else{ 
    sex = "女" ; 
   }   */
  %> 
  <div align="center"> 
   <%=userName %> 
   欢迎您，登陆成功！<br /> 
   <font color="blue">登陆用户信息：</font> 
   <table border =1 > 
    <tr> 
     <td> 姓名： </td> 
     <td>  <%=userName %>  </td> 
    </tr> 
    <tr> 
     <td> 年龄： </td> 
     <td>  <%=age %>  </td> 
    </tr>
    <tr> 
     <td> 体重： </td> 
     <td>  <%=weight %> kg </td> 
    </tr> 
    <tr> 
     <td> 性别： </td> 
     <td>  <%=sex %>  </td> 
    </tr> 
   </table> 
   <a href="login.jsp">返回</a> 
  </div> 
</body>
</html>
```
5. fail.jsp
```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<% 
        String userName = (String) session.getAttribute("username");  
        String msg = (String) session.getAttribute("message");  
    %> 
    <div align="center"> 
        <%=userName%> 
        对不起，登陆失败！<br /> <font color="red">原因： </font>  
        <%=msg%>  
        <br /> <br /> 5秒后将返回登陆界面。  
    </div> 
  
    <% 
        response.setHeader("Refresh", "5;URL=/ServletDemo01/login.jsp");  
    %>
</body>
</html>
```
6. 数据库表
```
CREATE TABLE userinfo
(
  username character varying NOT NULL,
  userpsw character varying NOT NULL,
  age integer,
  sex character(1),
  weight integer,
  CONSTRAINT userinfo_pkey PRIMARY KEY (username)
)
```
7. web.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" id="WebApp_ID" version="3.0">
  <display-name>ServletDemo01</display-name>
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
      <servlet> 
        <servlet-name>LoginTestServlet</servlet-name>  
        <servlet-class>com.test.LoginTestServlet</servlet-class>  
    </servlet> 
      
    <servlet-mapping> 
        <servlet-name>LoginTestServlet</servlet-name>  
        <url-pattern>/loginTestServlet</url-pattern>  
    </servlet-mapping> 
</web-app>
```
