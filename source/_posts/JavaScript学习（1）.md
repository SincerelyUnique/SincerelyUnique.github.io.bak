---
title: JavaScript学习（1）
date: 2017-02-21 09:29:46
tags:
categories: JavaScript
---
本文简单介绍JavaScript基本语法和函数：
<!--more-->
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JavaScriptDemo</title>

<script>
    document.write("----------------javascript对象与数组-----------------------")
    //定义一个对象,名/值对或字符串/值对
    var book={
        topic:'javascript',
        fat:true,
        version:'2.0'
    }
    //通过.或[]来访问对象属性
    document.write("<br/>"+book.topic);        //javascript
    document.write("<br/>"+book.fat);        //true
    document.write("<br/>"+book['fat']);        //true
    //javascript定义一个数组
    var arr=[2,4,1,6];
    var rra=new Array(1,4,6,2);
    document.write("<br/>"+arr);            //2,4,1,6
    document.write("<br/>"+rra);            //1,4,6,2
    document.write("<br/>"+arr[0]);        //2
    document.write("<br/>"+arr.length);        //4
    document.write("<br/>"+(arr.length-1));        //3
    //新增一个元素
    arr[4]=11;
    document.write("<br/>"+arr.length);        //5
    //定义一个空数组
    var arr1=[];
    document.write("<br/>+arr1");            //+arr1
    document.write("<br/>"+arr1.length);        //0
    //数组里定义对象
    var arr2=[
        {name:"Bob", age:12},
        {name:"John", age:14}
    ];
    document.write("<br/>"+arr2);            //[object Object],[object Object]
    document.write("<br/>"+arr2.name);        //undefined
    document.write("<br/>"+arr2[1].name);        //John
    //对象里定义数组,数组里又定义二维数组
    var obj3={
        arr3_1: [ [1,2], [5,3]  ],
        arr3_2: [ [4,6], [6,1], [63,31]  ]
    };
    document.write("<br/>"+obj3);            //[object Object]
    document.write("<br/>"+obj3.arr3_1[1][1]);    //3
    document.write("<br/>"+obj3.arr3_2[2][1]);    //31
    //换行线
    document.write("<br/>------------------javascript运算符---------------------------");
    //javascript运算
    document.write("<br/>"+3/2);            //1.5
    var point1={
        age: 14
    };
    var point2={
        age: 34
    };
    document.write("<br/>"+(point1.age-point2.age));    //对象属性运算，-20
    document.write("<br/>"+"5"+"4");        //字符串运算54
    var value=10;
    value>20?     document.write("<br/>"+"Yes"): document.write("<br/>"+"No");        //三目,No
    var x;         document.write("<br/>"+((x==2)&&(x==3)));    //false
    var x=2;     document.write("<br/>"+((x==2)||(x==3)));    //true
    var x=2;    document.write("<br/>"+(!(x==3)));    //true

    //javascript函数
    document.write("<br/>-------------------------JavaScript函数-------------------------");
    function Calculator(){
        for(var i=1;i<=9;i++){
            document.write("<br/>");
            for(var j=1;j<=i;j++){
                document.write(i+"*"+j+"="+i*j);
                document.write("&nbsp;&nbsp;");
            }
        }
    }
    document.write(Calculator());        //输出乘法表
    document.write("<br/>");

    //函数=名称+参数
    function plus(x,y){
        return x+y;
    };
    document.write("<br/>"+plus(10,4));    //14
    function plus1(x){
        return x+1;
    };
    document.write("<br/>"+plus1(5));    //6
    var square=function(x){
        return x*x;
    };
    document.write("<br/>"+square(5));    //25

    //方法=函数+对象
    var arr5=[];
    arr5.push(1,2,4);
    document.write("<br/>"+arr5);        //1,2,4     push添加元素
    document.write("<br/>"+arr5.reverse());    //4,,2,1 数组逆序

    //使用this调用方法对象的引用
    var points11=[
        {x:1,y:1},
        {x:2,y:3}
    ];
    points11.dist=function(){
        var p1=this[0];
        var p2=this[1];
        var aa=p2.x-p1.x;
        var bb=p2.y-p1.y;
        return Math.sqrt(aa*aa+bb*bb);
    }
    document.write("<br/>"+points11.dist());    //2.236

    //控制语句
    document.write("<br/>-----------------------------控制语句---------------------------");
    //if...else
    function abc(x){
        if(x>0){
            document.write("<br/>x的值大于0");
        }else{
            document.write("<br/>x的值小于0");
        }
    };
    abc(-3);                    //x的值小于0
    document.write("<br/>"+abc(23));    //x的值大于0 undefined

    //while..do
    function abcd(x){
        var  num=2;
        while(x>1){
            num+=1;
            x--;
            document.write("<br/>"+num);
        }
        return x;
    };
    abcd(2);        //3
</script>
    
</head>
<body>

</body>
</html>
```
