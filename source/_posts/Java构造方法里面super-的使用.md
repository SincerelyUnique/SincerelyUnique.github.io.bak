---
title: Java构造方法里面super()的使用
date: 2017-02-20 15:52:02
tags: java
categories: Java
---
决定调用父类的哪一个构造方法
<!--more-->
1.Father.java
```
public class Father 
{
	Father()
	{
		System.out.println("Father");
	}
	
	Father(int age)
	{
		System.out.println("Father is "+age);
	}
}
```

2.Son.java
```
public class Son extends Father
{
	Son()
	{
		super(20);  //不写默认调用父类无参数构造方法
		System.out.println("son");
	}
	
	public static void main(String[] args) 
	{
		Son son = new Son();
	}
}
```
