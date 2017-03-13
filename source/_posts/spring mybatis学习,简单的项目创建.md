---
title: spring mybatis学习,简单的项目创建
date: 2017-03-10 15:19:15
tags:
categories: Mybatis
---
这是一个spring集成mybatis的小项目实践，通过spring的bean管理，配置mybatis的mapper，同时使用阿里巴巴连接池druid，连接到postgresql数据库，实现insert插入操作
<!--more-->
1. 首先使用eclipse创建一个maven项目（single maven project），编辑pom
```
  <build>
    <finalName>test</finalName>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
    </plugins>
  </build>
  
  <dependencies>
  	<dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>4.3.3.RELEASE</version>
    </dependency>
    
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-orm</artifactId>
      <version>4.3.3.RELEASE</version>
    </dependency>
    
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>4.0.0-b01</version>
    </dependency>
    
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-core</artifactId>
      <version>5.1.2.Final</version>
    </dependency>
    
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.0.26</version>
    </dependency>
    
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <version>9.3-1104-jdbc41</version>
    </dependency>
    
    <dependency>
	    <groupId>org.mybatis</groupId>
	    <artifactId>mybatis</artifactId>
	    <version>3.4.1</version>
	</dependency>
	
	<dependency>
	    <groupId>org.mybatis</groupId>
	    <artifactId>mybatis-spring</artifactId>
	    <version>1.3.0</version>
	</dependency>
	
	<dependency>  
	    <groupId>com.alibaba</groupId>  
	    <artifactId>druid</artifactId>  
	    <version>1.0.20</version>  
	</dependency> 
  </dependencies>
```
2. 服务器启动首先加载web.xml配置文件，在这里我们设置一个welcome file，指向index.jsp，index.jsp里面其实只是一个form表单，表单提交是有一个servlet控制，后台servlet使用dopost方法获取前台表单填充参数，并存储到数据库，下面是web配置文件。
```
	<!-- 使用contextConfigLocation获取并初始化spring配置文件 -->
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>/WEB-INF/applicationContext.xml</param-value>
	</context-param>

	<listener>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>

	<!-- 服务器启动，初始化servlet，可以通过他获取spring上下文的bean，里面有个init()方法 -->
	<servlet>
		<servlet-name>ServerApplicationContext</servlet-name>
		<servlet-class>com.spring.mybatis.servlet.ServerApplicationContext</servlet-class>
		<load-on-startup>1</load-on-startup>
	</servlet>

	<!-- 这个是获取页面输入数据的servlet，并调用service层接口存储数据 -->
	<servlet>
		<servlet-name>ServletLogin</servlet-name>
		<servlet-class>com.spring.mybatis.servlet.LoginServlet</servlet-class>
		<load-on-startup>2</load-on-startup>
	</servlet>

	<!-- 这里是阿里连接池druid的监控配置 -->
	<filter>
		<filter-name>DruidWebStatFilter</filter-name>
		<filter-class>com.alibaba.druid.support.http.WebStatFilter</filter-class>
		<init-param>
			<param-name>exclusions</param-name>
			<param-value>*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*,/rs/*</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>DruidWebStatFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
	
	<servlet>
        	<servlet-name>DruidStatView</servlet-name>
        	<servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
    	</servlet>

    	<servlet-mapping>
        	<servlet-name>DruidStatView</servlet-name>
        	<url-pattern>/druid/*</url-pattern>
    	</servlet-mapping>

	<!-- web初始化默认加载的页面 -->
	<welcome-file-list>
		<welcome-file>index.jsp</welcome-file>
	</welcome-file-list>
```
3. 我们下面来看一下spring配置文件里面bean的配置，当我们配置bean的时候，应该注意他们的业务范围，以及应该怎样注入，这里使用的setter注入方式，从web.xml中可以看出spring配置文件是在WEB-INF下面的applicationContext.xml，文件内容是：
```
<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop" xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns="http://www.springframework.org/schema/beans"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/aop 
    http://www.springframework.org/schema/aop/spring-aop.xsd
    http://www.springframework.org/schema/tx 
    http://www.springframework.org/schema/tx/spring-tx.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">
    
    <bean id="loginService" class="com.spring.mybatis.service.impl.LoginServiceImpl">
        <property name="loginDao" ref="loginDao"></property>
    </bean>
    
    <bean id="loginDao" class="org.mybatis.spring.mapper.MapperFactoryBean">
        <property name="mapperInterface" value="com.spring.mybatis.dao.LoginDao"></property>
        <property name="sqlSessionFactory" ref="sqlSessionFactory"></property>
    </bean>
    
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource" />
        <property name="mapperLocations" value="classpath*:com/spring/mybatis/mapper/*Mapper.xml"></property>
    </bean>

    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" destroy-method = "close">
        <property name="driverClassName" value="org.postgresql.Driver"></property>
        <property name="url" value="jdbc:postgresql://localhost:5432/test_mybatis_db"></property>
        <property name="username" value="postgres"></property>
        <property name="password" value="dbms4Fna"></property>
        <property name="maxActive" value="20"></property>
        <property name="maxIdle" value="20"></property>
        <property name="maxWait" value="6000"></property>
        <property name="defaultAutoCommit" value="true"></property>
    </bean>
    
</beans>
```
注入顺序大概是：
dataSource --->sqlSessionFactory --->loginDao --->loginService

4. 我们的页面代码很简单，一个form表单
```
<form action="LoginServlet" method="post">
 用户名:<br>
<input type="text" name="username"><br>
 密  码:<br>
<input type="text" name="password"><br>
<input type="submit" value="提交">
</form> 
```
5. 下面是我们配置的一个servlet类，其中一个是为了在初始化时获得ApplicationContext，即ServerApplicationContext.java
```
package com.spring.mybatis.servlet;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class ServerApplicationContext extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static ApplicationContext serverContext = null;

	@Override
	public void init() throws ServletException {
		super.init();
		javax.servlet.ServletContext servletContext = getServletContext();
		serverContext = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
		System.out.println("================");
		System.out.println("==serverContext begin==");
		System.out.println("================");
	}

	public static ApplicationContext getApplicationContext() {
		return serverContext;
	}
	
}
```
6. 这也是一个servlet类，类似于处理与前段页面交互的Struts2的Action类
```
package com.spring.mybatis.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.spring.mybatis.domain.UserInfo;
import com.spring.mybatis.service.LoginService;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public LoginServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response); 
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=gb2312");  
        request.setCharacterEncoding("gb2312");
        
        String username = request.getParameter("username");  
        String password = request.getParameter("password"); 
        
        LoginService loginService = (LoginService) ServerApplicationContext.getApplicationContext().getBean("loginService");
        int age = 14;
        char sex = '男';
        int weight = 42;
        UserInfo ui = new UserInfo();
        ui.setUsername(username);
        ui.setPassword(password);
        ui.setAge(age);
        ui.setSex(sex);
        ui.setWeight(weight);
        loginService.insertUserInfo(ui);
        /*try {
            Class.forName("org.postgresql.Driver");  
        } catch (Exception e) {  
            System.out.print("Class Not Found Exception");  
        }  
          
        String url = "jdbc:postgresql://localhost:5432/test_mybatis_db";  
        Connection conn = null;  
        Statement stmt = null;  
        ResultSet rs = null;  
          
        try {  
            conn = (Connection) DriverManager.getConnection(url,"postgres","dbms4Fna");  
            stmt = (Statement) conn.createStatement();  
              
            String sql = "insert into userinfo (username,userpsw,age,sex,weight) values ('"+username+"','"+psw+"',25,'男',52)";
            PreparedStatement ps = conn.prepareStatement(sql);
            int result=ps.executeUpdate();
            if( result>0 ){
            	System.out.println("Insert OK");
            }
        } catch (Exception e) {  
            e.printStackTrace();  
        }*/
	}

}
```
7. 上面的LoginServlet里调用了service层接口
```
package com.spring.mybatis.service;

import com.spring.mybatis.domain.UserInfo;

public interface LoginService {

	public void insertUserInfo(UserInfo userInfo);
}
```
8. 接下来是service层接口的实现类，调用dao
```
package com.spring.mybatis.service.impl;

import com.spring.mybatis.dao.LoginDao;
import com.spring.mybatis.domain.UserInfo;
import com.spring.mybatis.service.LoginService;

public class LoginServiceImpl implements LoginService {

	private LoginDao loginDao ;
	
	public void setLoginDao(LoginDao loginDao) {
		this.loginDao = loginDao;
	}

	@Override
	public void insertUserInfo(UserInfo userInfo) {
		loginDao.insertUserInfo(userInfo);
	}
	
}
```
9. 在我们的dao层只需要定义一个接口即可
```
package com.spring.mybatis.dao;

import com.spring.mybatis.domain.UserInfo;

public interface LoginDao {

	public void insertUserInfo(UserInfo userInfo);
}
```
10. 下面是mybatis重要的类，首先我们定义pojo（domain），可以根据此pojo自动生成sql代码，连接并操作数据库
```
package com.spring.mybatis.domain;

public class UserInfo {

	private String username;
	private String password;
	private int age;
	private char sex;
	private int weight;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public char getSex() {
		return sex;
	}

	public void setSex(char sex) {
		this.sex = sex;
	}

	@Override
	public String toString() {
		return "UserInfo [username=" + username + ", password=" + password + ", age=" + age + ", sex=" + sex
				+ ", weight=" + weight + "]";
	}

}
```
11. 创建mapper包，存放mapper.xml文件
```
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<!-- 注意这里的命名空间要指向dao，类型指向domain对应实体类 -->
<mapper namespace="com.spring.mybatis.dao.LoginDao" >
  <resultMap id="BaseResultMap" type="com.spring.mybatis.domain.UserInfo" >
    <id column="username" property="username" jdbcType="VARCHAR" />
    <result column="userpsw" property="password" jdbcType="VARCHAR" />
    <result column="age" property="age" jdbcType="INTEGER" />
    <result column="sex" property="sex" jdbcType="CHAR" />
    <result column="weight" property="weight" jdbcType="INTEGER" />
  </resultMap>
  
  <!-- 这里的id要和dao接口的方法名对应 -->
  <insert id="insertUserInfo" parameterType="com.spring.mybatis.domain.UserInfo" >
    insert into public.userinfo (username, userpsw, age, 
      sex, weight)
    values (#{username,jdbcType=VARCHAR}, #{password,jdbcType=VARCHAR}, #{age,jdbcType=INTEGER}, 
      #{sex,jdbcType=CHAR}, #{weight,jdbcType=INTEGER})
  </insert>
</mapper>
```
Appendix：
附上两个mybatis自动生成的类文件（没有用到）
```
package com.spring.mybatis.mapper;

import com.spring.mybatis.domain.UserInfo;
import com.spring.mybatis.entity.UserInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface UserInfoMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    int countByExample(UserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    int deleteByExample(UserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    int deleteByPrimaryKey(String username);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    int insert(UserInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    int insertSelective(UserInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    List<UserInfo> selectByExample(UserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    UserInfo selectByPrimaryKey(String username);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    int updateByExampleSelective(@Param("record") UserInfo record, @Param("example") UserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    int updateByExample(@Param("record") UserInfo record, @Param("example") UserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    int updateByPrimaryKeySelective(UserInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    int updateByPrimaryKey(UserInfo record);
}






package com.spring.mybatis.entity;

import java.util.ArrayList;
import java.util.List;

public class UserInfoExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public UserInfoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andUsernameIsNull() {
            addCriterion("username is null");
            return (Criteria) this;
        }

        public Criteria andUsernameIsNotNull() {
            addCriterion("username is not null");
            return (Criteria) this;
        }

        public Criteria andUsernameEqualTo(String value) {
            addCriterion("username =", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotEqualTo(String value) {
            addCriterion("username <>", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameGreaterThan(String value) {
            addCriterion("username >", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameGreaterThanOrEqualTo(String value) {
            addCriterion("username >=", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameLessThan(String value) {
            addCriterion("username <", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameLessThanOrEqualTo(String value) {
            addCriterion("username <=", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameLike(String value) {
            addCriterion("username like", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotLike(String value) {
            addCriterion("username not like", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameIn(List<String> values) {
            addCriterion("username in", values, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotIn(List<String> values) {
            addCriterion("username not in", values, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameBetween(String value1, String value2) {
            addCriterion("username between", value1, value2, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotBetween(String value1, String value2) {
            addCriterion("username not between", value1, value2, "username");
            return (Criteria) this;
        }

        public Criteria andUserpswIsNull() {
            addCriterion("userpsw is null");
            return (Criteria) this;
        }

        public Criteria andUserpswIsNotNull() {
            addCriterion("userpsw is not null");
            return (Criteria) this;
        }

        public Criteria andUserpswEqualTo(String value) {
            addCriterion("userpsw =", value, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswNotEqualTo(String value) {
            addCriterion("userpsw <>", value, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswGreaterThan(String value) {
            addCriterion("userpsw >", value, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswGreaterThanOrEqualTo(String value) {
            addCriterion("userpsw >=", value, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswLessThan(String value) {
            addCriterion("userpsw <", value, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswLessThanOrEqualTo(String value) {
            addCriterion("userpsw <=", value, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswLike(String value) {
            addCriterion("userpsw like", value, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswNotLike(String value) {
            addCriterion("userpsw not like", value, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswIn(List<String> values) {
            addCriterion("userpsw in", values, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswNotIn(List<String> values) {
            addCriterion("userpsw not in", values, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswBetween(String value1, String value2) {
            addCriterion("userpsw between", value1, value2, "userpsw");
            return (Criteria) this;
        }

        public Criteria andUserpswNotBetween(String value1, String value2) {
            addCriterion("userpsw not between", value1, value2, "userpsw");
            return (Criteria) this;
        }

        public Criteria andAgeIsNull() {
            addCriterion("age is null");
            return (Criteria) this;
        }

        public Criteria andAgeIsNotNull() {
            addCriterion("age is not null");
            return (Criteria) this;
        }

        public Criteria andAgeEqualTo(Integer value) {
            addCriterion("age =", value, "age");
            return (Criteria) this;
        }

        public Criteria andAgeNotEqualTo(Integer value) {
            addCriterion("age <>", value, "age");
            return (Criteria) this;
        }

        public Criteria andAgeGreaterThan(Integer value) {
            addCriterion("age >", value, "age");
            return (Criteria) this;
        }

        public Criteria andAgeGreaterThanOrEqualTo(Integer value) {
            addCriterion("age >=", value, "age");
            return (Criteria) this;
        }

        public Criteria andAgeLessThan(Integer value) {
            addCriterion("age <", value, "age");
            return (Criteria) this;
        }

        public Criteria andAgeLessThanOrEqualTo(Integer value) {
            addCriterion("age <=", value, "age");
            return (Criteria) this;
        }

        public Criteria andAgeIn(List<Integer> values) {
            addCriterion("age in", values, "age");
            return (Criteria) this;
        }

        public Criteria andAgeNotIn(List<Integer> values) {
            addCriterion("age not in", values, "age");
            return (Criteria) this;
        }

        public Criteria andAgeBetween(Integer value1, Integer value2) {
            addCriterion("age between", value1, value2, "age");
            return (Criteria) this;
        }

        public Criteria andAgeNotBetween(Integer value1, Integer value2) {
            addCriterion("age not between", value1, value2, "age");
            return (Criteria) this;
        }

        public Criteria andSexIsNull() {
            addCriterion("sex is null");
            return (Criteria) this;
        }

        public Criteria andSexIsNotNull() {
            addCriterion("sex is not null");
            return (Criteria) this;
        }

        public Criteria andSexEqualTo(String value) {
            addCriterion("sex =", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotEqualTo(String value) {
            addCriterion("sex <>", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexGreaterThan(String value) {
            addCriterion("sex >", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexGreaterThanOrEqualTo(String value) {
            addCriterion("sex >=", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexLessThan(String value) {
            addCriterion("sex <", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexLessThanOrEqualTo(String value) {
            addCriterion("sex <=", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexLike(String value) {
            addCriterion("sex like", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotLike(String value) {
            addCriterion("sex not like", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexIn(List<String> values) {
            addCriterion("sex in", values, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotIn(List<String> values) {
            addCriterion("sex not in", values, "sex");
            return (Criteria) this;
        }

        public Criteria andSexBetween(String value1, String value2) {
            addCriterion("sex between", value1, value2, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotBetween(String value1, String value2) {
            addCriterion("sex not between", value1, value2, "sex");
            return (Criteria) this;
        }

        public Criteria andWeightIsNull() {
            addCriterion("weight is null");
            return (Criteria) this;
        }

        public Criteria andWeightIsNotNull() {
            addCriterion("weight is not null");
            return (Criteria) this;
        }

        public Criteria andWeightEqualTo(Integer value) {
            addCriterion("weight =", value, "weight");
            return (Criteria) this;
        }

        public Criteria andWeightNotEqualTo(Integer value) {
            addCriterion("weight <>", value, "weight");
            return (Criteria) this;
        }

        public Criteria andWeightGreaterThan(Integer value) {
            addCriterion("weight >", value, "weight");
            return (Criteria) this;
        }

        public Criteria andWeightGreaterThanOrEqualTo(Integer value) {
            addCriterion("weight >=", value, "weight");
            return (Criteria) this;
        }

        public Criteria andWeightLessThan(Integer value) {
            addCriterion("weight <", value, "weight");
            return (Criteria) this;
        }

        public Criteria andWeightLessThanOrEqualTo(Integer value) {
            addCriterion("weight <=", value, "weight");
            return (Criteria) this;
        }

        public Criteria andWeightIn(List<Integer> values) {
            addCriterion("weight in", values, "weight");
            return (Criteria) this;
        }

        public Criteria andWeightNotIn(List<Integer> values) {
            addCriterion("weight not in", values, "weight");
            return (Criteria) this;
        }

        public Criteria andWeightBetween(Integer value1, Integer value2) {
            addCriterion("weight between", value1, value2, "weight");
            return (Criteria) this;
        }

        public Criteria andWeightNotBetween(Integer value1, Integer value2) {
            addCriterion("weight not between", value1, value2, "weight");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table public.userinfo
     *
     * @mbggenerated do_not_delete_during_merge Fri Mar 10 15:01:14 CST 2017
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table public.userinfo
     *
     * @mbggenerated Fri Mar 10 15:01:14 CST 2017
     */
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}
```
