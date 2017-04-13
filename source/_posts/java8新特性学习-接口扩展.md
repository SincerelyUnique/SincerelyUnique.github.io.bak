---
title: java8新特性学习-接口扩展
date: 2017-04-11 16:34:08
tags: 
categories: Java
---
本文转自：http://www.jb51.net/article/48304.htm
<!--more-->
1. 首先我们编写一个接口:Formula.java
```
public interface Formula {

	double calculate(int a);
	
	//这里jdk7这么写不会报编译错误
	default double sqrt(int a){
		return Math.sqrt(a);
	}
}
```

2. 然后编写一个实现类：FormulaImpl.java
```
public class FormulaImpl implements Formula {

	@Override
	public double calculate(int a) {
		return sqrt(a*100);
	}

	public static void main(String[] args) {
		Formula formula = new Formula() {
		    @Override
		    public double calculate(int a) {
		        return sqrt(a * 100);
		    }
		};
		formula.calculate(100);     // 100.0
		formula.sqrt(16);           // 4.0
		System.out.println(formula.calculate(100));
		System.out.println(formula.sqrt(16));
	}
}
```

3. 注意上面的实现类里的main方法中的调用

4. 运行后jdk7会抛异常
```
Exception in thread "main" java.lang.UnsupportedClassVersionError: com/java/demo/FormulaImpl : Unsupported major.minor version 52.0
	at java.lang.ClassLoader.defineClass1(Native Method)
	at java.lang.ClassLoader.defineClass(ClassLoader.java:800)
	at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:142)
	at java.net.URLClassLoader.defineClass(URLClassLoader.java:449)
	at java.net.URLClassLoader.access$100(URLClassLoader.java:71)
	at java.net.URLClassLoader$1.run(URLClassLoader.java:361)
	at java.net.URLClassLoader$1.run(URLClassLoader.java:355)
	at java.security.AccessController.doPrivileged(Native Method)
	at java.net.URLClassLoader.findClass(URLClassLoader.java:354)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:425)
	at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:308)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:358)
	at sun.launcher.LauncherHelper.checkAndLoadMain(LauncherHelper.java:482)
```

5. 运行后jdk8则正常输出
```
100.0
4.0
```
