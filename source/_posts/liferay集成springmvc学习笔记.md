---
title: liferay集成springmvc学习笔记
date: 2017-03-1 14:15:15
tags: 
categories: Liferay
---
1. 页面的切换，如我在liferay-springmvc-test下面创建一个新的index.jsp,想要容器初始化时加载这个页面，可以通过设置PortletViewController.java
<!--more-->
```
package com.liferay.test.springmvc.controller;

import com.liferay.portal.kernel.util.ReleaseInfo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.portlet.bind.annotation.RenderMapping;

@Controller
@RequestMapping("VIEW")
public class PortletViewController {

	@RenderMapping
	public String question(Model model) {
		model.addAttribute("releaseInfo", ReleaseInfo.getReleaseInfo());
		model.addAttribute("name", "hahahahaha,gogogo");
		//注意这里，将之前liferay-springmvc-test/view改成liferay-springmvc-test/index即可
		return "liferay-springmvc-test/index";
	}

}
```
2. 新建一个package，名字是：com.liferay.test.springmvc.controller，同时记得修改WEB-INF下面portlet下面的liferay-springmvc-test-portlet.xml，改component-scan
```
之前是：
<context:component-scan base-package="com.liferay.test.springmvc.**" />
改后是：
<context:component-scan base-package="com.liferay.test.springmvc.controller.**" />
```

3. 使用了jstl，使用了c标签，前台c标签可以获取到后台传递的值，引入到js变量操作,向前台传值需要@RenderMapping注解，
后台：
```
	@RenderMapping
	public String question(Model model) {
		model.addAttribute("releaseInfo", ReleaseInfo.getReleaseInfo());
		model.addAttribute("name", "hahahahaha,gogogo");

		List<User> userList = new ArrayList<User>();
		
		User user1 = new User();
		user1.setId(1);
		user1.setUsername("jalen_chu");
		user1.setPassword("123456");
		userList.add(user1);
		
		User user2 = new User();
		user2.setId(2);
		user2.setUsername("abely_liu");
		user2.setPassword("123456");
		userList.add(user2);
		
		model.addAttribute("userList",userList);
		
		List<String> strList = new ArrayList<String>();
		strList.add("123");
		strList.add("5ert");
		strList.add("73w");
		
		model.addAttribute("strList",strList);
		
		return "liferay-springmvc-test/index";
	}
```
前台：
```
	var name = "${name}";
	console.info(name);
	
	console.info("-------------------------------------------------")
	
	var arr = new Array(); 
	var count = 1;

	/* <c:forEach	items="${userList}"  var="user" >
		arr[count] = new Array(); 
		arr[count][1] = "${user.id}";
		arr[count][2] = "${user.username}";
 		arr[count][3] = "${user.password}";
 		count ++;
	</c:forEach> */

	<c:forEach	items="${userList}"  var="user" >
		arr.push("${user}");
	</c:forEach>
	console.info(arr);
	
	console.info("-------------------------------------------------")
	
	var arr2 = new Array();
	<c:forEach items="${strList}" var="a"> 
		arr2.push("${a}"); 
	</c:forEach> 
	console.info(arr2);
```
前台控制台可以看到参数

4. AJAX请求
前台：
```
	$(document).ready(function(){
		$("#b01").click(function(){
			console.info("b01 click!");
			
			htmlobj=$.ajax({url:"test1.txt",async:false});
			$("#myDiv").html(htmlobj.responseText);
		});
		
		$("#b02").click(function(){
			console.info("b02 click!");
			
			$.post("/example/jquery/demo_test_post.asp",
		    {
		      name:"Donald Duck",
		      city:"Duckburg"
		    },
		    function(data,status){
		      alert("数据：" + data + "\n状态：" + status);
		    });
		});
	});

	<div id="myDiv"><h2>Let AJAX change this text</h2></div>
	<button id="b01" type="button">Change Content</button>
	<br/>
	<button id="b02" type="button">向页面发送 HTTP POST 请求，并获得返回的结果</button>
```
