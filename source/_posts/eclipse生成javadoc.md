---
title: eclipse生成javadoc
date: 2017-04-9 16:34:08
tags: 
categories: Java
---
工作中有时需要为项目生成javadoc，通常我们可以使用eclipse自动生成，也可以使用终端命令javadoc去生成。
<!--more-->
```
package com.test.array;
/**
 * @author Jalen E-mail:1152357479@qq.com
 * @version 创建时间：2017年4月9日 下午2:57:05
 * 类说明：这是一个测试javadoc的类，我们可以通过eclipse自动生成doc文件目录
 * 操作：Project-->Generate Javadoc
 * 或者直接使用命令：javadoc TestJavaDoc.java
 */
public class TestJavaDoc {

	/**定义用户名*/
	private String username;
	
	/**定义密码*/
	private String password;
	
	/**
	 * 这是一个构造器
	 * @param username 这里传入用户名
	 * @param password 这里传入密码
	 * */
	public TestJavaDoc(String username,String password) {
		this.username = username;
		this.password = password;
	}
	
	/**
	 * 验证用户名和密码的正确
	 * @param username 这里传入用户名
	 * @param password 这里传入密码
	 * @return 返回一个boolean值用于判断是否输入正确
	 * */
	public boolean judgeUserInfo(String username,String password){
		if( username=="Jalen" && password=="123456" ){
			//进行其他操作
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 主函数
	 * @param args 这里是默认参数
	 * */
	public static void main(String[] args) {
		TestJavaDoc tjd = new TestJavaDoc("Jalen","password");
		boolean b = tjd.judgeUserInfo("Jalen", "123456");
		System.out.println(b);
	}
}
```