---
title: struts2 国际化
date: 2017-02-22 14:22:15
tags:
categories: Struts
---
1. struts.xml
<!--more-->
```
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE struts PUBLIC "-//Apache Software Foundation//DTD Struts Configuration 2.0//EN" "http://struts.apache.org/dtds/struts-2.0.dtd">



<struts>



<constant name="struts.custom.i18n.resources" value="bundles.resourcebundle"/>



<constant name="struts.i18n.encoding" value="UTF-8"/>

<constant name="struts.ui.theme" value="simple" /> 

    <include file="struts-mesLineStatusMonitor.xml"/>

</struts>
```

2.和struts.xml同级新建bundles文件夹，并建resourcebundle.properties,resourcebundle_en_US.properties,resourcebundle_zh_CN.properties

resourcebundle_en_US.properties
```
row2.uph							= UPH
```
resourcebundle_zh_CN.properties
```
row2.uph							= 每小时产量
```
如果从上面两个文件找不到，会默认加载resourcebundle.properties里面的内容

3. struts-mesLineStatusMonitor.xml
```
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE struts PUBLIC

    "-//Apache Software Foundation//DTD Struts Configuration 2.0//EN"

    "http://struts.apache.org/dtds/struts-2.0.dtd">



<struts>

	<package name="epanelView" extends="struts-portlet-default"		namespace="/view">

		           <action name="lineStatusMonitorIndex" class="lineStatusAction"	method="index">

			                  <result name="success">/view/lineStatusMonitor.jsp</result>

		           </action>	

	</package>



	<package name="Struts2_AJAX_JASON" extends="json-default">

		<interceptors>

			<interceptor-stack name="myDefaultStack">

				<interceptor-ref name="json" />

				<interceptor-ref name="defaultStack" />

			</interceptor-stack>

		</interceptors>

		<default-interceptor-ref name="myDefaultStack" />

	

		<action name="addLineStautsMonitorConfigs" class="lineStatusAction"	method="addLineStautsMonitorConfigs">

			<result type="json"></result>

		</action>

		

		<action name="loadLineStautsMonitorConfigs" class="lineStatusAction"	method="loadLineStautsMonitorConfigs">

			<result type="json">

				<param name="root">lineStatusMonitorConfigs</param>

			</result>

		</action>

		

		<action name="loadMfgLines" class="lineStatusAction" method="loadMfgLines">

			<result type="json">

			<param name="root">mfgLines</param>

			</result>

		</action>

		

		<action name="loadProcesses" class="lineStatusAction"	method="loadProcesses">

			<result type="json">

				<param name="root">processes</param>	<!--process-->

			</result>

		</action>

		

		<action name="loadPartNumbers" class="lineStatusAction"	method="loadPartNumbers">

			<result type="json">

				<param name="root">partNumbers</param>

			</result>

		</action>

		

		<action name="loadWorkOrders" class="lineStatusAction"	method="loadWorkOrders">

			<result type="json">

				<param name="root">workOrders</param>

			</result>

		</action>

		

		<action name="loadWorkstations" class="lineStatusAction"	method="loadWorkstations">

			<result type="json">

				<param name="root">workstations</param>	<!--workstions-->

			</result>

		</action>



		<action name="loadLineStatusMonitorAreas" class="lineStatusAction"	method="loadLineStatusMonitorAreas">

			<result type="json">

				<param name = "root">lineStatusMonitorAreas</param> 

			</result>

		</action>

		

	</package>



</struts>
```

4. lineStatusMonitor.jsp
```
<%@ page import="java.util.ResourceBundle"%>

<%@ page import="java.util.Locale"%>

<%@ taglib prefix="s" uri="/struts-tags"%>



<%

      ResourceBundle bundle = portletConfig.getResourceBundle(locale);

%>



<script>

      uphLabel = "<div{display:inline;} class=\"label\">"+ "<%=bundle.getString("row2.uph")%>" +"</div>";

</script>
```
