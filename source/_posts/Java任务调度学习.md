---
title: Java任务调度学习
date: 2017-02-20 15:47:12
tags: java
categories: Java
---
1. Timer
原文地址：
[http://www.ibm.com/developerworks/cn/java/j-lo-taskschedule/](http://www.ibm.com/developerworks/cn/java/j-lo-taskschedule/)
<!--more-->
```
package com.demo1.timer;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * 当前线程创建两个新的子任务线程（Timer）,第一个子任务延迟1s执行，第二个延迟5s执行
 * 10秒钟后关闭子任务线程（Timer），启用新线程返回“结束”
 * */
public class TimerTest extends TimerTask 
{
	private String jobNameStr = "";
	private static long currentTime = System.currentTimeMillis();
	
	public TimerTest(String jobName) 
	{
		super();
		this.jobNameStr = jobName;
	}
	
	@Override
	public void run() 
	{
		System.out.println("run "+jobNameStr);
	}
	
	public static void main(String[] args) throws InterruptedException, ExecutionException 
	{
		System.out.println("开始:"+currentTime);
		Timer timer = new Timer();
		
		long delay1 = 1*1000;
		long period1 = 1*1000;
		timer.schedule(new TimerTest("job1"), delay1, period1);
		
		long delay2 = 5*1000;
		long period2 = 1*1000;
		timer.schedule(new TimerTest("job2"), delay2, period2);
		
		Thread.sleep(10*1000);
		timer.cancel();
		
		CheckCurrentTime rt = new CheckCurrentTime();
		FutureTask<String> task = new FutureTask<String>(rt);
		new Thread(task, "CheckTime").start();
		String over = task.get();
		System.out.println(over);
	}
}

class CheckCurrentTime implements Callable<String>
{
	@Override
	public String call() throws Exception 
	{
		long currentTime = System.currentTimeMillis();
		String over = "结束:"+currentTime;
		return over;
	}
}
```

2. ScheduledExecutor
```
package com.demo1.scheduledexecutor;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ScheduledExecutorTest implements Runnable
{
	private String jobName = "";
	
	public ScheduledExecutorTest( String jobName ) 
	{
		super();
		this.jobName = jobName;
	}
	
	@Override
	public void run() 
	{
		System.out.println("execute "+jobName);
	}
	
	public static void main(String[] args) throws InterruptedException 
	{
		ScheduledExecutorService service = Executors.newScheduledThreadPool(10);
		
		long initialDelay1 = 1;
		long period1 = 1;
		service.scheduleAtFixedRate(new ScheduledExecutorTest("job1"), initialDelay1, period1, TimeUnit.SECONDS);
		
		long initialDelay2 = 5;
		long period2 = 1;
		service.scheduleAtFixedRate(new ScheduledExecutorTest("job2"), initialDelay2, period2, TimeUnit.SECONDS);
		
		Thread.sleep(10*1000);
		service.shutdown();
	}
}
```

3. ScheduledExecutor + Calendar
```
package com.demo1.scheduledexecutor;

import java.util.Calendar;
import java.util.TimerTask;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ScheduledExectorCalendarTest extends TimerTask
{
	private String jobName = "";
	
	public ScheduledExectorCalendarTest( String jobName ) 
	{
		super();
		this.jobName = jobName;
	}
	
	@Override
	public void run() 
	{
		System.out.println("execute "+jobName);
	}
	
	public Calendar getCurrentExecuteDate(Calendar currentDate,int executeDay,int executeHour,int executeMinute,int executeSecond)
	{
		int currentWeekOfYear = currentDate.get(Calendar.WEEK_OF_YEAR);
		int currentDayOfWeek = currentDate.get(Calendar.DAY_OF_WEEK);
		int currentHour = currentDate.get(Calendar.HOUR_OF_DAY);
		int currentMinute = currentDate.get(Calendar.MINUTE);
		int currentSecond = currentDate.get(Calendar.SECOND);
		
		boolean weekLater = false;
		if( executeDay<currentDayOfWeek )
		{
			weekLater = true;
		} else if( executeDay==currentDayOfWeek && executeHour<currentHour )
		{
			weekLater = true;
		} else if( executeDay==currentDayOfWeek && executeHour==currentHour && executeMinute<currentMinute )
		{
			weekLater = true;
		} else if( executeDay==currentDayOfWeek && executeHour==currentHour && executeMinute==currentMinute && executeSecond<currentSecond )
		{
			weekLater = true;
		}
		
		if( weekLater )
		{
			currentDate.set(Calendar.WEEK_OF_YEAR, currentWeekOfYear+1);
		}
		currentDate.set(Calendar.DAY_OF_WEEK, executeDay);
		currentDate.set(Calendar.HOUR_OF_DAY, executeHour);
		currentDate.set(Calendar.MINUTE, executeMinute);
		currentDate.set(Calendar.SECOND, executeSecond);
		
		return currentDate;
	}
	
	public static void main(String[] args) 
	{
		ScheduledExectorCalendarTest test = new ScheduledExectorCalendarTest("job1");
		
		Calendar currentDate = Calendar.getInstance();
		long currentTimeMillis = currentDate.getTime().getTime();
		
		Calendar executeDate = test.getCurrentExecuteDate(currentDate,3,16,1,0);
		long executeTimeMillis = executeDate.getTime().getTime();
		
		long delay = executeTimeMillis-currentTimeMillis;
		long period = 7 * 24 * 60 * 60 * 1000;
		ScheduledExecutorService service = Executors.newScheduledThreadPool(10);
		service.scheduleAtFixedRate(test, delay, period, TimeUnit.MILLISECONDS);
	}
}
```

4. Quartz  ( quartz-1.8.6.jar , slf4j-api-1.7.21.jar )
```
package com.demo1.quartz;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.Trigger;
import org.quartz.TriggerUtils;

public class QuartzTest implements Job
{
	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException 
	{
		System.out.println("Generating report - "
				+ arg0.getJobDetail().getFullName() + ", type ="
				+ arg0.getJobDetail().getJobDataMap().get("type"));
		System.out.println(new Date().toString());
	}
	
	public static void main(String[] args) 
	{
		try 
		{
			//create Scheduler
			SchedulerFactory factory = new org.quartz.impl.StdSchedulerFactory();
			Scheduler scheduler = factory.getScheduler();
			scheduler.start();
			
			//create JobDetail
			JobDetail jobDetail = new JobDetail("myJob", "myJobGroup",QuartzTest.class);
			jobDetail.getJobDataMap().put("type", "FULL");
			
			//create Trigger
			Trigger trigger = TriggerUtils.makeWeeklyTrigger(3, 16, 30);
			trigger.setGroup("myTriggerGroup");
			trigger.setStartTime(TriggerUtils.getEvenSecondDate(new Date()));
			trigger.setName("myTrigger");
			
			scheduler.scheduleJob(jobDetail, trigger);
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
	}
}
```
