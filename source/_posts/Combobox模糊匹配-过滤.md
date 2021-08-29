---
title: Combobox模糊匹配-过滤
date: 2017-02-20 16:30:14
tags: combobox
categories: Extjs
---
```
triggerAction:  'all',
enableKeyEvents : true,
mode: 'local',
forceSelection: true, 
selectOnFocus: true,
lastQuery: '', 

listeners : {
	beforequery: function(e){
		var combo = e.combo;
		if(!e.forceAll){
			var value = e.query;
			combo.getStore().filterBy(function(record,id){
				var text = record.get(combo.displayField);
				return (text.indexOf(value)!=-1);
			});
			combo.expand();
			return false;
		}
	}
}
```
这些插入到combobox代码块中去
参考:

[http://pingfan.iteye.com/blog/514163](http://pingfan.iteye.com/blog/514163)

[http://blog.csdn.net/sjyingwei/article/details/8444382](http://blog.csdn.net/sjyingwei/article/details/8444382)

