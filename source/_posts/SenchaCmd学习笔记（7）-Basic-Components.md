---
title: 'SenchaCmd学习笔记（7）:Basic Components'
date: 2017-02-22 13:55:40
tags: sencha
categories: Extjs
---
•Getting familiar with basic components – buttons, text field, date picker,and so on
•The form field validation
•Menus and toolbars
•A customer feedback form design
•Calculator – a sample projec
<!--more-->


1.Ext.Button创建一个button 

        1）
```
        Ext.create('Ext.Button', {

                        text: 'My Button',

                        renderTo: Ext.getBody(),

                        handler: function() {

                        alert('click');

﻿                        }

        });
```
        2）
```
        Ext.application({

                        name : 'Fiddle',

                        launch : function() {

                                Ext.create('Ext.Button', {

                                        text: 'My Button',

                                        renderTo: Ext.getBody(),

                                        handler: function() {

                                                alert('click');

                                        }

                                });

                         }

        });
```
        3）使用Listener
```
        Ext.create('Ext.Button', {

                        text: 'My Button',

                        renderTo: Ext.getBody(),

                        listeners: {

                                        click: {

                                                fn: function(){

                                                        //Handle click event

                                                        alert('click');

                                                    }

                                         },

                                        mouseout: {

                                                fn: function(){

                                                        //Handle double click event

                                                        alert('Mouse out');

                                                }

                                        }

                        }

        });
```
        4）创建一个link的butto
```
        Ext.create('Ext.Button', {

                                renderTo: Ext.getBody(),

                                text: 'Link Button',

                                href: 'http://www.sencha.com/'

                        });
```
        5）可以用menu属性制作一个menu button
```
        Ext.create('Ext.Button', {

                        text: 'My Button',

                        renderTo: Ext.getBody(),

                        menu: 

                        [

                                {

                                        text: 'Item 1'

                                }, 

                                {

                                        text: 'Item 2'

                                }, 

                                {

                                        text: 'Item 3'

                                }

                        ]

            });
```
        6）还有些其他属性：bind , cls , disabled , html , tooltip ,tpl , and so on



2.Ext.MessageBox

        1）继承：Ext.window.MessageBox，是一个单例实例，可以用于输出，获得确认，输入提示等

        简单输出：
```
                Ext.Msg.alert('Info', 'Document saved!');
```
        演示消息确认，可选“是”或“否”       
```
                Ext.Msg.confirm('Confirm', 'Are you want to cancel the updates?',

                                        function(button){

                                                if('yes'==button) {

                                                        Ext.Msg.alert("a","b");

                                                }

                                                else {

                                                        Ext.Msg.alert("c","d");

                                                }

                                        }

                    );
```
        当然也可以用另一种方式             
```
                Ext.MessageBox.show({

                                                title:'Save Changes?',

                                                msg: 'Do you want to save the file?',

                                                buttons: Ext.MessageBox.YESNO,

                                                fn: function(button){

                                                                            if('yes'==button)

                                                                                    {

                                                                                    }

                                                                            else if('no'==button)

                                                                                    {

                                                                                    }

                                                                            } ,

                                                icon: Ext.MessageBox.QUESTION

                        });
```




3.Ext.form.Panel    （表单）

        1）默认布局：锚布局

        2）fields：有一个便利的配置：fieldDefaults  （给所有fields指定默认配置的值）        

                        Ext.form.field.Checkbox

                        Ext.form.field.ComboBox

                        Ext.form.field.Date

                        Ext.form.field.File

                        Ext.form.field.Hidden

                        Ext.form.field.HtmlEditor

                        Ext.form.field.Number

                        Ext.form.field.Radio

                        Ext.form.field.Text

                        Ext.form.field.TextArea

                        Ext.form.field.Time


4.Ext.form.field.Text    （一个最基础的文本域，有一个提供validation的属性：vtype）

        如将email设为验证的属性
```
        Ext.create('Ext.form.field.Text', {

                                    renderTo: Ext.getBody(),

                                    name: 'email',

                                    fieldLabel: 'Email',

                                    allowBlank: false,        （输入为空报错）

                                    vtype: 'email'

                        });
```


5.Ext.form.field.Number    （继承自：spinner field， spinner field继承自：text field）

        用于处理数值 
```
        Ext.create('Ext.form.field.Number', {

                            renderTo: Ext.getBody(),

                            name: 'Count',

                            fieldLabel: 'Count',

                            value: 0,

                            maxValue: 10,

                            minValue: 0

                   });
```


6.Ext.form.field.ComboBox

        有一个配置：store

        datastore提供数据供下拉菜单使用

        另一个配置：queryMode    （可以本地或远程，如果是远程，datastore加载运行时需要发出请求给远程服务器）

        1）提供一个月份的下拉菜单  
```
            var months = Ext.create('Ext.data.Store', {

                                                fields: ['abbr', 'name'],

                                                data: 

                                                [

                                                                {"abbr":"JAN", "name":"January"},

                                                                {"abbr":"FEB", "name":"February"},

                                                                {"abbr":"MAR", "name":"March"},

                                                                {"abbr":"APR", "name":"April"},

                                                                {"abbr":"MAY", "name":"May"},

                                                                {"abbr":"JUN", "name":"June"},

                                                                {"abbr":"JUL", "name":"July"},

                                                                {"abbr":"AUG", "name":"August"},

                                                                {"abbr":"SEP", "name":"September"},

                                                                {"abbr":"OCT", "name":"October"},

                                                                {"abbr":"NOV", "name":"November"},

                                                                {"abbr":"DEC", "name":"December"}

                                                ]

                                         });

                                        Ext.create('Ext.form.ComboBox', {

                                                                fieldLabel: 'Choose Month',

                                                                store: months,

                                                                queryMode: 'local',

                                                                displayField: 'name',

                                                                valueField: 'abbr',

                                                                renderTo: Ext.getBody()

                                        });
```


7.Ext.form.field.HtmlEditor    （html编辑） 
```
            Ext.create('Ext.form.HtmlEditor', {

                            width: 800,

                            height: 200,

                            renderTo: Ext.getBody()

            });
```


8.validation    （验证：allowBlank , minLength , and maxLength等，使用：Regex正则表达式）

        1）Events in the form panel     

            •	 beforeaction : This event will be fired before executing any action    执行任何操作都验证

            •	 actionfailed : This event will be fired when an action fails    操作失败验证

            •	 actioncomplete : This event will be fired after an action is completed    完成一个操作进行验证

            •	 validitychange : This event will be fired when the validity of the entire form changes            全部表单变更时验证

            •	 dirtychange : This event will be fired when the dirty state of the form changes        表单变更发现脏数据状态验证



9.Form field containers    （表单面板容器）
```
        1）Ext.form.CheckboxGroup    （复选框：给复选框域分组）

                Ext.create('Ext.form.CheckboxGroup', {

                                renderTo: Ext.getBody(),

                                fieldLabel: 'Skills ',

                                vertical: true,

                                columns: 1,

                                items: 

                                [

                                        { boxLabel: 'C++', name: 'rb', inputValue: '1' },

                                        { boxLabel: '.Net Framework', name: 'rb', inputValue: '2', checked: true },

                                        { boxLabel: 'C#', name: 'rb', inputValue: '3' },

                                        { boxLabel: 'SQL Server', name: 'rb', inputValue: '4' },

                                ]

                });
```
        2）Ext.form.FieldContainer    （将相关的field分组，并附给他一个相应标签）
```
                Ext.create('Ext.form.FieldContainer', {

                                renderTo: Ext.getBody(),

                                fieldLabel: 'Name',

                                layout: 'hbox',

                                combineErrors: true,

                                defaultType: 'textfield',

                                defaults: 

                                {

                                        hideLabel: 'true'

                                },

                                items: 

                                [

                                        {

                                                name: 'firstName',

                                                fieldLabel: 'First Name',

                                                flex: 2,

                                                emptyText: 'First',

                                                allowBlank: false

                                        }, 

                                        {

                                                name: 'lastName',

                                                fieldLabel: 'Last Name',

                                                flex: 3,

                                                margin: '0 0 0 6',

                                                emptyText: 'Last',

                                                allowBlank: false

                                        }

                                ]

                });
```
        3）Ext.form.RadioGroup    （单选框：给单选框分组）   
```
                Ext.create('Ext.form.RadioGroup', {

                                renderTo: Ext.getBody(),

                                fieldLabel: 'Sex ',

                                vertical: true,

                                columns: 1,

                                items: 

                                [

                                        { boxLabel: 'Male', name: 'rb', inputValue: '1' },

                                        { boxLabel: 'Female', name: 'rb', inputValue: '2' }

                                ]

                   });
```
        4）Submitting a form    （提交表单：submit method和getForm method和sValid method）
```
                var form = this.up('form').getForm();

                if (form.isValid()) {

                        form.submit({

                                url: 'someurl',

                                success: function () {

                                        },

                                failure: function () {

                        }

                });

                } else {

                        Ext.Msg.alert('Error', 'Fix the errors in the form')

                }
```


10.Menus and toolbar    （菜单和工具栏）

        1）使用：Ext.toolbar.Toolbar

        2）默认：任何子组件在Ext.toolbar.Toolbar里面都是一个button

        3）自行可添加组件：a textfield, a number field, an icon, a dropdown, and so on                                 

                                Ext.toolbar.Spacer , 

                                Ext.toolbar.Separator ,

                                Ext.toolbar.Fill

            缩写：    ' ' (space),     ' | ' (pipe),     and     ' -> '(arrow)    
```
            Ext.create('Ext.toolbar.Toolbar', {

                            renderTo: Ext.getBody(),

                            width: 800,

                            items: [

                                        {

                                                text: 'My Button'

                                        },

                                    {

                                            text: 'My Button',

                                            menu: 

                                    [

                                            {

                                                    text: 'Item 1'

                                            },

                                            {

                                                    text: 'Item 2'

                                            }, 

                                            {

                                                    text: 'Item 3'

                                            }

                                    ]

                                    },

                                    {

                                            text: 'Menu with divider',

                                            tooltip: {

                                            text: 'Tooltip info',

                                            title: 'Tip Title'

                                    },

                            menu: {

                            items: [{

                                            text: 'Task 1',

                                            // handler:onItemClick

                                    }, '-', {

                                            text: 'Task 2',

                                            // handler:onItemClick

                                    }, {

                                            text: 'Task 3',

                                            // handler:onItemClick

                            }]

                            }

                            },

                            '->',

                            {

                                    xtype: 'textfield',

                                    name: 'field1',

                                    emptyText: 'search web site'

                            },

                            '-',

                            'Some Info',

                            {

                                    xtype: 'tbspacer'

                            },

                            {

                                    name: 'Count',

                                    xtype: 'numberfield',

                                    value: 0,

                                    maxValue: 10,

                                    minValue: 0,

                                    width: 60

                            }

                            ]

            });
```
            
11.The customer feedback form design    （反馈表：见附件）

    

12.Calculator    （计算器：见附件）



13.MVC and MVVM    （以计算器为例）

        1）

        Model：数据层，包含数据验证，业务逻辑和持久化

        View：用户接口，有button，form，messagebox等组件

        Controller：处理任何与View相关的业务逻辑，视图事件的处理等

                    1）ViewController：指定一个特殊的View，可以在app范围内交叉使用Controller，随View销毁而销毁

                    2）Controller：

        2）View model：更新View数据，封装View端的业务逻辑，绑定数据，与传统model不同的是他指定特殊的View，文件：main.js

        3）Controller：处理button触发事件，处理操作和操作数，用了一个model：main，文件：MainController.js

        4）ViewModel：只有一个属性display，用于绑定计算器显示的数值，文件：MainViewModel.js



14.下节预告：

In the next chapter, you'll learn about data packages, such as data stores, model,proxies, and so on, which will be useful to handle data.
















