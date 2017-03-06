---
title: liferay页面session过期处理
date: 2017-03-6 13:18:15
tags: 
categories: Liferay
---
生产中，因为dashboard需要实时反馈产线产能及良率状态，所以需要禁掉liferay里面的session过期机制，故而需要引入对session的处理：
方法如下
<!--more-->
```
if(  typeof(Liferay.Session) != "undefined" ){
	clearTimeout(Liferay.Session._stateCheck); 
	Liferay.Session.warn = doNothing(); 
	Liferay.Session.extend = doNothing(); 
	Liferay.Session.checkState = doNothing(); 
	Liferay.Session.expire = doNothing();
}
```
Appendix: 这段代码一定要放在liferay页面中，否则不会识别