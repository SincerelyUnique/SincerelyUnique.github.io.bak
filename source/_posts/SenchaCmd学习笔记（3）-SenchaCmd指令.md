---
title: 'SenchaCmd学习笔记（3）:SenchaCmd指令'
date: 2017-02-22 13:42:41
tags: sencha
categories: Extjs
---
SenchaCmd学习笔记（3）:
SenchaCmd指令介绍
<!--more-->
1.格式：

```
sencha   [category]   [command]   [options...]   [arguments...]
```

2.help
```
$ sencha help

$ sencha help app

$ sencha help app clean
```


2.Upgrading
```
$ sencha upgrade --check  检测升级

$ sencha upgrade   不检测直接更新
```


3.Generating an application 生成一个应用
```
$ sencha -sdk /path/to/sdk generate app [--modern/classic] MyApp /path/to/ myapp   (SDK为Extjs包或sencha touch)
```
例如

```
$ sencha -sdk /Users/SomeUser/bin/Sencha/Cmd/repo/extract/ext/6.0.0/  generate app MyApp /Users/SomeUser/projects/extjs/myapp
```

4.构建应用(构建HTML, JS, SASS等)
```
$ sencha app build

$ sencha app build modern

$ sencha app build classic 

(Extjs6构建应用配置文件在：app.json)
```


5.启动应用
```
$ sencha app watch

$ sencha app watch modern

$ sencha app watch classic
```


6.代码生成(如views, controller,and model,默认类型String)
```
$ sencha generate view myApp.MyView

$ sencha generate model MyModel id:int,fname,lname

$ sencha generate controller MyController
```


7.Upgrading your application更新应用
```
$ sencha app upgrade [ path-to-new-framework ]
```


8.Debugging调试应用

web browser（插件）

Firefox：Illumination  （省时间，容易识别Extjs组件，悬停参数高亮。这个插件收费）

Chrome：App Inspector （更容易，直接google添加即可，F12调试）

另一个在线调试工具：Sencha Fiddle  （https://fiddle.sencha.com/#home）



9.Tha development IDE（开发工具）

插件：Sencha JetBrains plugin  （IntelliJ, WebStrome, PHPStorm, and RubyMine.）

Visual Studio Code

Brackets.io
