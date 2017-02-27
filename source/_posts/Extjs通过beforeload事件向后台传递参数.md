---
title: Extjs通过beforeload事件向后台传递参数
date: 2017-02-20 15:59:12
tags: 
categories: Extjs
---
```
listeners : {
       beforeload : function (store, options,eOpts) {
              var process = Ext.getCmp(store.rowId+"process").getValue();
              var new_params = { processNameParam: process  };
              Ext.apply( store.proxy.extraParams , new_params ) ;
       }
}
```

process为获取前台的值，processNameParam为传到后台后的值的变量。
如通过struts获取：   private String processNameParam; （setter和getter-OGNL）
后台打印：
```
System.out.println(processNameParam);
```

