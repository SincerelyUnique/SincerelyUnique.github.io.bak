---
title: Java并发和多线程学习
date: 2017-03-6 13:19:15
tags: 
categories: Java
---
1. Java采用的是单线程编程模型
2. JVM进程不是单线程的（创建后启动一个任务线程，同时含其他线程，如垃圾回收线程）
3. 耗时操作尽量放入子线程
<!--more-->
4. 创建线程：继承Thread；实现Runnable；实现callable
5. 创建进程：ProcessBuilder的start方法；Runtime的exec方法
6. 同步，顺序执行（串行），需等待；异步，并行
7. 阻塞，条件不满足，等待；非阻塞，条件不满足，但返回信息通知你不必等待（跳过）
8. 阻塞IO与非阻塞IO类似于7
9. 五种IO模型：阻塞IO模型；非阻塞IO模型；多路复用IO模型（常用的Java NIO）；信号驱动IO模型；异步IO模型。前四种为同步IO，最后一种为异步IO
10. 多线程不如线程池，线程池处理长连接不划算
11. 高性能IO设计模式：Reactor模式；Proactor模式
12. NIO中几个关键概念：Channel通道（双向，即可读可写），Buffer缓冲区（容器，是个连续数组），Selector选择器（检测通道事件）
13. 线程生命周期：创建(new)、就绪(runnable)、运行(running)、阻塞(blocked)、time waiting、waiting、消亡（dead）
14. 上下文切换：单核CPU当运行一个线程过程中转去运行另一个线程
15. Thread类中的方法
	start()：启动线程，分配必要资源；
	run()：定义具体要执行的任务；
	sleep()：线程睡眠，交出CPU，但不释放锁；
	yield()：交出CPU但不释放锁，不能控制交出的时间，并且只能让相同优先级的线程获取到其CPU
	join()：让线程释放对一个对象持有的锁，并交出CPU执行权限；
	interrupt()：中断一个正处于阻塞状态的线程，或停止一个正在运行的线程；
	stop()：废弃的方法，不安全，基本不用，终止调用run方法，强制释放锁；
	destory()：同上；
16. Thread线程属性
	getId()：获取线程ID
	getName()和setName()：得到/设置线程名称
	getPriority()和setPriority()：获取/设置优先级
	isDaemon()和setDaemon()：判断是否是守护线程/设置守护线程
	（JVM中的垃圾回收器就是一个守护线程）
17. 线程安全问题：多线程访问或操作临界资源（对象，属性或某个数据库操作等）时遇到的不可预期的异常
18. 线程安全解决：序列化访问临界资源（同步互斥访问），即临界资源上锁：synchronized或lock
19. synchronized缺陷：代码块内线程阻塞(如sleep)而又没有释放锁，其他线程会一直等待
20. Lock优点：不会造成synchronized的无限等待，同时可以知道线程有没有成功获得锁（synchronized都无法做到），Lock必须手动释放锁，synchronized可自动释放
Appendix：[http://www.cnblogs.com/dolphin0520/p/3923167.html](http://www.cnblogs.com/dolphin0520/p/3923167.html)
