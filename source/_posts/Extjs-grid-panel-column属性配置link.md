---
title: Extjs-grid-panel-column属性配置link
date: 2017-02-22 10:19:07
tags: 
categories: Extjs
---
公司项目需求，增加一列存放一个icon，点击后定向到刚刚配置好的页面！
<!--more-->
效果图:
![](/images/extjs-grid-panel-column.png)
```
var storeSelect = Ext.create('Ext.data.ArrayStore', {
    fields: ['dashboardType', 'dashboardTitle', 'dashboardName', 'dashboardId'],
    storeId: 'showArrayStore',
    sorters: ['dashboardType', 'dashboardName', 'dashboardTitle'],
    groupField: 'dashboardType',
    pageSize: 14,
    proxy: {
        type: 'ajax',
        url: '<%=rootPath%>/loadDashboardPages.action',
        reader: {
            type: 'json',
            totalProperty: "totalCount",
            root: 'listData'
        }
    },
    listeners: {
        load: function() {
            globalMask.hide();
        }
    }
});
storeSelect.on('beforeload',
function(store, options) {
    globalMask.show();
    var new_params = {
        currentSiteId: <%=themeDisplay.getLayout().getGroupId() % >,
        dashboardType: Ext.getCmp('dashboardTypeQry').getValue(),
        dashboardName: Ext.getCmp('dashboardNameQry').getValue()
    };
    Ext.apply(store.proxy.extraParams, new_params);
});

var selModel = Ext.create('Ext.selection.CheckboxModel', {
    showHeaderCheckbox: false,
    mode: 'SINGLE',
    listeners: {
        selectionchange: function(selectionModel, selected, options) {
            if (selected.length == 0) {
                Ext.getCmp('<portlet:namespace />deleteDashboard').setDisabled(true);
            } else {
                Ext.getCmp('<portlet:namespace />deleteDashboard').setDisabled(false);
            }
            if (selected.length == 1) {
                Ext.getCmp('<portlet:namespace />editDashboard').setDisabled(false);
            } else {
                Ext.getCmp('<portlet:namespace />editDashboard').setDisabled(true);
            }
        }
    }
});

var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
    groupHeaderTpl: '<%=bundle.getString("grouping.catalog.Type")%>: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
});

Ext.grid.PageRowNumberer = Ext.extend(Ext.grid.RowNumberer, {
    renderer: function(value, cellmeta, record, rowIndex, columnIndex, store) {
        return (store.currentPage - 1) * store.pageSize + rowIndex + 1;
    }
});

var grid = Ext.create('Ext.grid.Panel', {
    selModel: selModel,
    collapsible: false,
    iconCls: 'icon-grid',
    frame: true,
    store: storeSelect,
    features: [groupingFeature],
    columns: [Ext.create('Ext.grid.PageRowNumberer', {
        header: ' ',
    }), {
        text: '<%=bundle.getString("grouping.catalog.Type")%>',
        flex: 1,
        sortable: true,
        id: 'typeColumnId',
        dataIndex: 'dashboardType'
    },
    {
        text: '<%=bundle.getString("grouping.catalog.Name")%>',
        flex: 1,
        sortable: true,
        dataIndex: 'dashboardName'
    },
    {
        text: '<%=bundle.getString("grouping.catalog.Title")%>',
        flex: 1,
        sortable: true,
        dataIndex: 'dashboardTitle'
    },
    {
        text: '<%=bundle.getString("grouping.catalog.UrlLink")%>',
        flex: 0.1,
        sortable: true,
        id: 'dashboardUrl',
        dataIndex: 'dashboardName',
        renderer: function(myValue, myDontKnow, myRecord) {
            if (myValue.indexOf(" ") == -1) {

} else {
                myValue = myValue.replace(/ /g, '-');
            }

            var pic = '<%=rootPath%>/images/' + 'go' + '.png';
            return '<a href="' + myValue + '" target="_blank">&nbsp;&nbsp;&nbsp;&nbsp;<img  id="dashboardGridUrl"  src="' + pic + '" /></a>';
        }
    }],
    height: 480,
    width: '100%',
    viewConfig: {
        stripeRows: true
    },
    listeners: {
        select: function(view, selections) {
            Ext.getCmp('<portlet:namespace />editDashboard').setDisabled(false);
            Ext.getCmp('<portlet:namespace />deleteDashboard').setDisabled(false);
        }
    },
    /*  clear current grouping format
				fbar: ['->', {
	            text: 'Clear Grouping',
	            //iconCls: 'icon-clear-group',
	            handler: function() {
	                groupingFeature.disable();
	            }
	        }], */
    bbar: Ext.create('Ext.PagingToolbar', {
        store: storeSelect,
        displayInfo: true,
        displayMsg: 'Displaying {0} -  {1} of {2} ',
        emptyMsg: "No record to display",
        doLoad: function(start) {
            record_start = start;
            var o = {};
            var pn = this.getParams();
            o[pn.start] = start;
            o[pn.limit] = this.pageSize;
            this.store.load({
                params: o
            });
        }
    })
});
```
aaa
