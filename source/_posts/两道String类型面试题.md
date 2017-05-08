---
title: 两道String类型面试题
date: 2017-05-8 16:34:08
tags: 
categories: Java
---
1.给定一个字符串，找出其中重复次数最多的字符，并输出重复次数


<!--more-->
```java
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void test1(){
		String testStr = "adkfo2s3lds59!3*(323sf";
		//step1: 放入map中，key为字符，value为重复次数
		Map<String,Integer> map = new HashMap<String,Integer>();
		
		for( int i=0;i<testStr.length();i++ ){
			char ch = testStr.charAt(i);
			map.put(ch+"", 0);
		}
		
		for( int i=0;i<testStr.length();i++ ){
			char ch = testStr.charAt(i);
			
			for( String key : map.keySet() ){
				if( (ch+"").equals(key) ){
					int value = map.get(key);
					value++;
					map.put(key, value);
				}
			}
		}
		
		System.out.println(map);
		
		//step2: 找出重复次数最多的key
		int value = 0;
		String maxKey = null;
		List list = new ArrayList();
		
		Iterator it = map.entrySet().iterator();
		while( it.hasNext() ){
			Map.Entry entry = (Map.Entry) it.next();
			value = Integer.parseInt(entry.getValue().toString());
			list.add(entry.getValue());
			Collections.sort(list);
			
			if( value==Integer.parseInt(list.get(list.size()-1).toString()) ){
				maxKey = entry.getKey().toString();
			}
			
		}
		
		//step3: 判断次数最多的key是否多个
		List<String> ls = new ArrayList<>();
		for( String str: map.keySet() ){
			if( map.get(str)==map.get(maxKey) ){
				ls.add(str);
			}
		}
		
		System.out.println("字符串中出现次数最多的字符是:"+ls);
		System.out.println("字符串中出现次数最多的字符的次数是:"+map.get(maxKey));
	}
```
2.给定一个字符串，将其中数字相加求和
```java
	public static void test2(){
		String str = "12g644";
		int sum = 0;
		
		for( int i=0;i<str.length();i++ ){
			char ch = str.charAt(i);
			if( Character.isDigit(ch) ){
				int num = Integer.parseInt(ch+"");
				sum = sum+num;
			}else{
				continue;
			}
		}
		
		System.out.println("字符串内数字的和是:"+sum);
	}
```
