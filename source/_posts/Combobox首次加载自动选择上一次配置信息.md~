---
title: Combobox首次加载自动选择上一次配置信息
date: 2017-02-20 15:56:19
tags: combobox
categories: Extjs
---
如果只是从数据库读取并setValue进去，则只有displayFiled,而valueField没有，这里使用select
<!--more-->
```
load: function(records, options, success) {
    var processStr = Ext.getCmp(this.rowId + "process").getValue();
    var pageWorkstationKey = Ext.getCmp(this.rowId + "workstation").getValue();

    if (processStr != null && processStr != "") {
        if (responseObj && responseObj[this.rowId]) {
            var responseWorkstationKey = responseObj[this.rowId].workstation;
            var pnValue = responseObj[this.rowId].partnumber;
            //这里开始
            if (options) {
                for (var j = 0; j < options.length; j++) {
                    if (options[j].data.partNumber == pnValue && (pageWorkstationKey == responseWorkstationKey)) {
                        Ext.getCmp(this.rowId + "partnumber").select(options[j]);
                        pnValue = "";
                        break;
                    } else {
                        Ext.getCmp(this.rowId + "partnumber").setValue("");
                    }
                }
            } else {
                Ext.getCmp(this.rowId + "partnumber").setValue("");
            }
            //这里结束
        } else {
            Ext.getCmp(this.rowId + "partnumber").setValue("");
        }
    } else {
        Ext.getCmp(this.rowId + "partnumber").setValue("");
    }
    var workorderStore = Ext.getCmp(this.rowId + "wo").getStore();
    workorderStore.load();
}
```

这一句:
```
Ext.getCmp(this.rowId+"partnumber").select (options[j] );
```
