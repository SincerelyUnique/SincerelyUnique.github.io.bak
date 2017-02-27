---
title: 'SenchaCmd学习笔记（9）:Working with Grids(网格)'
date: 2017-02-22 14:00:23
tags: sencha
categories: Extjs
---
0.概述

•	 The basic grid
•	 Sorting
•	 Renderer
•	 Filtering
•	 Pagination
•	 Cell editing
•	 Row editing
•	 Grouping
•	 The pivot grid
•	 Company Directory — a sample project
分页、排序、过滤、搜索、排编辑单元格编辑、分组、对接工具栏、缓冲滚动，列大小和隐藏，分组头，多种类，行扩展，等等。
<!--more-->


1.The basic grid

        classic：Ext.grid.Panel

        modern：Ext.grid.Grid

        1）首先通过在线硬编码创建一个简单的store和model        

                    Ext.define('Product', {

                                    extend: 'Ext.data.Model',

                                    fields: [ 'id', 'productname', 'desc', 'price' ]

                                    });

                                    var productStore = Ext.create('Ext.data.Store', {

                                                        model: 'Product',

                                    data: [{

                                            id: 'P1',

                                            productname: 'Ice Pop Maker',

                                            desc: 'Create fun and healthy treats anytime',

                                            price: '$16.33'

                                    }, {

                                            id: 'P2',

                                            productname: 'Stainless Steel Food Jar',

                                            desc: 'Thermos double wall vacuum insulated food jar',

                                            price: '$14.87'

                                    },{

                                            id: 'P3',

                                            productname: 'Shower Caddy',

                                            desc: 'Non-slip grip keeps your caddy in place',

                                            price: '$17.99'

                                    }, {

                                            id: 'P4',

                                            productname: 'VoIP Phone Adapter',

                                            desc: 'Works with Up to Four VoIP Services Across One Phone

                                            Port',

                                            price: '$47.50'

                                    }

                                    ]

                    });

        2）创建网格grid，使用store

                    Ext.create('Ext.grid.Panel', {

                                    renderTo: Ext.getBody(),

                                    store: productStore,

                                    width: 600,

                                    title: 'Products',

                                    columns: [

                                    {

                                            text: 'Id',

                                            dataIndex: 'id',

                                            hidden: true

                                    },

                                    {

                                            text: 'Name',

                                            width:150,

                                            dataIndex: 'productname'

                                    },

                                    {

                                            text: 'Description',

                                            dataIndex: 'desc',

                                            sortable: false,

                                            flex: 1

                                    },

                                    {

                                            text: 'price',

                                            width: 100,

                                            dataIndex: 'price'

                                    }

                                    ]

                    });

        3）Sorting    （排序）

        sortable：false     禁用排序（客户端）

        remoteSort：false    禁用排序（服务器端）

        4）Renderer    （渲染器）      

        让我们用渲染器以“前缀”为“价格”列的符号

                    Ext.create('Ext.grid.Panel', {

                                    renderTo: Ext.getBody(),

                                    store: productStore,

                                    width: 600,

                                    title: 'Products',

                                    columns: [{

                                                        text: 'Id',

                                                        dataIndex: 'id',

                                                        hidden: true

                                    }, {                                  

                                                        text: 'Name',

                                                        width:150,

                                                        dataIndex: 'productname'

                                    }, {

                                                        text: 'Description',

                                                        dataIndex: 'desc',

                                                        sortable: false,

                                                        flex: 1

                                    }, {

                                                        text: 'price',

                                                        width: 100,

                                                        dataIndex: 'price',

                                                        renderer: function(value) {

                                                                        return Ext.String.format('${0}', value);

                                                                }

                                    }

                                    ]

                    });

        5）Filtering    （筛选）

        为grid添加筛选很容易，只是简单的添加：Ext.grid.filters.Filters (ptype: gridfilters )，如：

                    Ext.create('Ext.grid.Panel', {

                                    renderTo: Ext.getBody(),

                                    store: productStore,

                                    plugins: 'gridfilters',

                                    width: 600,

                                    title: 'Products',

                                    columns: [

                                    {

                                                    text: 'Id',

                                                    dataIndex: 'id',

                                                    hidden: true

                                    },

                                    {

                                                    text: 'Name',

                                                    width:150,

                                                    dataIndex: 'productname',

                                                    filter:'string'

                                    },

                                    {

                                                    text: 'Description',

                                                    dataIndex: 'desc',

                                                    sortable: false,

                                                    flex: 1,

                                                    filter: {

                                                                    type: 'string',

                                                                    itemDefaults: {

                                                                                    emptyText: 'Search for...' }

                                                    }

                                    },

                                    {

                                                    text: 'price',

                                                    width: 100,

                                                    dataIndex: 'price'

                                    }

                                    ]

                    });    

        6）Pagination    （分页）

        使用：Ext.toolbar.Paging ( xtype: pagingtoolbar )

        使用：dockedItems    （Ext.panel.Panel的属性）

                    Ext.create('Ext.grid.Panel', {

                                    renderTo: Ext.getBody(),

                                    store: productStore,

                                    width: 600,

                                    title: 'Products',

                                    columns: [

                                                    { text: 'Id', dataIndex: 'id', hidden: true },

                                                    { text: 'Name', width:150, dataIndex: 'productname'},

                                                    { text: 'Description', dataIndex: 'desc', sortable: false, flex:

                                                    1},

                                                    { text: 'price', width: 100, dataIndex: 'price' }

                                    ],

                                    dockedItems: [{

                                                    xtype: 'pagingtoolbar',

                                                    store: productStore,

                                                    dock: 'bottom',

                                                    displayInfo: true

                                    }]

                    });

        7）store从json文件里面读取数据

                var productStore = Ext.create('Ext.data.Store', {

                                            model: 'Product',

                                            pageSize: 10,      //给服务器发送请求，限制记录的数量，

                                                                                http://localhost:8000/data.json?page=1&start=0&limit=10

                                            autoLoad: true,

                                            proxy: {

                                                            type: 'ajax',

                                                            url: 'data.json',

                                                            reader: {

                                                                            type: 'json',

                                                                            rootProperty: 'data',        //告诉在json文件的哪里找数据

                                                                            totalProperty: 'total'        //让store知道去哪里读取总的数据和记录

                                                                        }

                                            }

                });

        8）Cell editing    （单元格编辑）

        使用：Ext.grid.plugin.CellEditing

        添加一个基本的文本域个一个列

                    Ext.create('Ext.grid.Panel', {

                                    renderTo: Ext.getBody(),

                                    store: productStore,

                                    plugins: ['cellediting','gridfilters'],

                                    width: 600,

                                    title: 'Products',

                                    columns: [

                                    {

                                            text: 'Id',

                                            dataIndex: 'id',

                                            hidden: true

                                    },

                                    {

                                            text: 'Name',

                                            width:150,

                                            dataIndex: 'productname',

                                            filter:'string',

                                            editor: {

                                                    allowBlank: false,

                                                    type: 'string'

                                            }

                                    },

                                    {

                                            text: 'Description',

                                            dataIndex: 'desc',

                                            sortable: false,

                                            flex: 1

                                    },

                                    {

                                            text: 'Price',

                                            width: 100,

                                            dataIndex: 'price'

                                    },

                                    {

                                            text: 'Type',

                                            width: 100,

                                            dataIndex: 'type',

                                            editor: new Ext.form.field.ComboBox({

                                                    typeAhead: true,

                                                    triggerAction: 'all',

                                                    store: [

                                                            ['Bath','Bath'],

                                                            ['Kitchen','Kitchen'],

                                                            ['Electronic','Electronic'],

                                                            ['Food', 'Food'],

                                                            ['Computer', 'Computer']

                                                    ]

                                               })

                                    //set the editor for the Type column. Here, the store has the hardcoded inline data, but it can be configured to

                                    //talk to the server to get the data from the server

                                    } ]

                    });    

        以上editor不会保存数据到server，需要设置：autosync  为true（对于任何CRUD操作都会发送请求到server）

        9）Row editing    （行编辑）

       使用：Ext.grid.plugin.RowEditing

        10）Grouping    （分组）

        使用：用store里面的groupField指定分组的field，在grid里面设置Ext.grid.feature.Feature

                    var productStore = Ext.create('Ext.data.Store', {

                                                model: 'Product',

                                                pageSize: 10,

                                                autoLoad: true,

                                                proxy: {

                                                            type: 'ajax',

                                                            url: 'data.json',

                                                            reader: {

                                                                        type: 'json',

                                                                        rootProperty: 'data',

                                                                        totalProperty: 'total'

                                                                        }

                                                },

                                                groupField: 'type'

                                         });

                                                Ext.create('Ext.grid.Panel', {

                                                                renderTo: Ext.getBody(),

                                                                store: productStore,

                                                                width: 600,

                                                                title: 'Products',

                                                                features: [{

                                                                                id: 'group',

                                                                                ftype: 'grouping',

                                                                                groupHeaderTpl : '{name}',

                                                                                hideGroupedHeader: true,

                                                                                enableGroupingMenu: false

                                                                }],

                                                                columns: [{

                                                                                        text: 'Id',

                                                                                        dataIndex: 'id',

                                                                                        hidden: true

                                                                                },{

                                                                                        text: 'Name',

                                                                                        width:150,

                                                                                        dataIndex: 'productname'

                                                                                },{

                                                                                        text: 'Description',

                                                                                        dataIndex: 'desc',

                                                                                        sortable: false,

                                                                                        flex: 1,

                                                                                        groupable:false

                                                                                },{

                                                                                        text: 'Price',

                                                                                        width: 100,

                                                                                        dataIndex: 'price'

                                                                                },{

                                                                                        text: 'Type',

                                                                                        width: 100,

                                                                                        dataIndex: 'type'

                                                                            }

                                                                            ]

                                                                });

                                                }

                    });    

                禁用所有分组：enableGroupingMenu=false

                禁用某个列分组：groupable=false

        11）The pivot grid

                让您重新整理和汇总选定的列和行的数据，以获得所需的报告

                需要提供两个重要的东西：axis （指定行和列的定位） and aggregates （分组计算）


                                            leftAxis: [{

                                                            width: 80,

                                                            dataIndex: 'employee',

                                                            header: 'Employee'

                                            }]

                                            topAxis: [{

                                                            dataIndex: 'cat',

                                                            header: 'Category',

                                                            direction: 'ASC'

                                            }]

                  在 axis, 也可以指定sortable, sort direction, filter, and so on.

                                            aggregate: [{

                                                            measure: 'amount',

                                                            header: 'Expense',

                                                            aggregator: 'sum',

                                                            align: 'right',

                                                            width: 85,

                                                            renderer: Ext.util.Format.numberRenderer('0,000.00')

                                            }]    

                    在pivot grid，也可以指定renderer渲染自定义格式内的数据


                                            renderer: function(value, meta, record) {

                                                            return Ext.util.Format.number(value, '0,000.00');

                                            }

                    创建一个pivot grid在store里面应用


                                    var store = new Ext.data.JsonStore({

                                                        proxy: {

                                                                        type: 'ajax',

                                                                        url: 'expense.json',

                                                                        reader: {

                                                                        type: 'json',

                                                                        rootProperty: 'rows'

                                                                        }

                                                        },

                                                        autoLoad: true,

                                                        fields: [

                                                                    {name: 'id',

                                                                    type: 'int'},

                                                                    {name: 'employee',

                                                                    type: 'string'},

                                                                    {name: 'amount',

                                                                    type: 'int'},

                                                                    {name: 'date',

                                                                    type: 'date', dateFormat: 'd/m/Y'},

                                                                    {name: 'cat',

                                                                    type: 'string'},

                                                        {

                                                                    name: 'year',

                                                                    convert: function(v, record){

                                                                    return Ext.Date.format(record.get('date'), "Y");

                                                        }

                                                        }

                                                        ]

                                    });    

2.案例：见附件


                












