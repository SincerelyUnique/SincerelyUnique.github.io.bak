---
title: java线程池简介
date: 2017-03-14 15:19:15
tags:
categories: Java
---
以下是从网上搜索到的有关线程池的知识。
[http://page.factj.com/blog/p/4098](http://page.factj.com/blog/p/4098)
[http://blog.csdn.net/ljd2038/article/details/51278508#](http://blog.csdn.net/ljd2038/article/details/51278508#)

1.首先了解一下为什么使用线程池，也就是线程池的优势
<!--more-->
①降低系统资源消耗，通过重用已存在的线程，降低线程创建和销毁造成的消耗；
②提高系统响应速度，当有任务到达时，无需等待新线程的创建便能立即执行；
③方便线程并发数的管控，线程若是无限制的创建，不仅会额外消耗大量系统资源，更是占用过多资源而阻塞系统或oom等状况，从而降低系统的稳定性。线程池能有效管控线程，统一分配、调优，提供资源使用率；
④更强大的功能，线程池提供了定时、定期以及可控线程数等功能的线程池，使用方便简单。

2.创建线程池
```
ExecutorService service = new ThreadPoolExecutor(....);
```
ThreadPoolExecutor的构造方法如下
```
    public ThreadPoolExecutor(int corePoolSize,
                              int maximumPoolSize,
                              long keepAliveTime,
                              TimeUnit unit,
                              BlockingQueue<Runnable> workQueue,
                              ThreadFactory threadFactory,
                              RejectedExecutionHandler handler) {}
```
①corePoolSize：核心线程数，默认一直存活在线程池中，即使闲置也是，如果ThreadPoolExecutor的allowCoreThreadTimeOut属性为true，这时处于闲置的核心线程在等待新任务时会有超时策略，这个超时事件由keepAliveTime指定，一旦超时，闲置线程就会被终止

②maximumPoolSize：线程池中容纳最大线程数，如果超过这个线程数量，后续任务会阻塞，这个数量=核心线程数+非核心线程数

③keepAliveTime：非核心线程闲置时超时时长，即超时回收，只有ThreadPoolExecutor的allowCoreThreadTimeOut属性为true时对核心线程生效

④unit：用于指定keepAliveTime的时间单位，是一个枚举，可用单位有天（TimeUnit.DAYS），小时（TimeUnit.HOURS），分钟（TimeUnit.MINUTES），毫秒(TimeUnit.MILLISECONDS)，微秒(TimeUnit.MICROSECONDS, 千分之一毫秒)和毫微秒(TimeUnit.NANOSECONDS, 千分之一微秒);

⑤workQueue：线程池中保存等待执行的任务的阻塞队列，通过线程池中的execute方法提交的Runable对象都会存储在该队列中。我们可以自定义阻塞队列。也可以调用

⑥threadFactory：线程工厂，为线程池提供新线程的创建。ThreadFactory是一个接口，里面只有一个newThread方法。 默认为DefaultThreadFactory类

⑦handler：当任务队列已满并且线程池中的活动线程已经达到所限定的最大值或者是无法成功执行任务，这时候ThreadPoolExecutor会调用RejectedExecutionHandler中的rejectedExecution方法，在线程池中它默认是AbortPolicy，在无法处理新任务时抛出RejectedExecutionException异常。

```
package demo4.package1;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ThreadPoolDemo {
	
	public static void main(String[] args) {
		ExecutorService service = new ThreadPoolExecutor(5, 10, 10, TimeUnit.SECONDS, new LinkedBlockingQueue<>());
		
		//使用execute方法提交任务时没有返回值，所以我们无法判断线程池是否执行成功
		service.execute(new Runnable(){
			@Override
			public void run() {
				System.out.println("execute方式");
			}
		});
		
		//使用submit时有返回值future，可以判断是否成功，还可以通过future的get方法获取返回值
		Future<Integer> future = service.submit(new Callable<Integer>(){
			@Override
			public Integer call() throws Exception {
				System.out.println("submit方式");
                return 2;
			}
		});
		try {
			Integer number = future.get();
			System.out.println(number);//这里输出2
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//关闭线程池，将线程池状态设置成SHUTDOWN状态，然后中断所有没有正在执行任务的线程。
		//中断采用interrupt方法，所以无法响应中断的任务可能永远无法终止。
		service.shutdown();
		
		//关闭线程池，将线程池的状态设置成STOP状态，然后中断所有任务(包括正在执行的)的线程，并返回等待执行任务的列表。
		//service.shutdownNow();
		
		//判断线程池是否关闭，当所有任务都已关闭，表示线程池关闭完毕，返回true
		boolean isShutDown = service.isShutdown();
		System.out.println(isShutDown);//这里返回true
		
	}
}
```

3.java中具有不同功能常见的线程池，都是直接或间接配置ThreadPoolExecutor来实现他们各自功能，
①**newFixedThreadPool**
```
class FixedThreadPoolDemo{
	
	/**
	 * 该线程池是一种线程数量固定的线程池;
	 * 这个线程池中所容纳最大的线程数就是我们设置的核心线程数(只有核心线程,不会被回收);
	 * 不存在超时机制;
	 * 采用LinkedBlockingQueue，所以对于任务队列的大小也是没有限制的。
	 * */
	public void createNewFixedThreadPoolDemo(){
		ExecutorService service = Executors.newFixedThreadPool(4);
	}
	
	public static ExecutorService newFixedThreadPool(int nThreads){
		return new ThreadPoolExecutor(
				nThreads, 
				nThreads,
                0L, 
                TimeUnit.MILLISECONDS,
                new LinkedBlockingQueue<Runnable>()
                );
	}
}
```
②**newCachedThreadPool**
```
class CachedThreadPoolDemo{
	
	/**
	 * 下面线程的核心线程数为0;
	 * Integer.MAX_VALUE是一个很大的数，也差不多可以说这个线程池中的最大线程数可以任意大。
	 * 当线程池中的线程都处于活动状态的时候，线程池就会创建一个新的线程来处理任务。
	 * 该线程池中的线程超时时长为60秒，所以当线程处于闲置状态超过60秒的时候便会被回收。
	 * 线程都处于闲置状态超过60秒，此线程池会不存在任何线程
	 * */
	public static ExecutorService newCachedThreadPool(){
		return new ThreadPoolExecutor(
				0, 
				Integer.MAX_VALUE,
                60L,
                TimeUnit.SECONDS,
                new SynchronousQueue<Runnable>());
	}
}
```
③**newScheduledThreadPool**
```
class ScheduledThreadPoolDemo{
	
	/**
	 * 创建一个可定时执行或周期执行任务的线程池
	 * 它的核心线程数是固定的，对于非核心线程几乎可以说是没有限制的，
	 * 并且当非核心线程处于限制状态的时候就会立即被回收。
	 * 
	 * schedule(Runnable command, long delay, TimeUnit unit):延迟一定时间后执行Runnable任务；
	 * schedule(Callable callable, long delay, TimeUnit unit):延迟一定时间后执行Callable任务；
	 * scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit):延迟一定时间后，以间隔period时间的频率周期性地执行任务；
	 * scheduleWithFixedDelay(Runnable command, long initialDelay, long delay,TimeUnit unit):与scheduleAtFixedRate()方法很类似，但是不同的是scheduleWithFixedDelay()方法的周期时间间隔是以上一个任务执行结束到下一个任务开始执行的间隔，而scheduleAtFixedRate()方法的周期时间间隔是以上一个任务开始执行到下一个任务开始执行的间隔，也就是这一些任务系列的触发时间都是可预知的。
	 * 
	 * ScheduledExecutorService功能强大，对于定时执行的任务，建议多采用该方法。
	 * */
	public void createScheduledThreadPool(){
		ScheduledExecutorService service = Executors.newScheduledThreadPool(4);
		
		service.schedule(new  Runnable() {
            public void run() {
                System.out.println(Thread.currentThread().getName()+"延迟三秒执行");
            }
        }, 3, TimeUnit.SECONDS);
		
		service.scheduleAtFixedRate(new  Runnable() {
            public void run() {
                System.out.println(Thread.currentThread().getName()+"延迟三秒后每隔2秒执行");
            }
        }, 3, 2, TimeUnit.SECONDS);
		
	}
}
```
④**newSingleThreadExecutor**
```
class SingleThreadExecutorDemo{
	
	/**
	 * 在这个线程池中只有一个核心线程，对于任务队列没有大小限制，也就意味着这一个任务处于活动状态时，其他任务都会在任务队列中排队等候依次执行。
	 * */
	public void singleThreadExecutorDemo(){
		ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();
		for (int i = 0; i < 3; i++) {
			final int index = i;

			singleThreadExecutor.execute(new Runnable() {
				@Override
				public void run() {
					System.out.println(Thread.currentThread().getName() + ", index=" + index);
				}
			});

			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
```

4.线程池使用技巧
需要针对具体情况而具体处理，不同的任务类别应采用不同规模的线程池，任务类别可划分为CPU密集型任务、IO密集型任务和混合型任务。(N代表CPU个数)
对于CPU密集型任务：线程池中线程个数应尽量少，如配置N+1个线程的线程池；
对于IO密集型任务：由于IO操作速度远低于CPU速度，那么在运行这类任务时，CPU绝大多数时间处于空闲状态，那么线程池可以配置尽量多些的线程，以提高CPU利用率，如2*N；
对于混合型任务：可以拆分为CPU密集型任务和IO密集型任务，当这两类任务执行时间相差无几时，通过拆分再执行的吞吐率高于串行执行的吞吐率，但若这两类任务执行时间有数据级的差距，那么没有拆分的意义。