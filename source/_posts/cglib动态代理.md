---
title: cglib动态代理
date: 2017-03-9 13:19:15
tags: cglib
categories: Java
---
1. 我们知道，使用jdk创建的动态代理，其目标对象需要实现一个接口，当目标对象，即需要进行动态代理的对象没有实现接口时，便无法使用jdk的动态代理，此时我们可以考虑使用cglib动态代理来组织我们的业务逻辑织入，使用cglib动态代理类似于jdk动态代理，不过jdk是实现InvocationHandler，而cglib是实现MethodInterceptor，底层都是对于字节码的处理。（使用cglib动态代理需要导入cglib.jar和asm.jar）
<!--more-->
2. 简单实现，[http://blog.csdn.net/yakoo5/article/details/9099133/](http://blog.csdn.net/yakoo5/article/details/9099133/)
① 创建一个需要被代理的目标对象，通过字节码技术创建这个类的子类
```
package demo4.cglib;

public class SayHello {

	public void say() {
		System.out.println("hello everyone");
	}
}
```
② 创建动态代理的工具类
```
package demo4.cglib;

import java.lang.reflect.Method;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

public class CglibProxy implements MethodInterceptor
{
	private Enhancer enhancer = new Enhancer();
	
	public Object getProxy(Class clazz){
		 //设置需要创建子类的类  
		 enhancer.setSuperclass(clazz);  
		 enhancer.setCallback(this);  
		 //通过字节码技术动态创建子类实例  
		 return enhancer.create();
	}
	
	@Override
	public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
		// TODO Auto-generated method stub
		System.out.println("前置代理");  
		//通过代理类调用父类中的方法  
		Object result = proxy.invokeSuper(obj, args);  
		System.out.println("后置代理");  
		return result;
	}	
}

```
③ 验证cglib是否织入成功
```
package demo4.cglib;

public class DoCGLib {

	public static void main(String[] args) {
		CglibProxy proxy = new CglibProxy();
		//通过生成子类的方式创建代理类
		SayHello proxyImp = (SayHello)proxy.getProxy(SayHello.class);
		proxyImp.say();  
	}
}
```
④ 控制台输出
```
前置代理
hello everyone
后置代理
```