---
title: 'SenchaCmd学习笔记（6）:Events and The DOM node event handling'
date: 2017-02-22 13:48:16
tags: sencha
categories: Extjs
---
SenchaCmd学习笔记（6）:

Events and The DOM node event handling
<!--more-->
1.Adding listeners

    单击button触发事件
```
    Ext.create('Ext.Button', {

        renderTo: Ext.getBody(),

        listeners: {

                        click: function() {

                        Ext.Msg.alert('Button clicked!');

                        }

            }

    });
    

```
    单击button触发多个事件
```
    Ext.create('Ext.Button', {

        renderTo: Ext.getBody(),

        listeners: {

        mouseout: function() {

                            //Do something

            },

                        click: function() {

                            // Do something

            }

        }

    });
```
    也可以创建完实例后添加listener（没出来），用button.on
```
    var button = Ext.create('Ext.Button');

    button.on('click', function() {

            //Do something

    });
```
    也可以创建完实例后添加listener（没出来），用button.on添加多个
```
    var button = Ext.create('Ext.Button');

        button.on({

        mouseover: function() {

                        //Do something

                },

        mouseover: function() {

                        //Do something

                }

        });
```


2.Removing listeners（没出来）

    移除监听者 
```
    var HandleClick= function() {

            Ext.Msg.alert('My button clicked!');

        }

            Ext.create('Ext.Button', {

                    listeners: {



                            click: HandleClick

                        }

    });

    button.un('click', HandleClick);
```

3.The DOM node event handling （DOM事件处理）
```
        HTML：<div id="mydiv"></div>

        var div = Ext.get('mydiv');

        div.on('click', function(e, t, eOpts) {

                        // Do something

        });
```

4.Accessing DOM  （访问DOM，三种方式）

    1）    var mydiv = Ext.get('myDivId');

    2）    var someNodes = Ext.query('.oddRow',myCustomComponent.getEl().dom);  （返回一个数组：HTMLElement[]/Ext.dom.Element[]）

    3）    var rows = Ext.select('div.row');     ////Matches all divs with class

             row

             rows.setWidth(100);                     // All elements become 100 width

             也可以组合起来写：Ext.select('div.row').setWidth(100);                                （返回一个CompositeElement类型的参数的集合）



5.Multiple selections（多重选择）
```
        Ext.select('div.row, span.title'); //Matches all divs with class，row and all spans with class title
```


6.Selection root（root选择）
```
        Ext.get('myEl').select('div.row');     //指定元素选择，myEI是root参数      

        Ext.select('div.row', true, 'myEl');    // This is equivalent to the previous line.
```


7.Selection chaining（选择链接）
```
        Ext.select('div.row[title=bar]:first')
```


8.Ext.ComponentQuery（组件查询）

    可以全局根据某个组件（ID, xtype, and properties）进行查询，或指定根目录查询

    1）    Ext.ComponentQuery.query('button');      //根据button查询

    2）    Ext.ComponentQuery.query('#foo');        //根据id为foo的查询

    3）    Ext.ComponentQuery.query("button[title='my button']");;

                或者

             parent.query('textfield[title=my button]');

    4）    Ext.ComponentQuery.query('formpanel numberfield'); // Gets only the numberfields under a form  （嵌套选择器）

    5）    parent.child('button[itemId=save]');                    

                    //returns the first direct child of the container that matches thepassed selector. If there is no match, then a null will be returned.

                    //you can use other methods, such as nextNode , up , down ,previousSibling , and so on.



9.Components（组件Tree Panel, Grids等）
```
        Ext.Component

```

10.Containers（容器，组件的集合）
```
        Ext.create('Ext.panel.Panel', {

            renderTo: Ext.getBody(),

            width: 700,

            height: 400,

            items: [

                {

                    xtype: 'panel',

                    title: 'Panel 1',

                },

                {

                    xtype: 'panel',

                    title: 'Panel 2',

                    height: 200,

            items: [

                {

                    xtype: 'button',

                    text: 'Click Me'

                }

                ]

                },

                {

                    xtype: 'panel',

                    title: 'Panel 3',

                    width: 150,

                    height: 100,

                }

                ]

        });                                                //一个container包含3个panel，同时panel2里面包含一个button
```


11.Layouts （布局）

    你可以指定列宽，但是所有组件的列宽width必须等于1.
```
        Ext.create('Ext.panel.Panel', {

                renderTo: Ext.getBody(),

                width: 700,

                height: 400,

                layout: 'column',

                items: [

                                {

                                    xtype: 'panel',

                                    title: 'Panel 1',

                                    columnWidth: 0.4,

                                    height: 400,

                                },

                                {

                                    xtype: 'panel',

                                    title: 'Panel 2',

                                    columnWidth: 0.6,

                                    layout: 'center',

                                    height: 400,

                                    items: [

                                        {

                                            xtype: 'button',

                                            text: 'Click Me'

                                        }

                                    ]

                                 },

                                {

                                    xtype: 'panel',

                                    title: 'Panel 3',

                                    width: 150,

                                    height: 400,

                                }

                            ]

            });                                            //定义3个panel，panel2内嵌一个button
```


12.updateLayout
```
    Ext.container.Container 里面一个方法，作用是可以根据布局规则使子组件复位。
```


13.suspendLayout（暂停/延缓布局，有时添加或删除子组件时使用）

            •	 absolute

            •	 accordion

            •	 anchor

            •	 border

            •	 card

            •	 center

            •	 column

            •	 fit

            •	 hbox

            •	 table

            •	 vbox



14.The absolute layout（绝对布局）
```
            Ext.create('Ext.panel.Panel', {

                    renderTo: Ext.getBody(),

                    width: 700,

                    height: 400,

                    layout: 'absolute',

                    items: [

                                    {

                                            xtype: 'panel',

                                            title: 'Panel 1',

                                            x: 12,

                                            y: 20,

                                            height: 250,

                                    },

                                    {

                                            xtype: 'panel',

                                            title: 'Panel 2',

                                            x: 200,

                                            y: 150,

                                            height: 200,

                                    },

                                    {

                                            xtype: 'panel',

                                            title: 'Panel 3',

                                            x: 400,

                                            y: 250,

                                            width: 150,

                                            height: 100,

                                    }

                    ]

            });
```


15.The accordion layout    （折叠布局）

    同一时间展示一个子组件
```
    Ext.create('Ext.panel.Panel', {

            renderTo: Ext.getBody(),

            width: 700,

            height: 400,

            layout: 'accordion',

            items: 

            [

                    {

                            title: 'Item 1',

                            html: 'Lorem ipsum dolor sit amet, cons'

                    },

                    {

                            title: 'Item 2',

                            html: 'some content here'

                    },

                    {

                            title: 'Item 3',

                            html: 'empty'

                    }

            ]

    });
```


16.The anchor layout    （锚布局）（我并没有看到变化啊）

    可以让你指定调整容器内相关的子组件的大小，其他组件跟随锚组件变动
```
    Ext.create('Ext.panel.Panel', {

            renderTo: Ext.getBody(),

            width: 700,

            height: 400,

            layout: 'anchor',

            items: 

            [

                    {

                            title: 'Item 1',

                            html: 'Item 1',

                            anchor: '50%'

                    },

                    {

                            title: 'Item 2',

                            html: 'Item 2',

                            anchor: '-20 -200'

                    },

                    {

                            title: 'Item 3',

                            html: 'Item 3',

                            anchor: '-200'

                    }

            ]

    });
```


17.The border layout    （边界布局）

    允许你指定子组件的位置，如：center, north, south, west, and east，使用时必须有一个组件指定为center
```
    Ext.create('Ext.panel.Panel', {

            renderTo: Ext.getBody(),

            width: 700,

            height: 400,

            layout: 'border',

            items: 

            [

                    {

                            title: 'Item 1',

                            html: 'Item 1',

                            region: 'center'

                    },

                    {

                            title: 'Item 2',

                            html: 'Item 2',

                            region: 'east',

                            width: 200

                    },

                    {

                            title: 'Item 3',

                            html: 'Item 3',

                            region: 'south',

                            height: 100

                    }

            ]

    });
```


18.The card layout    （卡片布局）

    只有一个子组件可见，几乎填充了整个容器，主要用在想到或标签。  
```
    Ext.create('Ext.panel.Panel', {

            renderTo: Ext.getBody(),

            width: 700,

            height: 400,

            layout: 'card',

            defaultListenerScope: true,

            bbar: 

            [    '->',

                    {

                            itemId: 'btn-prev',

                            text: 'Previous',

                            handler: 'showPrevious',

                            disabled: true

                    },

                    {

                            itemId: 'btn-next',

                            text: 'Next',

                            handler: 'showNext'

                    }

            ],

            items: 

            [

                    {

                            index: 0,

                            title: 'Item 1',

                            html: 'Item 1'

                    },

                    {

                            index: 1,

                            title: 'Item 2',

                            html: 'Item 2'

                    },

                    {

                            index:2,

                            title: 'Item 3',

                            html: 'Item 3'

                    }

            ],

                    showNext: function () {

                    this.navigate(1);

            },

                    showPrevious: function () {

                    this.navigate(-1);

            },

                    navigate: function (incr) {

                    var layout = this.getLayout();

                    var index = layout.activeItem.index + incr;

                    layout.setActiveItem(index);

                    this.down('#btn-prev').setDisabled(index===0);

                    this.down('#btn-next').setDisabled(index===2);

              }

       });
```
            

19.The center layout    （中心布局）

    把子组件放在容器的中心



20.The column layout    （列布局）

    将容器拆分成指定大小的列，并把组件放在其中



21.The fit Layout    （合适布局）
```
        Ext.create('Ext.panel.Panel', {

                    renderTo: Ext.getBody(),

                    width: 700,

                    height: 400,

                    layout: 'fit',

                    bodyPadding: 20,

                    items: 

                    [

                            {

                                    title: 'Item 1',

                                    html: 'Fills the container',

                            }

                    ]

        });
```


22.The hbox layout

    类似列布局，但是允许拉伸列的高度
```
    Ext.create('Ext.panel.Panel', {

                    renderTo: Ext.getBody(),

                    width: 700,

                    height: 400,

                    layout:

                            {

                                    type: 'hbox',

                                    pack: 'start',

                                    align: 'stretch',

                            },

                    items: 

                    [

                            {

                                    title: 'Item 1',

                                    html: 'Item 1',

                                    flex: 1

                            },

                            {

                                    title: 'Item 2',

                                    html: 'Item 2',

                                    width: 100

                            },

                            {

                                    title: 'Item 3',

                                    html: 'Item 3',

                                    flex: 2

                        }

                    ]

    });
```


23.The table layout    （表单布局）

    可以用rowspan和colspan指定列和行数，创建复杂的布局
```
    Ext.create('Ext.panel.Panel', {

                    renderTo: Ext.getBody(),

                    width: 700,

                    height: 400,

                    layout:

                    {

                            type: 'table',

                            columns: 3,

                            tableAttrs: {

                            style: {

                                    width: '100%'

                                }

                            }

                     },

                    items: 

                    [

                            {

                                    rowspan: 3,

                                    title: 'Item 1',

                                    html: 'Item 1'

                            },

                            {

                                    title: 'Item 2',

                                    html: 'Item 2'

                            },

                            {

                                    title: 'Item 3',

                                    rowspan: 2,

                                    html: 'Item 3'

                            },

                            {

                                    title: 'Item 4',

                                    html: 'Item 4'

                            },

                            {

                                    title: 'Item 5',

                                    html: 'Item 5'

                            },

                            {

                                    title: 'Item 6',

                                    html: 'Item 6'

                            },

                            {

                                    title: 'Item 7',

                                    html: 'Item 7'

                            }

                    ]

    });
```


24.The VBox layout

    一个接一个地垂直向下放置子组件
```
    Ext.create('Ext.panel.Panel', {

                    renderTo: Ext.getBody(),

                    width: 700,

                    height: 400,

                    layout:

                    {

                            type: 'vbox',

                            pack: 'start',

                            align: 'stretch',

                    },

                    items: 

                    [

                            {

                                    title: 'Item 1',

                                    html: 'Item 1',

                                    flex: 1

                            },

                            {

                                    title: 'Item 2',

                                    html: 'Item 2',

                                    height: 100

                            },

                            {

                                    title: 'Item 3',

                                    html: 'Item 3',

                                    flex: 2

                            }

                    ]

    });

```
