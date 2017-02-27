---
title: java获取spring bean里面的properties文件属性
date: 2017-02-22 14:12:58
tags:
categories: Spring
---
1.spring配置文件添加一个bean：
```
	<bean id="threadPropertyConfigurer"

		class="com.sanmina.mes.dashboard.server.util.ThreadPropertyConfigurer">

		<property name="ignoreUnresolvablePlaceholders" value="true"/>

   		<property name="ignoreResourceNotFound" value="true"/>

		<property name="locations">

			<list>

				<value>WEB-INF/thread.properties</value>

			</list>

		</property>

	</bean>
```
<!--more-->
2.bean类：
ThreadPropertyConfigurer.java
```
package com.sanmina.mes.dashboard.server.util;



import java.io.File;

import java.util.Calendar;

import java.util.HashMap;

import java.util.Map;

import java.util.Map.Entry;

import java.util.Properties;



import org.springframework.beans.BeansException;

import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;

import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

import org.springframework.util.PropertyPlaceholderHelper;



import com.sanmina.mes.dashboard.server.servlet.ServerApplicationContext;



/**

 * instruction: Use For Setting Preference Configuration Cache Refresh Time

 */

public class ThreadPropertyConfigurer extends PropertyPlaceholderConfigurer

{	

	private static Map<String,String> properties = new HashMap<String,String>(); 



	public static long lastModifyTime = setLastModifyTime() ;

	public static long currentTime = System.currentTimeMillis() ;



	public static long setLastModifyTime() {

		File file = new File("/home/jalenchu/jalen_chu/Tools/server/eclipse/workspace/mes-dashboard-server/dashboardServerWeb/src/main/webapp/WEB-INF/thread.properties");

		Calendar calendar = Calendar.getInstance();   

		long time = file.lastModified();   

		calendar.setTimeInMillis(time);   

		lastModifyTime = calendar.getTimeInMillis();

		return calendar.getTimeInMillis();

	}



	protected void processProperties(ConfigurableListableBeanFactory beanFactoryToProcess,Properties props) throws BeansException 

	{ 

		System.out.println("beanFactoryToProcess:"+beanFactoryToProcess);

		System.out.println("props:"+props);

		PropertyPlaceholderHelper helper = new PropertyPlaceholderHelper(DEFAULT_PLACEHOLDER_PREFIX, DEFAULT_PLACEHOLDER_SUFFIX, DEFAULT_VALUE_SEPARATOR, false);  

        for(Entry<Object,Object> entry:props.entrySet()){  

            String stringKey = String.valueOf(entry.getKey());  

            String stringValue = String.valueOf(entry.getValue());  

            stringValue = helper.replacePlaceholders(stringValue, props);  

            properties.put(stringKey, stringValue);  

        }  

        super.processProperties(beanFactoryToProcess, props); 

    } 

      

    public static Map<String, String> getProperties() 

    { 

        return properties;  

    } 

      

    public String getProperty(String key)

    { 

        return properties.get(key);  

    } 

}
```

3.调用方法：
```
	private static int getThreadRefreshTime() 

	{

		int refreshTime = 5;

		try {

			ThreadPropertyConfigurer threadProperties = new ThreadPropertyConfigurer();

			String refreshTimeStr = threadProperties.getProperty("threadRefreshTime");

			refreshTime = Integer.parseInt(refreshTimeStr);

		} catch (Exception e) {

			e.printStackTrace();

		}

		return refreshTime;

	}

	

	public static final int REFREASH_MINUTES = getThreadRefreshTime();
```

4.附录：
thread.properties
```
threadRefreshTime=1234

```
