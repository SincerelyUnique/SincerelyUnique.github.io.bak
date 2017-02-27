---
title: Struts2获取前台页面输入信息（Struts2+Extjs-combobox组件）
date: 2017-02-21 09:46:46
tags:
categories: Struts
---
*摘要: struts2的jar包：struts-2.3.24.1 extjs包：extjs4.2.1*
<!--more-->
1. 解决的问题

1）eclipse的Build Path引入User Library里面的struts2 jar包后，还要复制这些jar包到WEB-INF的lib下面

2）struts.xml里面DTD引入的配置，Window-Preferences-XML Catalog-add，在location里面添加自己的DTD路径

我们的DTD文件获得可以通过解压struts2 jar包下的：struts2-core-2.3.24.1.jar获得，

①Location：（你的struts-2.3.dtd的路径）

②Key type：Public ID

③Key：http://struts.apache.org/dtds/struts-2.3.dtd（复制这个添加进去）

3）struts.xml里面action格式：
```
<action name="loadLineName"  class="com.lineStatus.action.lineStatusAction" method="loadLineName"></action>
```
4）前台页面Extjs写的，组件里面store定义总出问题，最后写成这样，好像还是用Ext.Ajax.request好些
```
store:Ext.create('Ext.data.Store',{
	fields:['lineName'],
								
	proxy:{
		type:'ajax',
		url:'\loadLineName.action',
		reader:{
			type:'json',
			root:'lineName'
		}
	}
})
```
2. 没有解决的问题：

1）extjs的combobox组件从前台页面下拉框里面至少输入4个字符才会发送请求到action，不解，难道是默认的？

2）extjs前台页面请求的方式默认是get，但请求的url参数值是query，如下：

	Request URL:

	http://localhost:8080/ExtjsDemo01/loadLineName.action_dc=1458266498448&query=sdfssss&page=1&start=0&limit=25

3）这个只是前台数据到后面，后面到前面没有

3. 代码：

1）extjs页面：
```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>form</title>

<link rel="stylesheet" type="text/css" href="ext-4.2.1/resources/css/ext-all.css" >
<script type="text/javascript" src="ext-4.2.1/bootstrap.js"></script>

<script type="text/javascript">

	Ext.onReady(function(){
		Ext.create('Ext.window.Window',{
			title:'Preferences',
			width:400,
			height:300,
			layout:'fit',
			resizable: false,
			
			items:
				Ext.create('Ext.tab.Panel',{
					renderTo:Ext.getBody(),
					
					items:[{
						title:'A',
						
						items:[{
							xtype:'combobox',
							width:300,
							fieldLabel:'MFG Line',
							store:Ext.create('Ext.data.Store',{
								fields:['lineName'],
								
								proxy:{
									type:'ajax',
									url:'\loadLineName.action',
									reader:{
										type:'json',
										root:'lineName'
									}
								}
							})
							
						}]
					},{
						title:'B'
					},{
						title:'C'
					},{
						title:'D'
					}]
				})
		}).show();
	});
</script>

</head>
<body>

</body>
</html>
```

 2）web.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" id="WebApp_ID" version="3.0">
  <display-name>ExtjsDemo01</display-name>
  
  <filter>
  	<filter-name>struts2</filter-name>
  	<filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
  </filter>
  
  <filter-mapping>
  	<filter-name>struts2</filter-name>
  	<url-pattern>/*</url-pattern>
  </filter-mapping>
  
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

3）struts.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE struts PUBLIC "http://struts.apache.org/dtds/struts-2.3.dtd" "struts-2.3.dtd" >
<struts>

 <constant name="struts.devMode" value="true" /> 
 <package name="default" namespace="/" extends="struts-default">
 	<action name="loadLineName"  class="com.lineStatus.action.lineStatusAction" method="loadLineName">
 		<!-- <result name="error">/pages/error.jsp</result>  -->
 	</action>
 </package>

</struts>
```

4）action
```
package com.lineStatus.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class lineStatusAction extends ActionSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String lineName;
	public String getLineName() {
		return lineName;
	}
	public void setLineName(String lineName) {
		this.lineName = lineName;
	}
	
	public void loadLineName(){
                //三种取数据方式
		//①
		//System.out.println(this.query);                //ognl方式？要query的set和get方法
		//②
		/*ActionContext context=ActionContext.getContext();
		Map parameterMap=context.getParameters();
		String lineNames[]=(String[]) parameterMap.get(“query”);
		System.out.println(lineNames[0]);*/
		//③
		ActionContext context=ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest)context.get(ServletActionContext.HTTP_REQUEST);
		String lineNames=request.getParameter("query");
		System.out.println(lineNames);
		
	}
}
```

