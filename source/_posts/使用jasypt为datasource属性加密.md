---
title: 使用jasypt为datasource属性加密
date: 2017-03-10 8:19:15
tags: jasypt
categories: Spring
---
实际应用中，我们不能将密码暴露在外部，为避免不安全隐患，我们使用jasypt对密码进行加密
<!--more-->
1. 首先我们引入maven依赖
```
<dependency>
    <groupId>org.jasypt</groupId>
    <artifactId>jasypt</artifactId>
    <version>1.9.2</version>
</dependency>
```
2. 我们编写一个类先来对我们的密码进行加密，就是转换成密文
```
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.EnvironmentStringPBEConfig;

public class EncryptionTest {
	public static void main(String[] args) {
		// 加密工具
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		// 加密配置
		EnvironmentStringPBEConfig config = new EnvironmentStringPBEConfig();
		config.setAlgorithm("PBEWithMD5AndDES");
		// 自己在用的时候更改此密码
		config.setPassword("apdplat");
		// 应用配置
		encryptor.setConfig(config);
		String plaintext = "root";
		// 加密
		String ciphertext = encryptor.encrypt(plaintext);
		System.out.println(plaintext + " : " + ciphertext);
	}
}
```
```
//输出
root : p+Bny6CtjvZwPgcYgbFpLg== 
```
3. 我们可以反过来检查是否正确，就是解密一下
```
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.EnvironmentStringPBEConfig;

public class EncryptionTest {
	public static void main(String[] args) {
		// 加密工具
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		// 加密配置
		EnvironmentStringPBEConfig config = new EnvironmentStringPBEConfig();
		config.setAlgorithm("PBEWithMD5AndDES");
		// 自己在用的时候更改此密码
		config.setPassword("apdplat");
		// 应用配置
		encryptor.setConfig(config);
		String ciphertext = "p+Bny6CtjvZwPgcYgbFpLg==";
		// 解密
		String plaintext = encryptor.decrypt(ciphertext);
		System.out.println(ciphertext + " : " + plaintext);
	}
}
```
```
//输出
p+Bny6CtjvZwPgcYgbFpLg== : root
```
4. 从上面验证来看，这种方法是可行的，那么我们如何集成到spring中呢？首先需要配置spring配置文件，我们可以这样配置：
```
<bean id="environmentVariablesConfiguration" class="org.jasypt.encryption.pbe.config.EnvironmentStringPBEConfig">  
    <property name="algorithm" value="PBEWithMD5AndDES" />  
    <property name="password" value="apdplat" />  
</bean>

<bean id="configurationEncryptor" class="org.jasypt.encryption.pbe.StandardPBEStringEncryptor">  
    <property name="config" ref="environmentVariablesConfiguration" />  
</bean>

<bean id="propertyConfigurer" class="org.jasypt.spring.properties.EncryptablePropertyPlaceholderConfigurer">  
    <constructor-arg ref="configurationEncryptor" />  
    <property name="systemPropertiesModeName" value="SYSTEM_PROPERTIES_MODE_OVERRIDE" />  
    <property name="ignoreResourceNotFound" value="true" />  
    <property name="locations">  
        <list>  
            <value>WEB-INF/db.properties</value>  
        </list>  
    </property>  
</bean>
```
5. 然后注意在加密属性值前补上前缀和后缀，这样子ENC(密文)，spring会自动识别出带有ENC加密的属性，并为其解密
```
db.username=ENC(p+Bny6CtjvZwPgcYgbFpLg==)  
db.password=ENC(p+Bny6CtjvZwPgcYgbFpLg==) 
```
Appendix：
[http://yangshangchuan.iteye.com/blog/2205240](http://yangshangchuan.iteye.com/blog/2205240)
[http://blog.csdn.net/qq_23476319/article/details/52054762](http://blog.csdn.net/qq_23476319/article/details/52054762)