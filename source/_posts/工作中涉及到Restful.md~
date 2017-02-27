---
title: 工作中涉及到Restful
date: 2017-02-17 16:30:18
tags: webservice
categories: WebService
---
Restful客户端
1.Struts定义Action时候引入Restful访问路径，加载数据
<!--more-->
```
public String loadLineNames() throws Exception {
String host = "10.180.1.24";
String database = "mesr_e43";
String schema = "mesr";
String resourceName = "MfgLine";
String str = AccessRestProxy.getJsonByPathParam(host, database, schema,
resourceName);
if (str != null && !"".equals(str)) {
Gson gson = new Gson();
mfgLines = gson.fromJson(str, new TypeToken<List<String>>() {
}.getType());
} else
mfgLines = new ArrayList<String>();
return SUCCESS;
}
```

```
public String loadStatusPageDatas() throws Exception {
try {
// step0 add configuration 
String input = "input value like json String";
 
String resourcesName = "PreferenceConfig/addPreferenceConfig";
configData = AccessRestProxy
.postJsontoRestful(resourcesName, input);
// step1 加载preference配置信息 为了读取work order
Layout layout = LayoutLocalServiceUtil.getLayout(groupId, false,
layoutId);
PortletPreferences prefs = (PortletPreferences) PortletPreferencesFactoryUtil
.getLayoutPortletSetup(layout, portletId);
perferenceConfig = lineStatusMonitorService
.loadStatusPerferenceConfig(prefs);
 
// step2 写入第二行数据（假数据） 对应4条配置
String configresourceName = "LineStatusMonitor/BasicConfig";
String str = AccessRestProxy.getJsonByKey(configresourceName);
if (str != null && !"".equals(str)) {
Gson gson1 = new Gson();
row2config = gson1.fromJson(str,
new TypeToken<List<BasicConfig>>() {
}.getType());
} else {
row2config = new ArrayList<BasicConfig>();
}
 
// step3 从server端加载页面数据pageData
String resourceName ="PageData/SPC_WAR_spcportlet_INSTANCE_pzC0";
String strJson = AccessRestProxy.getJsonByKey(resourceName);
if (strJson != null) {
if (strJson.indexOf("returnFlag") == -1) {
Gson gson = new Gson();
pageData = gson.fromJson(strJson,
new TypeToken<List<List<AreaDisplayData>>>() {
}.getType());
}
}
} catch (Exception e) {
logger.error(e);
e.printStackTrace();
}
return SUCCESS;
}
```

2.访问Restful服务器端的设置
```
package com.sanmina.cdc.dashboard.linestatusmonitor.util;
 
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;
 
public class AccessRestProxy {
 
private static String REST_SERVER_RESOUCE_PATH = "http://localhost:9080/mes-dashboard-server/rest/resources/";
 
public static String getJsonByPathParam(String mesrHost,
String mesrDatabase, String schema, String resourcesName) {
String rtv = "";
HttpURLConnection conn = null;
try {
URL url = new URL(REST_SERVER_RESOUCE_PATH
+ "10.180.1.24/mesr_e43/mesr/" + resourcesName);
conn = (HttpURLConnection) url.openConnection();
conn.setDoOutput(true);
conn.setRequestMethod("GET");
conn.setRequestProperty("Content-Type", "application/json");
Scanner scanner;
if (conn.getResponseCode() != 200) {
scanner = new Scanner(conn.getErrorStream());
} else {
scanner = new Scanner(conn.getInputStream());
}
scanner.useDelimiter("\\Z");
while (scanner.hasNext())
rtv = scanner.next();
scanner.close();
} catch (Exception e) {
e.printStackTrace();
System.out.println("url:" + REST_SERVER_RESOUCE_PATH
+ "10.180.1.24/mesr_e43/mesr/" + resourcesName);
} finally {
if (conn != null)
conn.disconnect();
}
return rtv;
}
 
public static String getJsonByKey(String resourcesName) {
String rtv = "";
HttpURLConnection conn = null;
try {
URL url = new URL(REST_SERVER_RESOUCE_PATH + resourcesName);
conn = (HttpURLConnection) url.openConnection();
conn.setDoOutput(true);
conn.setRequestMethod("GET");
conn.setRequestProperty("Content-Type", "application/json");
Scanner scanner;
if (conn.getResponseCode() != 200) {
scanner = new Scanner(conn.getErrorStream());	//nullpointer
} else {
scanner = new Scanner(conn.getInputStream());
}
scanner.useDelimiter("\\Z");
while (scanner.hasNext())
rtv = scanner.next();
scanner.close();
} catch (Exception e) {
e.printStackTrace();
System.out.println("url:" + REST_SERVER_RESOUCE_PATH
+ "10.180.1.24/mesr_e43/mesr/" + resourcesName);
} finally {
if (conn != null)
conn.disconnect();
}
return rtv;
}
 
public static String postJsontoRestful(String resourcesName,
String strJsonData) {
String rtv = "";
HttpURLConnection conn = null;
try {
URL url = new URL(REST_SERVER_RESOUCE_PATH + resourcesName);
conn = (HttpURLConnection) url.openConnection();
conn.setDoOutput(true);
conn.setRequestMethod("POST");
conn.setRequestProperty("Content-Type", "application/json");
String input = strJsonData; // "{\"Student\":{\"name\":\"Tom\"}}";
OutputStream os = conn.getOutputStream();
os.write(input.getBytes());
os.flush();
Scanner scanner;
if (conn.getResponseCode() != 200) {
scanner = new Scanner(conn.getErrorStream()); 
} else {
scanner = new Scanner(conn.getInputStream());
}
scanner.useDelimiter("\\Z");
while (scanner.hasNext())
rtv = scanner.next();
scanner.close();
} catch (Exception e) {
e.printStackTrace();
} finally {
if (conn != null)
conn.disconnect();
}
/*返回的是action里面传入的preferenceConfig信息PreferenceConfigData，
含String portletId和List<OneTabConfig>*/
return rtv;
}
 
}
```

3.服务器端web.xml添加配置
```
<servlet>
<display-name>CXFNonSpringJaxrsServlet</display-name>
<servlet-name>CXFNonSpringJaxrsServlet</servlet-name>
<servlet-class>org.apache.cxf.jaxrs.servlet.CXFNonSpringJaxrsServlet	</servlet-class>
<init-param>
<param-name>jaxrs.serviceClasses</param-name>
<param-value>
com.sanmina.cdc.dashboard.server.restful.LineStatusMonitorRestful,
com.sanmina.cdc.dashboard.server.restful.LineStatusMonitorCacheRestful,
com.sanmina.cdc.dashboard.server.restful.ProductLineRestful,
com.sanmina.cdc.dashboard.server.restful.MesrRestful
</param-value>
</init-param>
<init-param>
<param-name>jaxrs.providers</param-name>
<param-value>org.apache.cxf.jaxrs.provider.json.JSONProvider</param-value>
<!-- 	<param-value>org.apache.cxf.jaxrs.provider.JSONProvider</param-value> -->
</init-param>
<init-param>
<param-name>jaxrs.address</param-name>
<param-value>/resources</param-value>
</init-param>
<init-param>
<param-name>jaxrs.features</param-name>
<param-value>org.apache.cxf.jaxrs.swagger.Swagger2Feature(basePath=/mes-dashboard-server/rest/resources)</param-value>
</init-param>
</servlet>
<servlet-mapping>
<servlet-name>CXFNonSpringJaxrsServlet</servlet-name>
<url-pattern>/rest/*</url-pattern>
</servlet-mapping>
```

4.服务器端Restful API路径接口
```
package com.sanmina.cdc.dashboard.server.restful;
 
import java.util.List;
 
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
 
import com.google.gson.Gson;
import com.sanmina.cdc.dashboard.server.ehcache.LSMCacheServiceImpl;
import com.sanmina.cdc.dashboard.server.model.BasicConfig;
import com.sanmina.cdc.dashboard.server.model.PageData;
import com.sanmina.cdc.dashboard.server.model.PreferenceConfigData;
import com.sanmina.cdc.dashboard.server.model.Workstation;
import com.sanmina.cdc.dashboard.server.service.LineStatusMonitorService;
import com.sanmina.cdc.dashboard.server.servlet.ServerApplicationContext;
import com.sanmina.cdc.dashboard.server.util.Cache;
 
import io.swagger.annotations.Api;
 
@Consumes("application/json")
@Produces("application/json")
@Api(value = "/lineStatusMonitor")
public class LineStatusMonitorRestful {
 
@GET
@Path("/PageData/{portletId}")
// @ApiOperation(
// value = "Get operation with Response and @Default value",
// notes = "Get operation with Response and @Default value",
// response = OneTabConfig.class,
// responseContainer = "List"
// )
public Response loadPageDataByPreference(
// @ApiParam(value = "Page to fetch", required = true)
@PathParam("portletId") String portletId) {
if (portletId != null && !"".equals(portletId)) {
LineStatusMonitorService lineStatusMonitorService = (LineStatusMonitorService) 
ServerApplicationContext
.getApplicationContext()
.getBean("lineStatusMonitorService");
PreferenceConfigData config = Cache.getPreferenceConfig(portletId);
if (config != null) {
Gson gson = new Gson();
PageData data = lineStatusMonitorService
.loadPageDataByPreference(config);
return Response.ok(gson.toJson(data.getPageDatas())).build();
} else {
return Response
.ok("{\"returnFlag\":\"false\",\"message\":\"can't get preferenceConfigData\"}")
.build();
}
} else {
return Response
.ok("{\"returnFlag\":\"false\",\"message\":\"please check portletId\"}")
.build();
}
}
 
@POST
@Path("/PreferenceConfig/addPreferenceConfig")
public Response addPreferenceConfigData(PreferenceConfigData config) {
if (config != null){
Cache.putPreferenceConfig(config.getPortletId(), config);
}
Gson gson = new Gson();
return Response.ok(gson.toJson(config)).build();
}
 
@GET
@Path("/PreferenceConfig/{portletId}")
public Response getPageDataByPreference(
@PathParam("portletId") String portletId) {
if (portletId != null) {
PreferenceConfigData config = Cache.getPreferenceConfig(portletId);
if (config != null) {
Gson gson = new Gson();
return Response.ok(gson.toJson(config)).build();
} else {
return Response
.ok("{\"returnFlag\":\"false\",\"message\":\"can't get configuration\"}")
.build();
}
} else {
return Response
.ok("{\"returnFlag\":\"false\",\"message:\":\"porletId can't  empty \"}")
.build();
}
}
 
@POST
@Path("/PreferenceConfig/updatePreferenceConfig")
public Response updatePreferenceConfigData(PreferenceConfigData config) {
if (config != null)
Cache.putPreferenceConfig(config.getPortletId(), config);
Gson gson = new Gson();
return Response.ok(
"{\"returnFlag\":\"true\"," + gson.toJson(config) + "}")
.build();
}
 
@GET
@Path("/{databaseHost}/{database}/{schema}/partnumber")
@Produces(MediaType.APPLICATION_JSON)
public Response loadPartnumber(
@PathParam("databaseHost") String databaseHost,
@PathParam("database") String database,
@PathParam("schema") String schema) {
LineStatusMonitorService lineStatusMonitorService = (LineStatusMonitorService) 
ServerApplicationContext
.getApplicationContext().getBean("lineStatusMonitorService");
List<String> ps = lineStatusMonitorService.loadPartnumber(databaseHost,
database, schema);
Gson gson = new Gson();
return Response.ok(gson.toJson(ps)).build();
}
 
@GET
@Path("/{databaseHost}/{database}/{schema}/process")
@Produces(MediaType.APPLICATION_JSON)
public Response loadProcess(@PathParam("databaseHost") String databaseHost,
@PathParam("database") String database,
@PathParam("schema") String schema) {
LineStatusMonitorService lineStatusMonitorService = (LineStatusMonitorService) 
ServerApplicationContext
.getApplicationContext().getBean("lineStatusMonitorService");
List<String> ps = lineStatusMonitorService.loadProcess(databaseHost,
database, schema);
Gson gson = new Gson();
return Response.ok(gson.toJson(ps)).build();
}
    
@GET
@Path("/{databaseHost}/{database}/{schema}/MfgLine")
@Produces(MediaType.APPLICATION_JSON)
public Response loadMfgLine(@PathParam("databaseHost") String databaseHost,
@PathParam("database") String database,
@PathParam("schema") String schema) {
LineStatusMonitorService lineStatusMonitorService = (LineStatusMonitorService) 
ServerApplicationContext
.getApplicationContext().getBean("lineStatusMonitorService");
List<String> ps = lineStatusMonitorService.loadMFGLine(databaseHost,
database, schema);
Gson gson = new Gson();
return Response.ok(gson.toJson(ps)).build();
}
 
@GET
@Path("/{databaseHost}/{database}/{schema}/workstation")
@Produces(MediaType.APPLICATION_JSON)
public Response loadWorkstation(
@PathParam("databaseHost") String databaseHost,
@PathParam("database") String database,
@PathParam("schema") String schema) {
LineStatusMonitorService lineStatusMonitorService = (LineStatusMonitorService) 
ServerApplicationContext
.getApplicationContext().getBean("lineStatusMonitorService");
List<Workstation> ps = lineStatusMonitorService.loadWorkstation(
databaseHost, database, schema);
Gson gson = new Gson();
return Response.ok(gson.toJson(ps)).build();
}
 
@GET
@Path("/{databaseHost}/{database}/{schema}/workstation/{process}")
@Produces(MediaType.APPLICATION_JSON)
public Response loadFilterWorkstation(
@PathParam("databaseHost") String databaseHost,
@PathParam("database") String database,
@PathParam("schema") String schema,
@PathParam("process") String process) {
LineStatusMonitorService lineStatusMonitorService = (LineStatusMonitorService) 
ServerApplicationContext
.getApplicationContext().getBean("lineStatusMonitorService");
List<Workstation> ps = lineStatusMonitorService
.loadWorkstationWithFilter(databaseHost, database, schema,
process);
Gson gson = new Gson();
// System.out.print("resuls 147:"+ gson.toJson(ps) );
return Response.ok(gson.toJson(ps)).build();
}
 
@GET
@Path("/Line/{workorder}")
@Produces(MediaType.APPLICATION_JSON)
public Response loadWorkOrder() {
LineStatusMonitorService lineStatusMonitorService = (LineStatusMonitorService) 
ServerApplicationContext
.getApplicationContext().getBean("lineStatusMonitorService");
Gson gson = new Gson();
List<String> data = lineStatusMonitorService.loadWorkOrder();
return Response.ok(gson.toJson(data)).build();
}
@GET
@Path("/Dashboard/{BasicConfig}")
@Produces(MediaType.APPLICATION_JSON)
public Response loadBasicConfig() {
LineStatusMonitorService lineStatusMonitorService = (LineStatusMonitorService) 
ServerApplicationContext
.getApplicationContext().getBean("lineStatusMonitorService");
Gson gson = new Gson();
List<BasicConfig> data = lineStatusMonitorService.loadRow2Config();
return Response.ok(gson.toJson(data)).build();
}
}
```
