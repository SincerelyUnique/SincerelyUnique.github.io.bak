---
title: 获取liferay权限
date: 2017-03-2 13:18:15
tags: 
categories: Liferay
---
工作中遇到需要从jsp页面获取登录最高权限及相应site里某个页面具体的权限，以下是具体代码：
1.获取登录状态下最高权限
<!--more-->
首先jsp头引入
```
<%@ taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %>
<%@ taglib uri="http://liferay.com/tld/security" prefix="liferay-security" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>
<%@ taglib uri="http://liferay.com/tld/util" prefix="liferay-util" %>

<%@ page import="com.liferay.portal.theme.ThemeDisplay" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>

<portlet:defineObjects />
<liferay-theme:defineObjects />
```
2.获取登录状态，返回一个布尔值
```
ThemeDisplay portletThemeDisplay = (ThemeDisplay) request.getAttribute(WebKeys.THEME_DISPLAY);
boolean signedIn = portletThemeDisplay.isSignedIn();
```
3.获取某个指定site指定的权限，比如preferences的权限
```
PortletPreferences prefs = renderRequest.getPreferences(); 
long myGroupId = scopeGroupId; 
String myName = portletDisplay.getRootPortletId(); 
String myPrimKey = portletDisplay.getResourcePK(); 
String actionId = "PREFERENCES"; 
boolean showOperateColumn = permissionChecker.hasPermission(myGroupId, myName, myPrimKey, actionId); 
```
Appendix：这里面某些对象是liferay自带的，会自动识别！
