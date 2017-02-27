---
title: 'SenchaCmd学习笔记（8）:Data Packages'
date: 2017-02-22 13:59:00
tags: sencha
categories: Extjs
---
0.概述：
探索可用的工具处理数据以及客户端与服务器之间的交互，案例为RESTful。topic：

•Models

•Schema

•Stores

•Proxies

•Filtering and sorting

•To do — a RESTful sample project
<!--more-->


1.Model    （继承自：Ext.data.Model）

        定义了：fields, field types, validation, associations, and proxies.optional.        （如果未指定类型，默认：auto）

                        （通常代理实在data store里指定，但在model里指定一样很好）

        1）Field    （Ext.data.field.Field）

        用于：给model添加属性properties，如添加：

                                                                            •	 auto

                                                                            •	 boolean

                                                                            •	 date

                                                                            •	 int

                                                                            •	 number

                                                                            •	 string

        2）The data conversion    （数据转换，auto类型的field不会发生转换，如果不想转换可以制定属性为：null）

        3）Validators    （验证器）

        model支持数据验证，主要验证器有：        

                                                                •	 presence: This makes sure that a value is present for a particular field

                                                                •	 format: This format can be validated using a regular expression

                                                                •	 length: This length validator supports the maximum and minimum

                                                                                length validation

                                                                •	 exclusion and inclusion: You can pass a set of values to these validators to

                                                                                make sure that the value doesn't or does present in the given set of values

        写验证器及验证field：



                Ext.define('Employee', {

                                extend: 'Ext.data.Model',

                                fields: [

                                                { name: 'id', type: 'int', convert: null },

                                                { name: 'firstName', type: 'string' },

                                                { name: 'lastName', type: 'string' },

                                                { name: 'fulltime', type: 'boolean', defaultValue: true,convert: null },

                                                { name: 'gender', type: 'string' },

                                                { name: 'phoneNumber', type: 'string'},

                                ],

                                validators: {

                                firstName: [

                                                { type: 'presence'},

                                                { type: 'length', min: 2 }

                                ],

                                lastName:[

                                                { type: 'presence'},

                                                { type: 'length', min: 2 }

                                ],

                                phoneNumber: {

                                                type: 'format',

                                                matcher: '/^[(+{1})|(00{1})]+([0-9]){7,10}$/'

                                                },

                                gender: {

                                                type: 'inclusion',

                                                list: ['Male', 'Female']

                                                },

                                    }

                });    

        创建一个model验证的实例        

                var newEmployee = Ext.create('Employee', {

                                id : 1,

                                firstName : 'Shiva',

                                lastName : 'Kumar',

                                fulltime : true,

                                gender: 'Male',

                                phoneNumber: '123-456-7890'

                });

        model的setter和getter方法        

                var lastName = newEmployee.get('lastName');

                newEmployee.set('gender','Female');

        4）Relationships    （关系：实体之间的联系）

                    ①One-to-one 关系                    

                                Ext.define('Address', {

                                                extend: 'Ext.data.Model',

                                                fields: [

                                                            'address',

                                                            'city',

                                                            'state',

                                                            'zipcode'

                                                ]

                                });

                                Ext.define('Employee', {

                                                extend: 'Ext.data.Model',

                                                fields: [{

                                                            name: 'addressId',

                                                            reference: 'Address'

                                                }]

                                });    

                    ②One-to-many 一对多关系

                                Ext.define('Department', {

                                                extend: 'Ext.data.Model',

                                                fields: [

                                                            { name: 'employeeId', reference: 'Employee' }

                                                ]

                                });

                                Ext.define('Division', {

                                                extend: 'Ext.data.Model',

                                                fields: [

                                                            { name: 'departmentId', reference: 'Department' }

                                                ]

                                });

                    ③Many-to-many 多对多关系

                                Ext.define('Employee', {

                                                extend: 'Ext.data.Model',

                                                fields: [

                                                            { name: 'empId', type: 'int', convert: null },

                                                            { name: 'firstName', type: 'string' },

                                                            { name: 'lastName', type: 'string' },

                                                ],

                                                manyToMany: 'Project'

                                });

                                Ext.define('Project', {

                                                extend: 'Ext.data.Model',

                                                fields: [

                                                            'name'

                                                ],

                                                manyToMany: 'Employee'

                                });

                    ④Custom field types 自选关系类型

                                Ext.define('App.field.Email', {

                                                extend: 'Ext.data.field.Field',

                                                alias: 'data.field.email',

                                                validators: {

                                                                type: 'format',

                                                                matcher: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,

                                                                message: 'Wrong Email Format'

                                                }

                                });



2.Store    （model实例的集合，proxies用来获得数据，继承：Ext.data.Store）

        定义了集合操作，类似与排序，筛选等

        当定义了一个store时，需要指定一个proxy（用来配置store怎么读写数据）

        1）用RESTful API请求加载数据（json格式）            

                    var myStore = Ext.create('Ext.data.Store', {

                                            model: 'Employee',

                                            storeId: 'mystore',

                                            proxy: {

                                                            type: 'rest',

                                                            url: '/employee',

                                                            reader: {

                                                                            type: 'json',

                                                                            rootProperty: 'data'

                                                            }

                                            },

                                            autoLoad: true,

                                            autoSync: true

                    });

        2）a sync call    （同步呼叫）

                store.sync({

                                callback: function (batch, options) {

                                                                                //Do something

                                },

                                success: function (batch, options) {

                                                                                //Do something

                                },

                                failure: function (batch, options) {

                                                                                //Do something

                                },

                                scope: this

                });

        3）The inline data store

        如果不想绑定store到server或者外部存储（浏览器本地存储），但是想要对一些静态的数据使用store的形式



                Ext.create('Ext.data.Store', {

                                model: 'Employee',

                                data: [

                                {

                                                firstName: 'Shiva',

                                                lastName: 'Kumar',

                                                gender: 'Male',

                                                fulltime: true,

                                                phoneNumber: '123-456-7890'

                                },

                                {

                                                firstName: 'Vishwa',

                                                lastName: 'Anand',

                                                gender: 'Male',

                                                fulltime: true,

                                                phoneNumber: '123-456-7890'

                                }

                                ]

                });

        4）Filtering and sorting    （筛选和排序，本地或远程）

        本地排序：



                        var myStore = Ext.create('Ext.data.Store', {

                                                model: 'Employee',                                         



                                                sorters: [{

                                                                property: 'firstName',

                                                                direction: 'ASC'

                                                }, {

                                                                property: 'fulltime',

                                                                direction: 'DESC'

                                                }],

                                                filters: [{

                                                                property: 'firstName',

                                                                value: /an/

                                                }]

                        });

        远程需要设置：remoteSort 和remoteFilter为true

        5）Accessing the store    （访问store） 

                    ①Accessing the store using StoreManager

                        方法： lookup     （使用storeId）

                                    Ext.create('Ext.data.Store', {

                                                        model: 'Employee',

                                                        storeId: 'mystore',

                                                        proxy: {

                                                                    type: 'rest',

                                                                    url: '/employee',

                                                                    reader: {

                                                                    type: 'json',

                                                                    rootProperty: 'data'

                                                        }

                                                        }

                                    });

                       实现：    Ext.data.StoreManager.lookup('myStore');         （可简写为：Ext.getStore）

                    ②Accessing the store using Ext.app.ViewModel    （ViewController里常用）

                                var myStore = this.getViewModel().getStore('myStore')

        6）Store events    （事件）

            •	 add: This is called when a record is added to the store

            •	 beforeload: This is called before loading the data

            •	 beforesync: This is called before the sync operation

            •	 datachanged: This is called when records are added or removed from the store

            •	 load: This is called when the store reads from a remote data store

            •	 remove: This is called when a record is removed from the store

            •	 update: This is called when a record gets updated

            监听store事件：

                                    Ext.create('Ext.data.Store', {

                                                        model: 'Employee ',

                                                        storeId: 'mystore',

                                                        proxy: {

                                                                        type: 'rest',

                                                                        url: '/employee',

                                                                        reader: {

                                                                        type: 'json',

                                                                        rootProperty: 'data'

                                                        }

                                                        },

                                                        listeners: {

                                                                        load: function (store, records, options) {

                                                                                                //Do something

                                                                        }

                                                        }

                                    });

            如果你想在你的controller里面监听store事件，可以：

                                            init: function() {

                                                                    this.getViewModel().getStore('myStore').on('load',

                                                                    this.onStoreLoad, this);

                                            }

        7）The store in ViewModel

        可以定义store和ViewModel分离或者一起，通常定义一个store在ViewModel里面，如：

                    Ext.define('MyApp.view.employee.EmployeeModel', {

                                                    extend: 'Ext.app.ViewModel',

                                                    alias: 'viewmodel.employee',

                                                    stores: {

                                                    employee: {

                                                    fields: [

                                                                    { name: 'id', type: 'string' },

                                                                    { name: 'firstname', type: 'string' },

                                                                    { name: 'lastname', type: 'string' }

                                                    ],

                                                    autoLoad: false,

                                                    sorters: [{

                                                                    property: 'firstname',

                                                                    direction: 'ASC'

                                                    }],

                                                    proxy: {

                                                                    type: 'rest',

                                                                    url: 'employee',

                                                                    reader: {

                                                                    type: 'json',

                                                                },

                                                    writer: {

                                                                    type: 'json'

                                                                }                                                   

                                                            }

                                                    }

                                          }

                            });

3.Proxies    （代理）                            

        概述：store和model用代理进行加载和存储数据，配置proxies，可以指定怎么读写数据，也可以指定url读取数据，可以告知读者数据格式                        是json还是xml

        种类：client-side proxy and the server-side proxy    （客户端代理和服务器端代理）

        1）The client-side proxy    （客户端代理）

                ①The memory proxy    

                    用于：内存中局部变量数据，

                            var data = {

                            data: [

                                            {

                                                    firstName: 'Shiva',

                                                    lastName: 'Kumar',

                                                    gender: 'Male',

                                                    fulltime: true,

                                                    phoneNumber: '123-456-7890'

                                            },

                                            {

                                                    firstName: 'Vishwa',

                                                    lastName: 'Anand',

                                                    gender: 'Male',

                                                    fulltime: true,

                                                    phoneNumber: '123-456-7890'

                                            },

                            };

                            var myStore = Ext.create('Ext.data.Store', {

                            model: 'Employee',

                            data : data,

                            proxy: {

                                            type: 'memory',

                            reader: {

                                            type: 'json',

                                            rootProperty: 'Employee'

                                        }

                                        }

                            });

                ②The LocalStorage proxy （本地存储代理）

                    用于：访问浏览器本地存储，是一个”键-值对“，支持html5，很多老版本浏览器不支持

                            var myStore = Ext.create('Ext.data.Store', {

                                                model: 'Benefits',

                                                autoLoad: true,

                                                proxy: {

                                                                type: 'localstorage',

                                                                id: 'benefits'

                                                }

                            });

                ③The SessionStorage proxy    

                    用于：访问浏览器会话存储，支持html5，很多老版本浏览器不支持，session过期则destroy。

                            var myStore = Ext.create('Ext.data.Store', {

                                                model: 'Benefits',

                                                autoLoad: true,

                                                proxy: {

                                                                type: 'localstorage',

                                                                id : 'benefits'

                                                }

                            });

        2）The server-side proxy    （服务器端代理）

            •	 Ajax: This is used to send asynchronous requests.

            •	 Direct: This uses Ext.Direct to communicate with the server.            

            •	 JSONP (JSON with padding): This is useful when you need to send a request to another domain. 

                                                            Ajax can be used only to send requests to the same domain.

            •	 REST: This is used to send an Ajax request to the server, using RESTful HTTP verbs, such as GET , POST , PUT , and DELETE                 .例子：

                        var myStore = Ext.create('Ext.data.Store', {

                                                model: 'Products',

                                                proxy: {

                                                                type: 'jsonp',

                                                                url : 'http://domain.com/products',

                                                                callbackKey: 'productsCallback'

                                                }

                        });

4.To do – a RESTful sample project     （做一个）

        见附件，配置go语言，未实现


