---
title: Extjs遮罩
date: 2017-02-20 15:54:31
tags: extjs
categories: Extjs
---
1.图片
```
var globalMask = new Ext.LoadMask(  Ext.getBody(), {msg:"<div class=\"maskcls\"><img src='<%=rootPath%>/images/waiting.gif'></img></div>"});
```

2.文字
```
var globalMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."}); 
```

调用
```
//显示
globalMask.show();
//隐藏
globalMask.hide();
```
