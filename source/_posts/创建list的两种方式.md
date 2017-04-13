---
title: 创建list的两种方式
date: 2017-04-9 16:34:08
tags: 
categories: Java
---
1. 一种是直接创建
<!--more-->
```
        List<String> names = new ArrayList<String>();
	names.add("peter");
	names.add("anna");
	names.add("mike");
	names.add("xenia");
```

2. 另一种是数组转换，这种不可add和remove
```
        List<String> names = Arrays.asList("peter", "anna", "mike", "xenia");
```