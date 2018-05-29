---
title: Extjs-Viewport写的一个页面
date: 2017-02-22 11:40:27
tags:
categories: Extjs
---
这是一个使用Extjs里Ext.container.Viewport写的一个页面：
<!--more-->
```
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Home Page</title>

<link rel="stylesheet" type="text/css" href="../../extjs/resources/css/ext-all.css" />
<script type="text/javascript" src="../../extjs/bootstrap.js"></script>

<style>
.systemName {
	color: pink;
	font-weight: 300;
	font-size: 1em;
	text-align:center;
	font-family: "黑体";
}
.icon_add{
    background: url(<%=request.getContextPath()%>/images/add.gif) left top no-repeat;
}
.icon_back{
    background: url(<%=request.getContextPath()%>/images/back.png) left top no-repeat;
}
.icon_delete{
    background: url(<%=request.getContextPath()%>/images/delete.gif) left top no-repeat;
}
.icon_edit{
    background: url(<%=request.getContextPath()%>/images/edit.png) left top no-repeat;
}
.icon_enlarge{
    background: url(<%=request.getContextPath()%>/images/enlarge.png) left top no-repeat;
}
.icon_search{
    background: url(<%=request.getContextPath()%>/images/search.png) left top no-repeat;
}
/* .ico_add {background-image:url(../ico/add.png)} */
</style>

<script>Ext.Loader.setConfig({enabled:true}); </script>

<script type="text/javascript">
	var rootPath = "<%=request.getContextPath()%>";
</script>

<script type="text/javascript" src="<%=request.getContextPath()%>/view/main/income.js"></script>

<script>
Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux','../../extjs/examples/ux');
Ext.onReady(function() {
    var cw;

    cw = Ext.create('Ext.Window', {
        xtype: 'window',
        closable: false,
        minimizable: true,
        title: 'Constrained Window',
        height: 200,
        width: 400,
        constrain: true,
        id: 'contentWinId',
        html: 'I am in a Container',
        itemId: 'center-window',
        minimize: function() {
            this.floatParent.down('button#toggleCw').toggle();
        }
    });
    
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var systemName = "<div{display:inline;} class=\"systemName\">"+"Scrum Sprint Management System"+"</div>";
    var defaultUrl = "http://ccfly.cc";
    
    var yScroll = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight; 
    
	Ext.define('myApp.Territory', {
	    extend: 'Ext.data.TreeModel',
	    fields: [{
	        name: 'text',
	        mapping: 'name'
	    }]
	});
	Ext.define('myApp.Country', {
	    extend: 'Ext.data.TreeModel',
	    fields: [{
	        name: 'text',
	        mapping: 'name'
	    }]
	});
	Ext.define('myApp.City', {
	    extend: 'Ext.data.TreeModel',
	    fields: [{
	        name: 'text',
	        mapping: 'name'
	    }]
	});
	
	//begin
	Ext.onReady(function(){
		Ext.create('Ext.container.Viewport', {
		    layout: 'border',
		    items: [{
		        region: 'north',
		        height: 80,
		        border: false,
		        
		        items:[{
		        	id : 'row1',
		        	//bodyStyle:'background: #0D8AA5;padding:5px;',
		        	xtype:'panel',
		        	border: false,
		        	items:[{
				        tbar: [{
				            xtype:'button',
				            text: 'Version',
				            iconCls: 'icon_add'
				        },'-',{
				            xtype:'button',
				            text: 'Assets',
				            iconCls: 'icon_back'
				        },{
				            xtype:'button',
				            text: 'Location',
				            iconCls: 'icon_delete'
				        },{
				            xtype:'splitbutton',
				            text: 'Cut',
				            iconCls: 'icon_edit',
				            menu: [{text: 'Cut Menu Item'}]
				        },{
				            text: 'Copy',
				            iconCls: 'icon_enlarge'
				        },{
				            text: 'Paste',
				            iconCls: 'icon_add',
				            menu: [{text: 'Paste Menu Item'}]
				        },'-',{
				            text: 'Format',
				            iconCls: 'icon_search'
				        }]
				    }]
		        },{
					xtype:'panel',
 			 		layout:'column',
 			 		bodyStyle:'background: #0d8aa5;padding:5px;',
 			 		id : 'row2',
 			 		border: false,
 			 		height : 78,
 			 		items: [{
 			 			xtype: 'label',
 			 			width: '88%',
 			 			style : 'font-size: 3em',
 			 			html: '<center>'+systemName+'</center>',
 			 			height: 50
 			 		},{
 			 			xtype: 'textfield',
                        width: '13%',
                        id: 'searchId',
                        margin: '5 -50',
                        height: 30
 			 		},{
 			 			xtype:'button',
 			 			height: 30,
 			 			margin: '5 ',
 			 			style : 'font-size: 2em',
 			 			html: '<center>Search</center>'
 			 		}]
				}]
		    },{
		        region: 'center',
		        id: 'tabPanel',
		        xtype: 'tabpanel',
		        activeTab: 0,
		        items: [{
		        	title: 'Title',
		            id: 'content',
		            height: yScroll,
		            html:' <iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+defaultUrl+'"> </iframe>',
		        	items: cw,
		        	listeners: {
		        		'change' : function(newValue, oldValue, eOpts){
		        			console.info("change");
		        		}
		        	}
		        }],
	            bbar: [ 'Text followed by a spacer', '', {
	                itemId: 'toggleCw',
	                text: 'Constrained Window',
	                enableToggle: true,
	                toggleHandler: function() {
	                	cw.setVisible(!cw.isVisible());
	                	//Ext.getCmp("contentWinId").getEl().update("<div{display:inline;} class=\"contentWinId-body\">"+ "LJIJOJLJLJHLLJLJ!" +"</div>"); 
	                }
	            }]
		    },{
		        region: 'west',
		        collapsible: true,
	            title: 'Explore',
		        bodyStyle:'background: #0d8aa5;padding:5px;',
		        items:[{
		        	xtype: 'textfield',
		        	width:200
		        },{
		        	xtype: 'treepanel',
			        width: 200,
			        id: 'treePanel',     
		            singleExpand: false,//同时只能打开一个树,当打开其中任何一个树时,将会关闭其他已经打开的树目录
		            rootVisible: false,//隐藏根结点   
		            autoScroll: true,//允许滚动条
		            useArrows: true,//树形目录使用visita中树目录显示效果(三角形代替+号)   
		            store: {
		                // Child types use namespace of store's model by default
		                model: 'myApp.Territory',
		                proxy: {
		                    type: 'memory',
		                    reader: {
		                        typeProperty: 'mtype'
		                    }
		                },
		                root: {
		                    children: [{
		                        name: 'News',
		                        mtype: 'Territory',
		                        children: [{
		                            name: 'Baidu News',
		                            mtype: 'Country',
		                            leaf: true
		                        },{
		                            name: 'Sina News',
		                            mtype: 'Country',
		                            leaf: true
		                        },{
		                            name: 'Others',
		                            mtype: 'Country',
		                            leaf: true
		                        }]
		                    },{
		                        name: 'Books',
		                        mtype: 'Territory',
		                        children: [{
		                            name: 'Technology',
		                            mtype: 'Country',
		                            leaf: true
		                        },{
		                            name: 'Novels',
		                            mtype: 'Country',
		                            leaf: true
		                        },{
		                            name: 'Download',
		                            mtype: 'Country',
		                            leaf: true
		                        }]
		                    },{
		                        name: 'Video',
		                        mtype: 'Territory',
		                        children: [{
		                            name: 'Net Class',
		                            mtype: 'Country',
		                            children: [{
		                                name: 'IT',
		                                mtype: 'City',
		                                leaf: true
		                            },{
		                                name: 'Architecture',
		                                mtype: 'City',
		                                leaf: true
		                            },{
		                                name: 'Social Science',
		                                mtype: 'City',
		                                leaf: true
		                            }]
		                        },{
		                            name: 'Online Film and Television',
		                            mtype: 'Country',
		                            children: [{
		                                name: 'AAA',
		                                mtype: 'City',
		                                leaf: true
		                            },{
		                                name: 'Movie Download',
		                                mtype: 'City',
		                                leaf: true
		                            }]
		                        }]
		                    },{
		                        name: 'Income and Expenditure',
		                        mtype: 'Territory',
		                        children: [{
		                            name: 'Income',
		                            mtype: 'Country',
		                            leaf: true
		                        },{
		                            name: 'Expenditure',
		                            mtype: 'Country',
		                            leaf: true
		                        },{
		                            name: 'Financial Statistics',
		                            mtype: 'Country',
		                            leaf: true
		                        }]
		                    }]
		                }
		            },
		            listeners:{
		                itemclick:function( record, item, index, e, eOpts) {
		                	var a = Ext.getCmp('treePanel').getSelectionModel().getSelection();
		                	for(var i=0;i<a.length;i++){
		                        //Baidu News
		                		if( a[i].data.text=="Baidu News" ){
		                        	Ext.getCmp('content').setTitle('Baidu News');
		                        	var url = "http://news.baidu.com/";
		                        	var p1=new Ext.Panel({
									    renderTo: 'content',
									    floating: true,
									    frame: true,
									    width: '100%',
									    height: '100%',
									    items: [{
									    	height: yScroll,
									    	html:' <iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"> </iframe>'
									    }]
									}).show();
		                        }
		                        
		                        if( a[i].data.text=="Sina News" ){
		                        	Ext.getCmp('content').setTitle('Sina News');
		                        	var url = "http://news.sina.com.cn/";
		                        	var p1=new Ext.Panel({
									    renderTo: 'content',
									    floating: true,
									    frame: true,
									    width: '100%',
									    height: '100%',
									    items: [{
									    	height: yScroll,
									    	html:' <iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"> </iframe>'
									    }]
									}).show();
		                        }
		                        
		                		if( a[i].data.text=="Income" ){
		                        	Ext.getCmp('content').setTitle('Income');
		                        	income();
		                        }
		                        
		                        if( a[i].data.text=="Expenditure" ){
		                        	Ext.getCmp('content').setTitle('Expenditure');
		                        	var p1=new Ext.Panel({
									    renderTo: 'content',
									    floating: true,
									    frame: true,
									    width: '100%',
									    height: '100%',
									}).show();
		                        }
		                        if( a[i].data.text=="Financial Statistics" ){
		                        	Ext.getCmp('content').setTitle('Financial Statistics');
		                        	var p2=new Ext.Panel({
									    renderTo: 'content',
									    floating: true,
									    frame: true,
									    width: '100%',
									    height: '100%',
									}).show(); 
		                        }
		                    }
		                	
		                }
		            }
		        }]
		    }/* , {
		        region: 'south',
		        bodyStyle:'background:#0d8aa5;padding:5px;',  //#ADD8E6
		        html: 'Information goes here',
		        split: false,
		        height: 100,
		        minHeight: 100
		    } */]
		});
	});
});
</script>

</head>
<body>
</body>
</html>
```

income.js
```
function income(){
	var storeSelect = Ext.create('Ext.data.ArrayStore', {
    	fields : ['dashboardType','dashboardTitle','dashboardName','dashboardId' ] ,
    	storeId : 'showArrayStore' ,
    	sorters : ['dashboardType', 'dashboardName','dashboardTitle'] ,
    	groupField: 'dashboardType',
        pageSize : 14 ,
        proxy: {
      	    type: 'ajax' ,
      	    url : rootPath+'/loadIncomePage.action' ,           
      	    reader: { type: 'json' ,totalProperty : "totalCount" ,root: 'listData'}
  	   	}
	});
	
	storeSelect.on( 'beforeload' , function ( store , options ) {
		var new_params = {
				currentSiteId : 'aa',
				dashboardType :  'bb',//Ext.getCmp('dashboardTypeQry').getValue(),
				dashboardName :  'cc'//Ext.getCmp('dashboardNameQry').getValue()
		};
		Ext.apply( store.proxy.extraParams, new_params );
	});	
	
	var  selModel = Ext.create('Ext.selection.CheckboxModel', { 
        showHeaderCheckbox : false,
        listeners:{
            selectionchange:function(selectionModel, selected, options){
		 		if ( selected.length == 0 ) {
		 			//Ext.getCmp('<portlet:namespace />deleteDashboard').setDisabled( true ) ;
		 		} else {
            		//Ext.getCmp('<portlet:namespace />deleteDashboard').setDisabled( false ) ; 	  
		 		}
		 		if ( selected.length==1  ) {
		 			//Ext.getCmp('<portlet:namespace />editDashboard').setDisabled( false ) ;
		 		} else {
		 			//Ext.getCmp('<portlet:namespace />editDashboard').setDisabled( true ) ;
		 		}
            } 
        }
	});
	
	var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
        groupHeaderTpl: 'Type: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
    });
    
    Ext.grid.PageRowNumberer = Ext.extend(Ext.grid.RowNumberer, {    
        renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){   
            return (store.currentPage - 1) * store.pageSize + rowIndex + 1;  
        }       
    });
	
	var grid = Ext.create('Ext.grid.Panel', {
    	selModel : selModel ,
    	collapsible: false,
    	iconCls: 'icon-grid',
        frame: true,
        store : storeSelect ,
        features: [groupingFeature],
        columns: [
			Ext.create('Ext.grid.PageRowNumberer',{  
        		header:' ',  
    		}),  
			{
				text : 'Type' ,
				flex : 1 ,
                sortable : true ,
                dataIndex: 'dashboardType'
            }, {
            	text : 'Name' ,
                flex : 1,
                sortable : true ,
                dataIndex: 'dashboardName'
			}, {
				text : 'Title' ,
                flex : 1 ,
                sortable : true  ,
                dataIndex: 'dashboardTitle'
			} 
		] ,
		height: '90%',
        width: '100%' ,
        viewConfig: { stripeRows: true } , 
        listeners: {
        	select: function(view, selections) {
        		Ext.getCmp('<portlet:namespace />editDashboard').setDisabled( false ) ;
        		Ext.getCmp('<portlet:namespace />deleteDashboard').setDisabled( false ) ; 	  
			}
		} ,
		/*  clear current grouping format
			fbar: ['->', {
            text: 'Clear Grouping',
            //iconCls: 'icon-clear-group',
            handler: function() {
                groupingFeature.disable();
            }
        }], */
		bbar: Ext.create('Ext.PagingToolbar', {
			store: storeSelect ,
		    displayInfo: true ,
		    displayMsg : 'Displaying {0} -  {1} of {2} ' ,  
            emptyMsg : "No record to display" ,
            doLoad:function(start){
            	record_start = start;
            	var o = {};
            	var pn = this.getParams();
            	o[pn.start] = start;
            	o[pn.limit] = this.pageSize;
            	this.store.load({params:o});
            }
		}) 
	} );
	
	var p0=new Ext.Panel({
	    renderTo: 'content',
	    floating: true,
	    frame: true,
        bodyStyle : 'padding:5px 5px 0' ,
	    width: '100%',
	    height: '100%',
	    fieldDefaults : { msgTarget: 'side', labelWidth: 75 } , 
        defaultType : 'textfield' ,
        defaults : { anchor: '100%' } ,
	    dockedItems: [{ 
	    	dock: 'top' , 
	    	xtype: 'toolbar', 
	    	items:[{
		        //tbar: [{
		            xtype:'button',
		            text: 'Add',
		            iconCls: 'icon_add',
		            handler: function(){
		            	var dashboardFormObj = Ext.create('Ext.form.Panel', {
		            		id:'dashboardForm' ,
	        		        	name:'dashboardForm' ,
	        		        	frame: true ,
	        		         	width: 520 ,
	        		         	layout: 'column',
	        		         	height: 250,
	        		         	items :[{
	        		         		xtype: 'panel',
	   	 			 				width: 230,
	   	 			 				layout: 'form',
	   	 			 				items: [{
 	   	 			 				fieldLabel : 'Type' ,
 	        			        	labelWidth : 50,
 	        						name : 'dashboardType' ,
 	        					    id : 'dashboardType' ,
 	        					    xtype : 'combo' ,
 	        					    allowBlank : false ,
 	        						store: Ext.create('Ext.data.SimpleStore',( {
 	        					    	fields: [ 'value' , 'text' ],
 	        					    	data: [ ['Line Status Monitor v1.0' , 'Line Status Monitor v1.0'],['Line Status Monitor v1.2' , 'Line Status Monitor v1.2'] , ['Line Status Monitor v2.0' , 'Line Status Monitor v2.0'] ,['SPC' , 'SPC'] , [ 'Player' , 'Player' ] , [ 'Other' , 'Other' ]]	 	        						
 	        						})),
 	        						emptyText : 'Select' ,
 	        					    triggerAction : 'all' ,
 	        					    valueField : 'value' ,
 	        					    displayField : 'text' ,
 	        						editable : false,
 	        						listeners:{
 	        							
 	        						}
	   	 			 				},{
 	   	 			 				id : 'dashboardName' ,
 	        						xtype : 'textfield' ,
 	        						name : 'dashboardName' ,
 	        						fieldLabel : 'Name' , 
 	        						labelWidth : 50,
 	        						allowBlank : false ,
 	        						blankText : 'Please fill  name',
 	        						listeners:{
 	        							
 	        						}
	   	 			 				},{
 	   	 			 				fieldLabel : 'Title' ,
 	        						labelWidth : 50,
 	        						name : 'dashboardTitle' ,
 	        						id : 'dashboardTitle' ,
 	        						allowBlank : false ,
 	        						xtype : 'textfield' ,
 	        						blankText : 'Please fill Title value' ,
 	        						listeners:{
 	        							
 	        						}
	   	 			 				}]
	        		         	},{
	        		         		xtype: 'panel',
	   	 			 				width: 270,
	   	 			 				layout: 'form',
	   	 			 				scrollable: true,
	   	 			 				autoScroll: true,
	   	 			 				vertical: true,
	   	 			 				margin: '0 0 0 10',
	   	 			 				id: 'images',
	   	 			 				height: 240,
	   	 			 				items: [{
 	   	 			 				id: 'picture',
 	   	 			 				xtype: 'box', 
 	   	 			 	    		width: 270, 
 	   	 			 	    		height: 150,  
 	   	 			 	    		autoEl: {  
 	   	 			 	        		tag: 'img',    
 	   	 			 	        		src: rootPath+'/images/lsm_1.0_thumb.png'
 	   	 			 	    		},
	 	   	 			 	    	listeners:{
 	   	 			 	    			render: function(){
 	   	 			 	    				document.getElementById("picture").style.cursor = "url("+rootPath+"/images/lsm_1.0_thumb.png),auto";
 	   	 			 	    			}
 	   	 			 	    		}
	   	 			 				},{
 	   	 			 				xtype: 'label',
 	        						id: 'instruction',
 	        						width: 260,
 	        						height: 80,  
	   	 			 				}],
 	   	 			 			listeners:{
 	        	                    el:{
 	        	                        click:function(){
 	        	                        	var popSrc = Ext.getCmp("picture").getEl().dom.src;
 	        	                        	var str = popSrc.lastIndexOf("/");
 	        	                        	var popSubStr = popSrc.substring(str+1,popSrc.length-4);
				 	        				var popWin = Ext.create('Ext.window.Window',{
				 	        					border: false,
				 	        					frame: false,
				 	        					layout: 'fit',
				 	        					width: 1020,
				 	        					height: 600,
				 	        					items:[{
				 	   	 			 				id: 'popPic',
				 	   	 			 				xtype: 'box', 
				 	   	 			 	    		autoEl: {  
				 	   	 			 	        		tag: 'img',    
				 	   	 			 	        		src: rootPath+'/images/'+popSubStr+'.png'
				 	   	 			 	    		}
				 	        					}]
				 	        				});
 	        	                        	popWin.show();
 	        	                        }
 	        	                    }
 	        	                },
 	        	               	renderTo:Ext.getBody()
	        		         	}]
		            	});
		            	var winAddIncome =Ext.create('Ext.window.Window', {
		            		frame : false ,
	            			height : 250 ,
	         	        	style : 'background: none repeat scroll 0 0 #F1F1F1;',
	            	    	title : 'Add New Dashboard',
	  	            		closable : true,
	  	                	items : [ dashboardFormObj ],
	  	                	dockedItems : [{
	  	                		xtype : 'toolbar' ,
								ui : 'footer' ,
								dock : 'bottom' ,
								layout : { type : 'hbox', pack : 'center' } ,
								items: [{
									width : 80,
									text : 'Save' ,
									handler : function() {
										var perferenceConfig = new Array();
										var t = {
												"mfgLineKey" : "aa",
						        				"mfgLine":"bb",
						        				"process":"cc",
						        				"workstation":"dd" ,
										};
										perferenceConfig.push(t);
										
										Ext.Ajax.timeout = 120000;  
										Ext.Ajax.request( {
											url: rootPath+'/addIncome.action',
											method : 'post',
										    jsonData:{ incomeConfigs: perferenceConfig } ,
											params:{
										    	communityId: 'a' ,
										    	groupId: 's',
												layoutId: 'c' ,
												portletId:'d' ,
										    	portletName : 'e' 
										    } ,
										    success:function(response){
												alert("success");
												window.location.reload();
											},
											failure: function(response, opts) {
										        alert("save failure");
										    }
										});
									}
								},{
									width : 80,
									text : 'Cancel',
									handler : function() {  winAddIncome.hide();  }
								}]
	  	                	}],
	  	                	listeners: {
		                	    close : function(){  winAddIncome.hide();} 
		         	        }
		            	});
		            	winAddIncome.show() ;  
		            }
		        },'-',{
		            xtype:'button',
		            text: 'Edit',
		            iconCls: 'icon_edit'
		        },{
		            xtype:'button',
		            text: 'Delete',
		            iconCls: 'icon_delete'
		        },{
		            xtype:'button',
		            text: 'Search',
		            iconCls: 'icon_enlarge',
		            menu: [{text: 'Cut Menu Item'}]
		        },{
		            text: 'Copy',
		            iconCls: 'icon_back'
		        },{
		            text: 'Paste',
		            iconCls: 'icon_add',
		            menu: [{text: 'Paste Menu Item'}]
		        },'-',{
		            text: 'Format',
		            iconCls: 'icon_add'
		        },{
		        	xtype: 'tbspacer', 
		        	flex: 1
		        },{
			    	xtype: 'toolbar',
			 		border: false,
			    	items: [ 
					 {
           	        	fieldLabel : 'Type' ,
           	        	width: 300,
           	        	labelWidth: 40,
           				name : 'dashboardTypeQry' ,
           			    id : 'dashboardTypeQry' ,
           			    xtype : 'combo' ,
           			    allowBlank : false ,
           				store: Ext.create('Ext.data.SimpleStore',( {
           			    	fields: [ 'value' , 'text' ],
           			    	data: [ ['Line Status Monitor v1.0' , 'Line Status Monitor v1.0'],['Line Status Monitor v1.2' , 'Line Status Monitor v1.2'] , ['Line Status Monitor v2.0' , 'Line Status Monitor v2.0'] ,['SPC' , 'SPC'] , [ 'Player' , 'Player' ] , [ 'Other' , 'Other' ]]
           				})),
           				emptyText : 'Select' ,
           			    triggerAction : 'all' ,
           			    valueField : 'value' ,
           			    displayField : 'text' 
           			} ,'-', 
					{
			        	xtype : 'textfield',
			        	name : 'dashboardNameQry',
			         	id : 'dashboardNameQry',
    			     	fieldLabel: 'Name',
        				labelWidth: 40,
		                labelAlign : 'right',
                  		width: 160,
                  		style:'margin-right:0px'
					},'-', {
						xtype: 'button',
			            iconCls: 'search',
			            text: 'Search',
			            border: false,
                        style: 'margin-left: 0px',
			            handler: function () {
			            	storeSelect.load();
			            } 
					} ]
			     //}]
		    }]
	    }],
	    items: [  grid ] 
	});
	storeSelect.load();
	p0.show();
}

```
