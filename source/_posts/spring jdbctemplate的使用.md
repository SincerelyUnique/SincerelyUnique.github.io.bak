---
title: spring jdbctemplate的使用
date: 2017-03-1 13:19:15
tags: jdbctemplate
categories: Spring
---
1. 项目中连接数据库一般会使用spring自带的jdbc模板，这个jdbc访问的流程一般是从DAO开始，通过配置xml中的bean引用，指向jdbctemplate，注意maven项目引入spring-jdbc依赖<!--more-->
首先配置xml文件，service->dao->jdbctemplate->datasource,这里的dataSource使用了el表达式，引入的db.properties里的属性配置
```
<bean id="lineStatusMonitorService" class="com.sanmina.mes.dashboard.server.service.impl.LineStatusMonitorServiceImpl">
	<property name="lineStatusMonitorDao" ref="lineStatusMonitorDao"></property>
</bean>

<bean id="lineStatusMonitorDao" class="com.sanmina.mes.dashboard.server.dao.impl.LineStatusMonitorDaoImpl">
	<property name="jdbcTemplate" ref="lineStatusMonitorJdbcTemplate"></property>
</bean>

<bean id="lineStatusMonitorJdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
	<property name="dataSource">
		<ref bean="lineStatusMonitorDataSource" />
	</property>
</bean>

<bean id="lineStatusMonitorDataSource" class="org.apache.commons.dbcp.BasicDataSource">
	<property name="driverClassName" value="${vision.mes.jdbc.driverClassName}"></property>
	<property name="url" value="${vision.mes.jdbc.url}"></property>
	<property name="username" value="${vision.mes.jdbc.username}"></property>
	<property name="password" value="${vision.mes.jdbc.password}"></property> 
	<property name="maxActive" value="${vision.mes.jdbc.maxActive}"></property>
	<property name="maxIdle" value="${vision.mes.jdbc.maxIdle}"></property>
	<property name="minIdle" value="${vision.mes.jdbc.minIdle}"></property>
	<property name="initialSize" value="${vision.mes.jdbc.initialSize}"></property>
	<property name="minEvictableIdleTimeMillis" value="${vision.mes.jdbc.minEvictableIdleTimeMillis}"></property>
	<property name="maxWait" value="${vision.mes.jdbc.maxWait}"></property>
	<property name="defaultAutoCommit" value="${vision.mes.jdbc.defaultAutoCommit}"></property>
	<property name="logAbandoned" value="${vision.mes.jdbc.logAbandoned}"></property>
	<property name="removeAbandoned" value="${vision.mes.jdbc.removeAbandoned}"></property>
	<property name="removeAbandonedTimeout" value="${vision.mes.jdbc.removeAbandonedTimeout}"></property>
	<property name="timeBetweenEvictionRunsMillis" value="${vision.mes.jdbc.timeBetweenEvictionRunsMillis}"></property>
	<property name="testWhileIdle" value="${vision.mes.jdbc.testWhileIdle}"></property>
	<property name="numTestsPerEvictionRun" value="${vision.mes.jdbc.numTestsPerEvictionRun}"></property>
	<property name="testOnBorrow" value="${vision.mes.jdbc.testOnBorrow}"></property>
	<property name="validationQuery" value="${vision.mes.jdbc.validationQuery}"></property>
</bean>

<bean id="propertyConfigurer" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
	<property name="locations">
		<list>
			<value>WEB-INF/db.properties</value>
		</list>
	</property>
</bean>
```
2. db.properties配置
```
vision.mes.jdbc.driverClassName=org.postgresql.Driver
vision.mes.jdbc.username=XXX
vision.mes.jdbc.password=XXX

vision.mes.jdbc.maxActive=2
vision.mes.jdbc.maxIdle=2
vision.mes.jdbc.minIdle=1
vision.mes.jdbc.initialSize=2

vision.mes.jdbc.minEvictableIdleTimeMillis=1800000
vision.mes.jdbc.maxWait=4000

vision.mes.jdbc.defaultAutoCommit=true
vision.mes.jdbc.logAbandoned=true
vision.mes.jdbc.removeAbandoned=true

vision.mes.jdbc.removeAbandonedTimeout=60
vision.mes.jdbc.timeBetweenEvictionRunsMillis=60000
vision.mes.jdbc.testWhileIdle=false
vision.mes.jdbc.numTestsPerEvictionRun=3
vision.mes.jdbc.testOnBorrow=false
vision.mes.jdbc.validationQuery= SELECT 1 
```
3. 在DAO中注入jdbctemplate
```
private JdbcTemplate jdbcTemplate;

public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
	this.jdbcTemplate = jdbcTemplate;
}

public List<Workstation> getMfgLine( String schema, int mfgLineKey, String process ){
	final List<Workstation> workstationList = new ArrayList<Workstation>();
	String sql = "SELECT  * FROM " + schema + ".getworkstation_with_process(" + mfgLineKey + ",'" + process + "')";

	try {
		jdbcTemplate.query(sql, new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				Workstation workstation = new Workstation();
				workstation.setLocationKey(rs.getInt("location_key"));
				workstation.setWorkstation(rs.getString("workstation"));
				workstationList.add(workstation);
			}
		});
	} catch (Exception e) {
		logger.error(e);
	}

	return workstationList;
}
```
4. 如果Dao比较多，可以将jdbctemplate抽取出来称为一个抽象类，在DAO实现类中继承他就可以了
```
public abstract class  AbstractDao{
	protected JdbcTemplate jdbcTemplate;

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
}
```
```
public class HoldDaoImpl extends AbstractDao implements HoldDao{
	//这里直接使用
}
```