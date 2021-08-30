---
title: Ehcache的基本运用
date: 2017-02-17 16:34:08
tags: ehcache
categories: Cache
---
Ehcache 的基本运用
1.src/main/resources目录下面新建配置文件，ehcache.xml.
<!--more-->
```
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd">
<!-- 缓存在磁盘上的存储路径 -->
<diskStore path="java.io.tmpdir"/>
    <defaultCache
        maxElementsInMemory="10000"
        eternal="false"
        overflowToDisk="true"
        timeToIdleSeconds="500"
        timeToLiveSeconds="1000"
        diskPersistent="false"
        diskExpiryThreadIntervalSeconds="120"/>
   <cache name="preferenceConfigCache" 
   	maxElementsInMemory="50000"
        eternal="false" 
        overflowToDisk="false"
        diskSpoolBufferSizeMB="20" 
        timeToIdleSeconds="300"
        timeToLiveSeconds="600"
        memoryStoreEvictionPolicy="LFU" />
 
</ehcache>
```
<!--more-->
2.WEB-INF下面定义ehcache-config.xml
```
<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:aop="http://www.springframework.org/schema/aop" 
    xmlns:tx="http://www.springframework.org/schema/tx"
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/aop 
    http://www.springframework.org/schema/aop/spring-aop.xsd
    http://www.springframework.org/schema/tx 
    http://www.springframework.org/schema/tx/spring-tx.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">
    <!--缓存 -->
    
    <bean id="cacheManager"
        class="org.springframework.cache.ehcache.EhCacheManagerFactoryBean"
   p:shared="true">
        <property name="configLocation">
            <value>classpath:ehcache.xml</value>
        </property>
    </bean>
<bean id="preferenceConfigCache" 
class="org.springframework.cache.ehcache.EhCacheFactoryBean">
        <property name="cacheManager" ref="cacheManager" />
        <property name="cacheName"><value>preferenceConfigCache</value></property>
    </bean>
    
</beans>
```

3.spring总配置文件引入ehcache-config.xml
```
<import resource="ehcache-config.xml" />
```

4.ehcache 辅助方法类
```
import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;
 
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
 
public class CallEhcacheTool {
 
protected static Logger logger = Logger.getLogger(CallEhcacheTool.class);
 
private static ApplicationContext ctxt;
 
static {
System.out.println(System.getProperty("user.dir"));
ctxt = new FileSystemXmlApplicationContext(
"workspace/mes-dashboard-server/dashboardServerWeb/src/main
        /webapp/WEB-INF/ehcache-config.xml"
); 
System.out.println("初始化缓存");
/*ctxt = new FileSystemXmlApplicationContext("
               dashboardServerWeb/src/main/webapp/WEB-INF/ehcache-config.xml");    
System.out.println("初始化缓存");*/
}
 
public static Cache getCache(String cacheName) {
return (Cache) ctxt.getBean(cacheName);
}
 
public static Object getObjectInCache(String cacheName, String key) {
Cache ch = getCache(cacheName);
if (null != ch) {
System.out.println("缓存[" + cacheName + "]中的对象数量为= " + ch.getSize());
}
Element ele = ch.get(key);
if (ele == null) {
System.out.println("缓存[" + cacheName + "]中key为[" + key + "]的对象不存在");
return null;
} else {
return ele.getValue();
}
}
 
public static void setObjectInCache(String cacheName, String key,
Object value) {
Cache ch = getCache(cacheName);
Element ele = new Element(key, value);
ch.put(ele);
}
 
public static void delCache(String cacheName) {
Cache ch = getCache(cacheName);
ch.removeAll();
System.out.println("清除缓存[" + cacheName + "]内的所有数据。");
}
 
public static boolean checkKey(String cacheName, String key) {
Cache ch = getCache(cacheName);
return ch.getKeys().contains(key);
}
public static void main(String[] args) {
//test
String input = "a json String object";
setObjectInCache("preferenceConfigCache","SPC_WAR_spcportlet_INSTANCE_pzC0"
    ,input);
Object value = getObjectInCache("preferenceConfigCache", 
  "SPC_WAR_spcportlet_INSTANCE_pzC0");
System.out.println(value);
}
}
```

5.ehcache的接口定义
```
public interface LSMCacheService<T> {
public T getLSMCache(String portletId); 
public void setLSMCache(String portletId, T object); 
public void delLSMCache();
public boolean checkLSMKey(String portletId);
}
```

6.ehcache接口实现类
```
public class LSMCacheServiceImpl implements LSMCacheService<PreferenceConfigData>
 {
 
private static Log log = LogFactory.getLog(LSMCacheServiceImpl.class);
 
public static final String LINESTATUSMONITOR_CACHENAME = "preferenceConfigCache";
 
public PreferenceConfigData getLSMCache(String portletId) {
// 直接调用辅助方法，返回结果
//System.out.println(portletId);
return (PreferenceConfigData) 
CallEhcacheTool
.getObjectInCache(LINESTATUSMONITOR_CACHENAME, portletId);
}
 
public void setLSMCache(String portletId, PreferenceConfigData preferConfig) {
// 调用辅助方法，放入缓存
CallEhcacheTool
.setObjectInCache(LINESTATUSMONITOR_CACHENAME, portletId, preferConfig);
}
 
public void delLSMCache() {
// 调用辅助方法，清空缓存数据
CallEhcacheTool.delCache(LINESTATUSMONITOR_CACHENAME);
log.info("清空名称为[" + LINESTATUSMONITOR_CACHENAME + "]的缓存");
}
 
public boolean checkLSMKey(String sid) {
return CallEhcacheTool.checkKey(LINESTATUSMONITOR_CACHENAME, sid);
}
}
```

8.使用ehcache
```
LSMCacheServiceImpl lsm = new LSMCacheServiceImpl();
lsm.setLSMCache(config.getPortletId(), config);

LSMCacheServiceImpl lsm = new LSMCacheServiceImpl();
PreferenceConfigData config = lsm.getLSMCache(portletId);
```

9.使用ehcache（单例模式）
```
package com.sanmina.mes.dashboard.server.cache.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.sanmina.mes.dashboard.server.cache.CacheService;
import com.sanmina.mes.dashboard.server.model.LineStatusMonitorConfig;
import com.sanmina.mes.dashboard.server.util.EhcacheTool;

public class LsmConfigCacheServiceImpl implements CacheService<List<LineStatusMonitorConfig>> 
{	
	protected static Logger logger = Logger.getLogger(LsmConfigCacheServiceImpl.class);

	public static final String LINESTATUSMONITOR_CACHENAME = "preferenceConfigCache";

	public static long CURRENT_MILL_SECOND =  System.currentTimeMillis() ;
	
	public static long REFRESH_CURRENT_MILL_SECOND =  System.currentTimeMillis() ;
	
	public static int REFREASH_MINUTES = 5;
	
	public static Map<String, Long> REFRESH_MAP = new HashMap<String, Long>();
	
	private LsmConfigCacheServiceImpl() 
	{
		
	}

	private static LsmConfigCacheServiceImpl lsmConfigCache = new LsmConfigCacheServiceImpl();

	public static LsmConfigCacheServiceImpl getInstance() 
	{
		return lsmConfigCache;
	}

	@SuppressWarnings("unchecked")
	public List<LineStatusMonitorConfig> getCache(String portletId) 
	{
		return (List<LineStatusMonitorConfig>) EhcacheTool.getObjectFromCache(LINESTATUSMONITOR_CACHENAME, portletId);
	}

	public void setCache(String portletId,List<LineStatusMonitorConfig> preferConfig) 
	{
		if(!REFRESH_MAP.containsKey(portletId)){
			long currentTime = System.currentTimeMillis() ;
			REFRESH_MAP.put(portletId, currentTime);
		}
		EhcacheTool.setObjectInCache(LINESTATUSMONITOR_CACHENAME, portletId,preferConfig);
	}

	public void delCache() 
	{
		EhcacheTool.delCache(LINESTATUSMONITOR_CACHENAME);
	}

	public boolean checkKey(String sid) 
	{
		return EhcacheTool.checkKey(LINESTATUSMONITOR_CACHENAME, sid);
	}

	public void updateCache(String portletId,List<LineStatusMonitorConfig> preferConfig) 
	{
		EhcacheTool.updateObjectFromCache(LINESTATUSMONITOR_CACHENAME, portletId,preferConfig);
	}

	public void removeCacheByKey(String portletid) 
	{
		EhcacheTool.removeCacheByKey(LINESTATUSMONITOR_CACHENAME, portletid);
	}
}
```

完毕
