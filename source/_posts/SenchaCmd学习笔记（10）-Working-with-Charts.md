---
title: 'SenchaCmd学习笔记（10）:Working with Charts'
date: 2017-02-22 14:01:18
tags: sencha
categories: Extjs
---
0.概述

•	 Charts types
•	 Bar and column charts
•	 Area and line charts
•	 Pie charts
•	 3D charts
•	 The expense analyzer – a sample project

三种chart类型：cartesian, polar, and spacefilling.

1）The cartesian chart    （Ext.chart.CartesianChart (xtype: cartesian or chart)）直角坐标系（含x和y轴）
2）The polar chart    （Ext.chart.PolarChart (xtype: polar)）极坐标图表（含angular and radial角度与极轴）
3）The spacefilling chart    （Ext.chart.SpaceFillingChart (xtype: spacefilling)）空间填充图
4）Bar and column charts    （）条形图和柱状图
<!--more-->


1.柱状图

        0）创建一个simple tree store

                Ext.define('MyApp.model.Population', {

                                extend: 'Ext.data.Model',

                                fields: ['year', 'population']

                });

                Ext.define('MyApp.store.Population', {

                                extend: 'Ext.data.Store',

                                storeId: 'population',

                                model: 'MyApp.model.Population',

                                data: [

                                                { "year": "1610","population": 350 },

                                                { "year": "1650","population": 50368 },

                                                { "year": "1700", "population": 250888 },

                                                { "year": "1750","population": 1170760 },

                                                { "year": "1800","population": 5308483 },

                                                { "year": "1900","population": 76212168 },

                                                { "year": "1950","population": 151325798 },

                                                { "year": "2000","population": 281421906 },

                                                { "year": "2010","population": 308745538 },

                                ]

                });

                var store = Ext.create("MyApp.store.Population");

        1）用Ext.chart.CartesianChart (xtype:cartesian or chart )创建图表，同时使用上面的store

                Ext.create('Ext.Container', {

                                renderTo: Ext.getBody(),

                                width: 500,

                                height: 500,

                                layout: 'fit',

                                items: [{

                                                xtype: 'chart',

                                                insetPadding: { top: 60, bottom: 20, left: 20, right: 40 },

                                                store: store,

                                axes: [{

                                                type: 'numeric',

                                                position: 'left',

                                                grid: true,

                                                title: { text: 'Population in Millions', fontSize: 16 },

                                                }, {

                                                type: 'category',

                                                title: { text: 'Year', fontSize: 16 },

                                                position: 'bottom',

                                          }],

                                series: [{

                                                type: 'bar',

                                                xField: 'year',

                                                yField: ['population']

                                            }],

                                sprites: {

                                                type: 'text',

                                                text: 'United States Population',

                                                font: '25px Helvetica',

                                                width: 120,

                                                height: 35,

                                                x: 100,

                                                y: 40

                                            }

                                } ]

                });

        2）The bar chart    （使用的store同上）

                Ext.create('Ext.Container', {

                                renderTo: Ext.getBody(),

                                width: 500,

                                height: 500,

                                layout: 'fit',

                                items: [{

                                                xtype: 'chart',

                                                flipXY: true,

                                                insetPadding: { top: 60, bottom: 20, left: 20, right: 40 },

                                                store: store,

                                axes: [{

                                                type: 'numeric',

                                                position: 'bottom',

                                                grid: true,

                                                title: { text: 'Population in Millions', fontSize: 16 },

                                                }, {

                                                type: 'category',

                                                title: { text: 'Year', fontSize: 16 },

                                                position: 'left',

                                         }],

                                series: [{

                                                type: 'bar',

                                                xField: 'year',

                                                yField: ['population']

                                         }],

                                sprites: {

                                                type: 'text',

                                                text: 'United States Population',

                                                font: '25px Helvetica',

                                                width: 120,

                                                height: 35,

                                                x: 100,

                                                y: 40

                                                }

                                } ]

                });

        3）The stacked chart    （堆积图）

        store里面添加一个field    （上面的store不变）


                Ext.define('MyApp.model.Population', {

                                extend: 'Ext.data.Model',

                                fields: ['year', 'total','slaves']

                });


                Ext.define('MyApp.store.Population', {

                                extend: 'Ext.data.Store',

                                storeId: 'population',

                                model: 'MyApp.model.Population',

                                data: [

                                                { "year": "1790", "total": 3.9, "slaves": 0.7 },

                                                { "year": "1800", "total": 5.3, "slaves": 0.9 },

                                                { "year": "1810", "total": 7.2, "slaves": 1.2 },

                                                { "year": "1820", "total": 9.6, "slaves": 1.5 },

                                                { "year": "1830", "total": 12.9, "slaves": 2 },

                                                { "year": "1840", "total": 17, "slaves": 2.5 },

                                                { "year": "1850", "total": 23.2, "slaves": 3.2 },

                                                { "year": "1860", "total": 31.4, "slaves": 4 },

                                ]

                });

                var store = Ext.create("MyApp.store.Population");




                Ext.create('Ext.Container', {

                                renderTo: Ext.getBody(),

                                width: 500,

                                height: 500,

                                layout: 'fit',

                                items: [{

                                                xtype: 'cartesian',

                                                store: store,

                                                insetPadding: { top: 60, bottom: 20, left: 20, right: 40 },

                                axes: [{

                                                type: 'numeric',

                                                position: 'left',

                                                grid: true,

                                                title: { text: 'Population in Millions', fontSize: 16 },

                                                }, {

                                                type: 'category',

                                                title: { text: 'Year', fontSize: 16 },

                                                position: 'bottom',

                                          }],

                                series: [{

                                                type: 'bar',

                                                xField: 'year',

                                                yField: ['total','slaves']

                                          }],

                                sprites: {

                                                type: 'text',

                                                text: 'United States Slaves Distribution 1790 to 1860',

                                                font: '20px Helvetica',

                                                width: 120,

                                                height: 35,

                                                x: 60,

                                                y: 40

                                            }

                                           }]

                });

                //note：不用stacking也可以，可以set the stacked property of the series to false，意思没变，样式变了                

               其他可供选项：

                •	 tooltip : This can be added easily by setting a tooltip property in the series

                •	 legend : This can be rendered to any of the four sides of the chart by

                specifying the legend config

                •	 sprites : This can be an array if you want to specify multiple information,

                such as header, footer, and so on

        4）The 3D bar chart

            change the type of the series to 3D bar instead of bar

        5）The area chart

                ①The area chart    （替换之前的series即可）


                                series: [{

                                                type: 'area',      

                

                                                xField: 'year',

                                                stacked: false,

                                                title: ['Total','slaves'],

                                                yField: ['total', 'slaves'],

                                                style: {

                                                stroke: "#94ae0a",

                                                fillOpacity: 0.6,

                                                }

                                }]

        6）The line chart


                series: [{

                                        type: 'line',

                                        xField: 'year',

                                        title: ['Total'],

                                        yField: ['total']

                                },

                                {

                                        type: 'line',

                                        xField: 'year',

                                        title: ['Slaves'],

                                        yField: ['slaves']

                }],

        7）The pie chart    （常用：Ext.chart.PolarChart (xtype: polar)）

                ①The basic pie chart


                                Ext.define('MyApp.store.Expense', {

                                                extend: 'Ext.data.Store',

                                                alias: 'store.expense',

                                                fields: [ 'cat', 'spent'],

                                                data: [

                                                                { "cat": "Restaurant", "spent": 100},

                                                                { "cat": "Travel", "spent": 150},

                                                                { "cat": "Insurance", "spent": 500},

                                                                { "cat": "Rent", "spent": 1000},

                                                                { "cat": "Groceries", "spent": 400},

                                                                { "cat": "Utilities", "spent": 300},

                                                ]

                                });

                                var store = Ext.create("MyApp.store.Expense");

                                

                                Ext.create('Ext.Container', {

                                                renderTo: Ext.getBody(),

                                                width: 600,

                                                height: 500,

                                                layout: 'fit',

                                                items: [{

                                                                xtype: 'polar',

                                                                legend: { docked: 'bottom' },

                                                                insetPadding: { top: 100, bottom: 20, left: 20, right: 40 },

                                                                store: store,

                                                series: [{

                                                                type: 'pie',

                                                                angleField: 'spent',

                                                                label: {

                                                                                field: 'cat',

                                                                },

                                                tooltip: {

                                                                trackMouse: true,

                                                                renderer: function (storeItem, item) {

                                                                                var value = ((parseFloat(storeItem.get('spent') /

                                                                                storeItem.store.sum('spent')) * 100.0).toFixed(2));

                                                                                this.setHtml(storeItem.get('cat') + ': ' + value + '%');

                                                                                }

                                                            }

                                                }]

                                                }]

                                });

        8）The donut chart    （圆圈图）

        9）The 3D pie chart    （3D饼图）


                Ext.create('Ext.Container', {

                                renderTo: Ext.getBody(),

                                width: 600,

                                height: 500,

                                layout: 'fit',

                                items: [{

                                                xtype: 'polar',

                                                legend: { docked: 'bottom' },

                                                insetPadding: { top: 100, bottom: 20, left: 80, right: 80 },

                                                store: store,

                                series: [{

                                                type: 'pie3d',

                                                donut: 50,

                                                thickness: 70,

                                                distortion: 0.5,

                                                angleField: 'spent',

                                                label: { field: 'cat' },

                                                tooltip: {

                                                                trackMouse: true,

                                                                renderer: function (storeItem, item) {

                                                                                var value = ((parseFloat(storeItem.get('spent') /

                                                                                storeItem.store.sum('spent')) * 100.0).toFixed(2));

                                                                                this.setHtml(storeItem.get('cat') + ': ' + value + '%');

                                                                }

                                                }

                                    }]

                                }]

                });    

2.案例：expense analyzer费用分析
        见附件

        

        

  
