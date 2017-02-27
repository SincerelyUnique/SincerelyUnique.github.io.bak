---
title: 'SenchaCmd学习笔记（5）:Advanced Components'
date: 2017-02-22 13:46:39
tags: sencha
categories: Extjs
---
SenchaCmd学习笔记（5）:
Advanced Components
<!--more-->
0.概述：
 •	 Trees
 •	 Data views
 •	 Drag and drop
 •	 The picture explorer — a sample project        //tree panel and data views比较重要
 picture explorer应用组件及其他
	•	 The tree panel
	•	 Data views
	•	 Model
	•	 The store and rest proxy
	•	 Layouts and containers
	•	 References
	•	 Event handling
	•	 Filtering

1.The tree panel
Ext.tree.Panel 也继承自Ext.panel.Table，支持多列，但tree panel需要一个tree store ( Ext.Store.TreeStore )
	1）The basic tree
	①创建一个简单的tree store
	```	
	 var store = Ext.create('Ext.data.TreeStore', {

                                    root: {

                                    expanded: true,

                                    text: 'Continents',

                                    children: [{

                                                    text: 'Antarctica',

                                                    leaf: true

                                    }, {

                                                    text: 'South America',

                                                    expanded: true,

                                                    children: [{

                                                                    text: 'Brazil',

                                                                    leaf: true

                                                    }, {

                                                                    text: 'Chile',

                                                                    leaf: true

                                                    }]

                                    }, {

                                                    text: 'Asia',

                                                    expanded: true,

                                                    children: [{

                                                                    text: 'India',

                                                                    leaf: true

                                                    },{

                                                                    text: 'China',

                                                                    leaf: true

                                                    }]

                                    }, {

                                                    text: 'Africa',

                                                    leaf: true

                                    } ]

                                    }

	});
```
 	②用Ext.tree.Panel创建tree，调用之前创建的store
```
	Ext.create('Ext.tree.Panel', {

                                        title: 'Basic Tree',

                                        width: 200,

                                        height: 450,

                                        store: store,

                                        rootVisible: true,

                                        renderTo: Ext.getBody()

 	}); 
```
                ③实现拖拽功能，以及checked

	2）The tree grid



2.Data views

	Ext.view.View ( xtype:dataview )：自定义模板显示数据

 	内嵌事件：such as click, double-click, mouseover,mouseout, and so on

	创建一个简单的model名字叫person，创建一个store持有这个person的表单，
```
                Ext.define('Person', {

                                extend: 'Ext.data.Model',

                                fields: [

                                            { name:'name', type:'string' },

                                            { name:'age', type:'int' },

                                            { name:'gender', type:'int' }

                                ]

                });
```


```
                Ext.create('Ext.data.Store', {

                                id:'employees',

                                model: 'Person',

                                data: [

                                            { name:'Mike', age:22, gender: 0 },

                                            { name:'Woo', age:32, gender: 1 },

                                            { name:'John', age:33, gender: 1 },

                                            { name:'Kalai', age:25, gender: 0 }

                                ]

                });
```


3.Drag and drop    （拖拽）


	•	 Configure the items as draggable

	•	 Create the drop target

	•	 Complete the drop target

	1）Create the drop target

	用Ext.dd.DDTarget创建拖拉的目标容器
```
            var albums = Ext.get('album').select('div');

                                Ext.each(albums.elements, function(el) {

                                var albumDDTarget = Ext.create('Ext.dd.DDTarget', el,

                                                                'picsDDGroup');

            });
```
	2）Complete the drop target    （完成拖拽目标） 

            This is accomplished by overriding the onDragDrop method of DD
