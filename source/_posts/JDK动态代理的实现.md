---
title: jdk动态代理
date: 2017-03-9 12:19:15
tags: 
categories: Java
---

一. 动态代理的基本实现
1. 首先创建一个类，觉得可以叫工具类，让它实现InvocationHandler接口，这个接口呢会自动实现一个方法，就是invoke()方法，注意，这个invoke方法的参数含有一个动态代理对象，一个反射的方法名，还有一组对象数组，<!--more-->OK，然后写一个方法获取你设置的目标对象的代理对象，代码如下：
```
package demo4.dynamicproxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class MyInvocationHandler implements InvocationHandler
{ 
    private Object target;
      
    public MyInvocationHandler(Object target) 
    {
        super();
        this.target = target;
    }
	
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable 
	{
		// 在目标对象的方法执行之前简单的打印一下  
        	System.out.println("------------------before------------------");
        
        	// 执行目标对象的方法
        	Object result = method.invoke(target, args); 
        
        	// 在目标对象的方法执行之后简单的打印一下  
        	System.out.println("-------------------after------------------");  
        
		return result;
	}
	
	/** 
         * 获取目标对象的代理对象 
         * @return 代理对象 
         */
	public Object getProxy(){
		return Proxy.newProxyInstance(Thread.currentThread().getContextClassLoader(), target.getClass().getInterfaces(), this);
	}
}
```
2. 创建你的代理对象，我们这里创建的是一个接口（在我们的业务逻辑中会有好多接口和实现类），以此作为目标对象接口，其实就是它的实现类作为目标对象啦，记住，jdk生成代理对象一定要实现一个接口，因为这个接口在上面代码的getProxy方法里要用到啊，好了，接口如下：
```
package demo4.dynamicproxy;

public interface UserService {
	public abstract void add(); 
}
```
3. 接口实现类，超简单
```
package demo4.dynamicproxy;

public class UserServiceImpl implements UserService {
	@Override
	public void add() {
		System.out.println("--------------------add---------------"); 
	}
}
```
4. 下面我们用junit来做个测试
```
package demo4.dynamicproxy;

import org.junit.Test;

public class ProxyTest 
{
	@Test
	public void testProxy() throws Throwable 
	{
		// 实例化目标对象  
        UserService userService = new UserServiceImpl();  
        
        // 实例化InvocationHandler  
        MyInvocationHandler invocationHandler = new MyInvocationHandler(userService);
        
        // 根据目标对象生成代理对象  
        UserService userServiceProxy = (UserService) invocationHandler.getProxy();
        
        // 调用代理对象的方法  
        userServiceProxy.add();
	}
}
```
5. 瞧一瞧输出了什么，这不就是spring的aop嘛，通过动态代理的方式，切入到我们的业务逻辑中，其实spring AOP的实现也是使用了Proxy和InvocationHandler这俩东西
```
------------------before------------------
--------------------add---------------
-------------------after------------------
```


二. 看一下jdk怎么生成代理对象的，就是怎么根据目标对象生成代理对象的，这就要进去看看源码了
1. 上面主要用到了一个Proxy的newProxyInstance方法创建的，所以我们进去看它，里面有3个参数，就是这样
```
/** 
 * loader:类加载器 
 * interfaces:目标对象实现的接口 
 * h:InvocationHandler的实现类 
 */ 
public static Object newProxyInstance(ClassLoader loader,  Class<?>[] interfaces,  InvocationHandler h)  throws IllegalArgumentException {
	if (h == null) {  
        	throw new NullPointerException();
	}

	Class cl = getProxyClass(loader, interfaces);

	try {  
            	// 调用代理对象的构造方法（也就是$Proxy0(InvocationHandler h)）  
        	Constructor cons = cl.getConstructor(constructorParams);  
            	// 生成代理类的实例并把MyInvocationHandler的实例传给它的构造方法  
        	return (Object) cons.newInstance(new Object[] { h });  
    	} catch (NoSuchMethodException e) {  
        	throw new InternalError(e.toString());  
    	} catch (IllegalAccessException e) {  
        throw new InternalError(e.toString());  
    	} catch (InstantiationException e) {  
        	throw new InternalError(e.toString());  
    	} catch (InvocationTargetException e) {  
        	throw new InternalError(e.toString());  
    	} 
}
```
这里面调用了getProxyClass()方法，我们进去看看
```
public static Class<?> getProxyClass(ClassLoader loader,  Class<?>... interfaces)  throws IllegalArgumentException{
	// 如果目标类实现的接口数大于65535个则抛出异常（我XX，谁会写这么NB的代码啊？）  
    	if (interfaces.length > 65535) {  
        	throw new IllegalArgumentException("interface limit exceeded");  
    	}

	// 声明代理对象所代表的Class对象（有点拗口）  
    	Class proxyClass = null;  
  
    	String[] interfaceNames = new String[interfaces.length];  
  
    	Set interfaceSet = new HashSet();   // for detecting duplicates  
  
    	// 遍历目标类所实现的接口  
    	for (int i = 0; i < interfaces.length; i++) {  
          
        	// 拿到目标类实现的接口的名称  
        	String interfaceName = interfaces[i].getName();  
        	Class interfaceClass = null;  
		try {  
			// 加载目标类实现的接口到内存中  
			interfaceClass = Class.forName(interfaceName, false, loader);  
		} catch (ClassNotFoundException e) {  
		
		}  
		if (interfaceClass != interfaces[i]) {  
			throw new IllegalArgumentException( interfaces[i] + " is not visible from class loader");  
		}  
	  
		// 中间省略了一些无关紧要的代码 .......  
		  
		// 把目标类实现的接口代表的Class对象放到Set中  
		interfaceSet.add(interfaceClass);  
	  
		interfaceNames[i] = interfaceName;  
    	}

    	// 把目标类实现的接口名称作为缓存（Map）中的key  
    	Object key = Arrays.asList(interfaceNames);  
  
    	Map cache;  
      
    	synchronized (loaderToCache) {  
        	// 从缓存中获取cache  
        	cache = (Map) loaderToCache.get(loader);  
        	if (cache == null) {  
        	// 如果获取不到，则新建地个HashMap实例  
        	cache = new HashMap();  
        	// 把HashMap实例和当前加载器放到缓存中  
        	loaderToCache.put(loader, cache);  
        	}  
  
    	}

    	synchronized (cache) {  
  
        	do {  
        		// 根据接口的名称从缓存中获取对象  
        		Object value = cache.get(key);  
        	if (value instanceof Reference) {  
            		proxyClass = (Class) ((Reference) value).get();  
        	}  
        	if (proxyClass != null) {  
            		// 如果代理对象的Class实例已经存在，则直接返回  
            		return proxyClass;  
        	} else if (value == pendingGenerationMarker) {  
            		try {  
            			cache.wait();  
            		} catch (InterruptedException e) {  

            		}  
            		continue;  
        	} else {  
            		cache.put(key, pendingGenerationMarker);  
            		break;  
        	}  
        	} while (true);  
    	}

	try {  
        	// 中间省略了一些代码 .......  
          
        	// 这里就是动态生成代理对象的最关键的地方  
        	byte[] proxyClassFile = ProxyGenerator.generateProxyClass(  proxyName, interfaces);  
        	try {  
            		// 根据代理类的字节码生成代理类的实例  
            		proxyClass = defineClass0(loader, proxyName,  proxyClassFile, 0, proxyClassFile.length);  
        	} catch (ClassFormatError e) {  
            		throw new IllegalArgumentException(e.toString());  
        	}  
        	}  
        	// add to set of all generated proxy classes, for isProxyClass  
        	proxyClasses.put(proxyClass, null);  
  
    		}   
    		// 中间省略了一些代码 .......  
      
    		return proxyClass;  
    	}
}
```
注意结尾ProxyGenerator的generateProxyClass()方法，这里面才是真正生成proxy字节码的地方
```
public static byte[] generateProxyClass(final String name,  Class[] interfaces)  
{  
       ProxyGenerator gen = new ProxyGenerator(name, interfaces);  
    	// 这里动态生成代理类的字节码，由于比较复杂就不进去看了
       final byte[] classFile = gen.generateClassFile();  
  
    	// 如果saveGeneratedFiles的值为true，则会把所生成的代理类的字节码保存到硬盘上  
       if (saveGeneratedFiles) {  
           java.security.AccessController.doPrivileged(
           new java.security.PrivilegedAction<Void>() {  
               public Void run() {  
                   try {  
                       FileOutputStream file =  
                           new FileOutputStream(dotToSlash(name) + ".class");  
                       file.write(classFile);  
                       file.close();  
                       return null;  
                   } catch (IOException e) {  
                       throw new InternalError(  
                           "I/O exception saving generated file: " + e);  
                   }  
               }  
           });  
       }  
  
    	// 返回代理类的字节码  
       return classFile;  
}
```
三. 是谁调用了InvocationHandler的invoke方法呢？
```
package demo4.dynamicproxy;

import java.io.FileOutputStream;
import java.io.IOException;

import sun.misc.ProxyGenerator;  

public class ProxyGeneratorUtils {
	/** 
     * 把代理类的字节码写到硬盘上 
     * @param path 保存路径 
     */  
    public static void writeProxyClassToHardDisk(String path) {  
        // 第一种方法，这种方式在刚才分析ProxyGenerator时已经知道了  
        // System.getProperties().put("sun.misc.ProxyGenerator.saveGeneratedFiles", true);  
          
        // 第二种方法  
          
        // 获取代理类的字节码  
        byte[] classFile = ProxyGenerator.generateProxyClass("Proxy11", UserServiceImpl.class.getInterfaces());  
          
        FileOutputStream out = null;  
          
        try {  
            out = new FileOutputStream(path);  
            out.write(classFile);  
            out.flush();  
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {  
            try {  
                out.close();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        }  
    }
}
```
```
    @Test  
    public void testGenerateProxyClass() {  
        ProxyGeneratorUtils.writeProxyClassToHardDisk("/home/jalenchu/jalen_chu/Proxy11.class");  
    }
```
反编译一下
```
/** 
     * 这个方法是关键部分 
     */  
    public final void add()  
    {  
        try  
        {  
            // 实际上就是调用MyInvocationHandler的public Object invoke(Object proxy, Method method, Object[] args)方法，第二个问题就解决了  
            super.h.invoke(this, m3, null);  
            return;  
        }  
        catch(Error _ex) { }  
        catch(Throwable throwable)  
        {  
            throw new UndeclaredThrowableException(throwable);  
        }  
    } 
```
