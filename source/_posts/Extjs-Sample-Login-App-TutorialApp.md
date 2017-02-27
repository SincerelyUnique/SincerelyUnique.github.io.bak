---
title: 'Extjs Sample Login App: TutorialApp'
date: 2017-02-21 09:06:57
tags:
categories: Extjs
---
*摘要: 注：官网样例 Extjs version: ext-6.0.0 SenchaCmd: SenchaCmd-6.0.2.14-linux-amd64.sh （安装后配置到path）*
<!--more-->
1. 使用SenchaCmd自动生成app
```
$ sencha -sdk /home/ext-6.0.0 generate app -classic TutorialApp ./TutorialApp
```
app生成后路径： /home/jalen_chu/TutorialApp

2. 创建登陆页面：

1）修改：进入 /TutorialApp/app/view 创建如下
![](http://static.oschina.net/uploads/img/201602/18092853_Jcla.jpeg)

2）Login.js
```
Ext.define('TutorialApp.view.login.Login',{
    extend:'Ext.window.Window',
    xtype:'login',

    requires:[
        'TutorialApp.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller:'login',
    bodyPadding:10,
    title:'Login Window',
    closable:false,
    autoShow:true,

    items:{
        xtype:'form',
        reference:'form',
        items:[{
            xtype:'textfield',
            name:'username',
            fieldLabel:'Username',
            allowBlank:false
        },{
            xtype:'textfield',
            name:'password',
            inputType:'password',
            fieldLabel:'Password',
            allowBlank:false
        },{
            xtype:'displayfield',
            hideEmptyLabel:false,
            value:'Entry any non-blank password'
        }],
        buttons:[{
            text:'Login',
            formBind:true,
            listeners:{
                click:'onLoginClick'
            }
        }]
    }
});
```

3)LoginController.js
```
Ext.define('TutorialApp.view.login.LoginController',{
    extend:'Ext.app.ViewController',
    alias:'controller.login',

    onLoginClick:function(){
    
        // This would be the ideal location to verify the user's credentials via
            // a server-side lookup. We'll just move forward for the sake of this example.

            // Set the localStorage value to true
        localStorage.setItem("TutorialLoggedIn",true);
        
        // Remove Login Window
        this.getView().destory();

        // Add the main view to the viewport
        Ext.create({
            xtype:'app-main'
        });
    }
});
```

3. 创建主页面内容：
直接修改 /TutorialApp/app/view/main 目录下Main.js 和MainController.js 文件

1）Main.js
```
/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TutorialApp.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'TutorialApp.view.main.MainController',
        'TutorialApp.view.main.MainModel',
        'TutorialApp.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',
    plugins:'viewport',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list',
    items:[{
        xtype:'button',
        text:'Logout',
        margin:'100',
        handler:'onClickButton'
    }]
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Home',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'mainlist'
        }]
    }, {
        title: 'Users',
        iconCls: 'fa-user',
        bind: {
            html: '{loremIpsum}'
        }
    }, {
        title: 'Groups',
        iconCls: 'fa-users',
        bind: {
            html: '{loremIpsum}'
        }
    }, {
        title: 'Settings',
        iconCls: 'fa-cog',
        bind: {
            html: '{loremIpsum}'
        }
    }]
});
```

2）MainController.js
```
/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TutorialApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    onClickButton:function(){
    // Remove the localStorage key/value
    localStorage.removeItem("TutorialLoggedIn");
    
    // Remove Main View
    this.getView().destory();

    // Add the Login Window
    Ext.create({
        xtype:'login'
    });
    }
});
```

4. 业务逻辑：登陆后进入主页面，退出后返回登陆页面
修改 /TutorialApp/app/Application.js 
```
/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('TutorialApp.Application', {
    extend: 'Ext.app.Application',
    
    name: 'TutorialApp',

    stores: [
        // TODO: add global / shared stores here
    ],
    
    views: [
    'TutorialApp.view.login.Login',
    'TutorialApp.view.main.Main'
    ],

    launch: function () {
        // TODO - Launch the application
    // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
    var loggedIn;
    
    // Check to see the current value of the localStorage key
    loggedIn=localStorage.getItem("TutorialLoggedIn");

      // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view
    Ext.create({
        xtype:loggedIn ? 'app-main' : 'login'
    });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
```

5. 运行：
```
$ cd /home/jalen_chu/TutorialApp
$ sencha app watch
```
浏览器：http://localhost:1841/ 

参考:
[http://docs.sencha.com/extjs/6.0/getting_started/login_app.html](http://docs.sencha.com/extjs/6.0/getting_started/login_app.html)

