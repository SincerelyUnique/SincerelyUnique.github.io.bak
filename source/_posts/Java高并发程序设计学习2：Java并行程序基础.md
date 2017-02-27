---
title: Java高并发程序设计学习2：Java并行程序基础
date: 2017-02-23 08:46:45
tags:
categories: Java
---
1. 线程的母亲：进程
2. 进程：
系统进行资源分配和调度的基本单位；
操作系统结构的基础；
是线程的容器；
是程序的实体；
例如：windows的.exe文件，点击运行便是一个进程
<!--more-->
3. 线程
不可见，可使用工具查看；
轻量级进程，程序执行最小单位；
生命周期在Thread中State枚举中定义：
	NEW，start()
	RUNNABLE，
	BLOCKED，synchronized
	WAITING，进入无时间限制的等待
	TIMED_WAITING，进入有时间限制的等待
	TERMINATED，线程执行完毕
4. 新建线程
	继承Thread，注意启动线程用start(),不要直接调用run()；
	实现Runnable，较继承Thread要好；
	实现Callable<V>，Call()方法可返回值；
5. 终止线程
错误做法：stop()方法，暴力终止，释放所有锁，慎用，一旦出错不会返回任何错误信息，当前标识已废弃；
正确做法：
```
public void stopMe(){
	stopme = true;
}
```
当调用stopMe()方法获取stopme值为true时，跳出线程
```
if(stopme){
	break;
}
```
6. 线程中断
线程中断并不会使线程立即退出，由目标线程自行决定，线程中断提供了3个方法：
public void Thread.interrupt():	//中断线程
public boolean Thread.isInterrupted();	//判断是否被中断
public static boolean Thread.interrupted()	//判断是否被中断，并清除当前中断状态
一下这段代码并未成功中断
```
public class ThreadInterrupt {

	public static void main(String[] args) throws InterruptedException{
		Thread t1 = new Thread(){
			@Override
			public void run() {
				while(true){
					Thread.yield();
				}
			}
		};
		t1.start();
		Thread.sleep(2000);
		t1.interrupt();
	}
}
```
需要改成
```
public class ThreadInterrupt {

	public static void main(String[] args) throws InterruptedException{
		Thread t1 = new Thread(){
			@Override
			public void run() {
				while(true){
					if(Thread.currentThread().interrupted()){
						System.out.println("Interrupt!");
						break;
					}
					Thread.yield();
				}
			}
		};
		t1.start();
		Thread.sleep(2000);
		t1.interrupt();
	}
}
```
这段代码类似上面的stopme中断，但要优于stopme。

5. Thread.sleep()休眠中断会强制抛出异常：InterruptException，必须捕获并处理它
```
public class ThreadInterrupt {

	public static void main(String[] args) throws InterruptedException{
		Thread t1 = new Thread(){
			@Override
			public void run() {
				while(true){
					if(Thread.currentThread().interrupted()){
						System.out.println("Interrupt!");
						break;
					}
					try {
						Thread.sleep(2000);
					} catch (InterruptedException e) {
						System.out.println("Interrupt when sleep!");
						//设置中断状态,再次设置中断标记位，如果不加处理，下次循环开始时无法捕获这个中断
						Thread.currentThread().interrupt();
					}
					Thread.yield();
				}
			}
		};
		t1.start();
		Thread.sleep(2000);
		t1.interrupt();
	}
}
```

6. object.wait()，线程进入object对象的等待队列，并不可以随便调用，必须包含在synchronized语句中，无论是wait()或者notify()都需要首先获得目标对象的一个监视器
当调用object.notify()，随机唤醒一个线程（注意是随机，并不一定是之前先等待的线程，这是不公平的）
当调用object.notifyAll()，唤醒所有等待线程
```
public class WaitAndNotify {
	final static Object object = new Object();
	public static class T1 extends Thread{
		@Override
		public void run() {
			synchronized (object) {
				System.out.println(System.currentTimeMillis()+":T1 start");
				try {
					System.out.println(System.currentTimeMillis()+":T1 wait");
					object.wait();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				System.out.println(System.currentTimeMillis()+":T1 end");
			}
		}
	}
	
	public static class T2 extends Thread{
		@Override
		public void run() {
			synchronized (object) {
				System.out.println(System.currentTimeMillis()+":T2 start");
				object.notify();
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				System.out.println(System.currentTimeMillis()+":T2 end");
			}
		}
	}
	
	public static void main(String[] args) {
		Thread t1 = new T1();
		Thread t2 = new T2();
		t1.start();
		t2.start();
	}
}
```
输出：
```
1487814788060:T1 start
1487814788061:T1 wait
1487814788063:T2 start
1487814790063:T2 end
1487814790064:T1 end
```
上面程序中T2通知T1后并不能立即执行T1，而是等待2秒中T2释放object的锁，可见wait()会释放锁，而sleep()不会释放锁。

7. 线程挂起：Thread.currentThread().suspend(),不释放任何锁资源
继续执行：Thread.resume()，与suspend相对，都已废弃。

8. 等待线程结束join和谦让yield
join():
应用场景：一个线程的输入可能依赖于另外一个或者多个线程的输出，此时这个线程需要等待依赖的线程执行完毕
两个方法：
	无限等待
	public final void join() throws InterruptException
	存在等待时间	
	public final synchronized void join(long millis) throws InterruptException
```
/**
 * 不适用join，主线程不等待AddThread线程，输出为0；
 * 使用join，主线程等待AddThread线程执行完毕，输出位100000；
 * */
public class Join {
	//用volatile修饰的变量，线程在每次使用变量的时候，都会读取变量修改后的最的值。volatile很容易被误用，用来进行原子性操作。
	public volatile static int i = 0;
	
	public static class AddThread extends Thread{
		@Override
		public void run() {
			for(i=0;i<100000;i++);
		}
	}
	
	public static void main(String[] args) throws InterruptedException {
		AddThread at = new AddThread();
		at.start();
		at.join();
		System.out.println(i);
	}
}
```

yield():
方法：public static native void yield()
场景：适用于优先级低的线程，一旦执行，让出CPU，但并不意味着不执行，还会与其他线程进行CPU的争夺

9. volatile与java内存模型（JMM）
JMM：原子性，有序性，可见性
volatile：
场景：使用volatile声明的变量，说明它极有可能被其他线程修改，为保证所有线程能够看到这个修改的动作，它会通知其他线程，以保证可见性和有序性
注意：volatile并不能代替锁，也无法保证一些复合操作的原子性

10. 线程组
相同功能的线程放置在一个线程组里
```
public class ThreadGroupName implements Runnable{

	@Override
	public void run() {
		String groupAndName = Thread.currentThread().getThreadGroup().getName() + "-" + Thread.currentThread().getName();
		while(true){
			System.out.println("I am "+ groupAndName );
			try {
				Thread.sleep(3000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	public static void main(String[] args) {
		ThreadGroup tg = new ThreadGroup("PrintGroup");
		//使用Thread构造函数分配到线程组
		Thread t1 = new Thread(tg,new ThreadGroupName(),"T1");
		Thread t2 = new Thread(tg,new ThreadGroupName(),"T2");
		t1.start();
		t2.start();
		//获得活动线程的总数，因为线程是动态的，所以这个值只是一个估计值，不精确
		System.out.println(tg.activeCount());
		//打印这个线程组里面所有线程信息
		tg.list();
	}
}
```
线程组也可以使用stop()停止组内所有线程，但要谨慎使用

11. 守护线程：Daemon
例如：垃圾回收线程，JIT线程等，与之对应称用户线程
守护线程应该在start()之前设置
```
/**
 * 守护线程
 * */
public class DaemonThread {
	public static class DaemonT extends Thread{
		@Override
		public void run() {
			while(true){
				System.out.println("I am alive!");
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	public static void main(String[] args) throws InterruptedException {
		Thread t = new DaemonT();
		t.setDaemon(true);
		t.start();
		
		Thread.sleep(2000);
	}
}
```

12. 线程优先级
描述：使用1-10标识线程的优先级,数字越大优先级越高
静态标量：
	public final static int MIN_PRIORITY = 1;
	public final static int NORM_PRIORITY = 5;
	public final static int MAX_PRIORITY = 10;
```
/**
 * 线程优先级
 * */
public class ThreadPriority {
	public static class HighPriority extends Thread{
		static int count = 0;
		
		@Override
		public void run() {
			while(true){
				synchronized (ThreadPriority.class) {
					count++;
					if(count>100){
						System.out.println("High priority thread break");
						break;
					}
				}
			}
		}
	}
	
	public static class LowPriority extends Thread{
		static int count = 0;
		
		@Override
		public void run() {
			while(true){
				synchronized (ThreadPriority.class) {
					count++;
					if(count>100){
						System.out.println("Low priority thread break");
						break;
					}
				}
			}
		}
	}

	public static void main(String[] args) {
		Thread high = new HighPriority();
		LowPriority low = new LowPriority();
		high.setPriority(Thread.MAX_PRIORITY);
		low.setPriority(Thread.MIN_PRIORITY);
		//怎么是谁先start谁快呢
		low.start();
		high.start();
	}
}
```

13. 线程安全与synchroized
线程不安全示例：
```
/**
 * 两个线程写入i的值时候产生冲突，即当t1执行i++时，i的值为1，同一时间t2执行i++，因为没有读取已经改变的值，i++也会为1
 * 冲突导致线程不安全，最终输出结果不一定是20000
 * */
public class ThreadUnsafe implements Runnable{

	static public ThreadUnsafe instance = new ThreadUnsafe();
	static volatile int i = 0;
	
	public static void increase(){
		i ++;
	}
	
	@Override
	public void run() {
		for(int j=0;j<10000;j++){
			increase();
		}
	}
	
	public static void main(String[] args) throws InterruptedException {
		Thread t1 = new Thread(instance);
		Thread t2 = new Thread(instance);
		t1.start();t2.start();
		t1.join();t2.join();
		System.out.println(i);
	}
	
}
```
使用synchronized实现线程间同步
	指定加锁对象，进入同步代码前需要获得给定对象的锁
	直接作用于实例方法，当前实例加锁
	直接作用于静态方法，当前类加锁
```
/**
 * 为了线程安全，添加锁
 * */
public class ThreadSafe implements Runnable{

	static public ThreadUnsafe instance = new ThreadUnsafe();
	//这里去掉volatile
	static int i = 0;
	
	//方法一
	/*public synchronized void increase(){
		i ++;
	}
	
	@Override
	public void run() {
		for(int j=0;j<10000;j++){
			increase();
		}
	}*/
	
	//方法二
	@Override
	public void run() {
		for(int j=0;j<10000;j++){
			synchronized(instance){
				i++;
			}
		}
	}
	
	public static void main(String[] args) throws InterruptedException {
		//注意这里t1和t2指向同一个实例		
		Thread t1 = new Thread(instance);
		Thread t2 = new Thread(instance);
		t1.start();t2.start();
		t1.join();t2.join();
		System.out.println(i);
	}
	
}

```

14. 注意程序是否有溢出
```
/**
 * 输出：-894784850，为负数，因为int类型溢出
 * */
public class OutTo {
	public static void main(String[] args) {
		int v1 = 1073741827;
		int v2 = 1431655768;
		int ave = (v1+v2)/2;
		System.out.println(ave);
	}
}
```

15. 并发下ArrayList注意
```
import java.util.ArrayList;

/**
 * ArrayList是一个线程不安全容器，多线程中使用易错但不易表现出来，多线程访问冲突
 * 错误1：打印结果可能不是20000
 * 错误2：抛出ArrayIndexOutOfBoundsException
 * */
public class ArrayListNotSafe {
	static ArrayList<Integer> a1 = new ArrayList<Integer>(10);
	
	public static class AddThread implements Runnable{
		@Override
		public void run() {
			for(int i = 0;i<1000000;i++){
				a1.add(i);
			}
		}
	}
	
	public static void main(String[] args) throws InterruptedException {
		Thread t1 = new Thread(new AddThread());
		Thread t2 = new Thread(new AddThread());
		t1.start();
		t2.start();
		t1.join();t2.join();
		System.out.println(a1.size());
	}
}
```

16. 并发下HashMap
```
import java.util.HashMap;
import java.util.Map;

/**
 * 情形1：为100000，正好
 * 情形2：<100000,
 * 情形3：线程不会终止
 * */
public class HashMapNotSafe {
	static Map<String,String> map = new HashMap<String,String>();
	
	public static class AddThread implements Runnable{
		int start = 0;
		
		public AddThread(int start) {
			this.start = start;
		}
		
		@Override
		public void run() {
			for(int i = start;i<100000;i=i+2){
				map.put(Integer.toString(i), Integer.toBinaryString(i));
			}
		}
		
	}
	
	public static void main(String[] args) throws InterruptedException {
		Thread t1 = new Thread(new HashMapNotSafe.AddThread(0));
		Thread t2 = new Thread(new HashMapNotSafe.AddThread(1));
		t1.start();
		t2.start();
		t1.join();t2.join();
		System.out.println(map.size());
	}
}
```









