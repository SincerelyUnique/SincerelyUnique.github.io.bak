---
title: java操作数组之Arrays
date: 2017-03-14 15:29:15
tags:
categories: Java
---
1.Array和Arrays区别
Array--->java.lang.reflect.Array
此类提供了动态创建和访问java数组的方法

Arrays--->java.util.Arrays
此类包含用来操作数组(如排序/搜索)的各种方法，此类还包含一个允许将数组作为列表来查看的静态工厂。
前者倾向于操作数组的单个元素，后者倾向于操作整个数组。
<!--more-->
2.Arrays里的一些方法
```
package demo4;

import java.util.Arrays;
import java.util.List;

public class demo {

	public static void main(String[] args) {
		byte[] byte1 = {23,53};
		byte[] byte2 = {23,53};
		
		int[] int1 = {3,63,42,22};
		int[] int2 = new int[] { 1, 2, 3, 4, 5, 6, 7 };
		
		int[][] intDouble = { { 80, 81, 82 }, { 84, 85, 86 }, { 87, 88, 89 } }; 
		
		int[][] stuGrades1 = { { 80, 81, 82 }, { 84, 85, 86 }, { 87, 88, 89 } };
		int[][] stuGrades2 = { { 80, 81, 82 }, { 84, 85, 86 }, { 87, 88, 89 } };
		
		//查询
		System.out.println(  Arrays.binarySearch( int1, 63 )  );	//1
		System.out.println(  Arrays.binarySearch( int2, 6 )  );		//5
		
		//打印
		System.out.println(  byte1.toString()  );				//[B@4f8e5cde
		System.out.println(  Arrays.toString(byte1)  );			//[23, 53]
		System.out.println(  Arrays.toString(intDouble)  );		//[[I@504bae78, [I@3b764bce, [I@759ebb3d]
		System.out.println(  Arrays.deepToString(intDouble)  );	//[[80, 81, 82], [84, 85, 86], [87, 88, 89]]
		
		//判等
		System.out.println(  byte1.equals(byte2)  );	//false
		System.out.println(  Arrays.equals(byte1, byte2)  );	//true
		System.out.println(  Arrays.deepEquals(stuGrades1, stuGrades2)  ); //true
		
		//替换/填充元素
		Arrays.fill( byte1, 0, 1, (byte)56 );		
		System.out.println(  Arrays.toString(byte1)  );		//[56, 53]
		int[] array = new int[8];
		Arrays.fill(array, 1);
		System.out.println(  Arrays.toString(array)  );		//[1, 1, 1, 1, 1, 1, 1, 1]
		
		//哈希码
		System.out.println(  byte1.hashCode()  );		//1334729950
		System.out.println(  Arrays.hashCode(byte1)  );		//2750
		
		//返回固定大小list，转换为List集合
		List<String> strList = Arrays.asList("Welcome", "To", "Java","World!");
		System.out.println(  strList  );
		
		String[] str = { "Eric", "John", "Alan", "Liz" };
		String[] copy = Arrays.copyOf(str, 3);		//[Eric, John, Alan]
		String[] rangeCopy = Arrays.copyOfRange(str, 2, str.length);	//[Alan, Liz]
		
		//排序
		String[] names = { "Liz", "John", "Eric", "Alan" };
		Arrays.sort(names, 0, 2);			//只排序前两个[John, Liz, Eric, Alan]
		Arrays.sort(names);				//全部排序[Alan, Eric, John, Liz]
		
	}
}

```