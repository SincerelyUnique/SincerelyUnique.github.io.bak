---
title: 'SenchaCmd学习笔记（4）:核心概念class system'
date: 2017-02-22 13:45:10
tags: sencha
categories: Extjs
---
SenchaCmd学习笔记（4）:

核心概念class system
<!--more-->
1.核心概念

    •	 The class system, and creating and extending class

    •	 Events

    •	 Querying

    •	 Containers

    •	 Layouts

2.class system（类库）

    •	 Ext

    •	 Ext.Base

    •	 Ext.Class

    •	 Ext.ClassManager

    •	 Ext.Loader



3.Ext

application：Ext.application（{}）；

define：Ext.define(name,data, callback);，extend/override/singleton

create：Ext.create(Class,Options);，

onReady：Ext.onReady(function(){     });

widget：Ext.widget('panel', {renderTo: Ext.getBody(),title: 'Panel'});等同于：Ext.create('Ext.panel.Panel', {renderTo: Ext.getBody(),title: 'Panel'});

            （窗口小部件）

getClass：

                var button = new Ext.Button();

                Ext.getClass(button);    // returns Ext.Button

getClassName：

                Ext.getClassName(Ext.Button);        //returns "Ext.Button"



4.Ext.Base（所有类继承自Base，原型）

5.Ext.Class

6.Ext.ClassManager（管理所有类和映射，从字符串类名到实际的类的对象）


    •	 Ext.define

    •	 Ext.create

    •	 Ext.widget

    •	 Ext.getClass

    •	 Ext.getClassName



7.Ext.Loader


Ext.require(['widget.window', 'layout.border','Ext.data.Connection']);

Ext.require(['widget.*', 'layout.*', 'Ext.data.*');

Ext.exclude('Ext.data.*').require('*');
