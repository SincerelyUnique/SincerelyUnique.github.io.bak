---
title: shell脚本学习
date: 2017-03-15 15:29:15
tags:
categories: Shell
---
今天学习一下unix/Linux下强大的脚本语言shell。
<!--more-->
shell语言是c语言编写的程序，既是一种命令语言，又是一种程序设计语言，它调用了系统核心大部分功能来执行程序。

shell的使用程度侧面反映用户对Unix/Linux使用的熟练程度。
[http://c.biancheng.net/cpp/view/2736.html](http://c.biancheng.net/cpp/view/2736.html)

1.shell两种执行命令的方式
	交互式：用户输一个命令，shell就解释执行一次
	批处理：shell脚本含多条命令，执行这个脚本，一次运行多条命令

2.shell脚本无需编译，它是解释执行的

3.初学者建议不要以root用户运行脚本，非root用户使用shell不会破坏系统

4.shell脚本解释器
```
bash：Linux标准默认的shell，内部命令共有40个。可以使用类似DOS下面的doskey的功能，用方向键查阅和快速输入并修改命令。自动通过查找匹配的方式给出以某字符串开头的命令。包含了自身的帮助功能，你只要在提示符下面键入help就可以得到相关的帮助。
sh：Unix默认的shell
ash：系统资源最少的一个小shell，它只包含24个内部命令，因而使用起来很不方便。
csh：Linux比较大的内核，共有52个内部命令。该shell其实是指向/bin/tcsh这样的一个shell，也就是说，csh其实就是tcsh。
ksh：共有42条内部命令。该shell最大的优点是几乎和商业发行版的ksh完全兼容，这样就可以在不用花钱购买商业版本的情况下尝试商业版本的性能了
（注意：bash完全兼容sh，也就是说，用sh写的脚本可以不加修改的在bash中执行。）
```

5.脚本语言优点
解释型语言也被称作“脚本语言”。使用脚本编程语言的好处是，它们多半运行在比编译型语言还高的层级，能够轻易处理文件与目录之类的对象；缺点是它们的效率通常不如编译型语言。
花一个小时写成的简单脚本，同样的功能用C或C++来编写实现，可能需要两天。
一般来说，脚本执行的速度已经够快了，快到足以让人忽略它性能上的问题。
脚本编程语言的例子有awk、Perl、Python、Ruby与Shell。

6.shell脚本特点
简单性：Shell是一个高级语言；通过它，你可以简洁地表达复杂的操作。
可移植性：使用POSIX所定义的功能，可以做到脚本无须修改就可在不同的系统上执行。
开发容易：可以在短时间内完成一个功能强大又妤用的脚本。

7.第一个shell脚本
```
#!/bin/bash
echo "Hello World!"
echo "What is your name?"
#获取手动输入信息并输出
read INPUT
echo "Hello,$INPUT"
```

8.变量
```
#!/bin/bash
#定义一个变量，变量和等号之间不能有空格，且首字符必须为字母，中间不能空格，可以>下划线，不能用标点，不能使用bash里关键字
#推荐当使用变量时为其加上括号 {你的变量}
name="jalen_chu"
echo $name
echo ${name}

#重新定义变量，重新赋值
name="abely_liu"
echo ${name}

#只读变量，不可更改,运行时会提示只读变量
name="jalen_chu"
readonly name
name="abely_liu"
echo ${name}

#删除变量
age="24"
unset age
echo ${age}

#这里遍历一个数组，并循环输出每个元素
for skill in Ada Coffe Action Java
do
  echo "I am good at ${skill} Script"
done
```
运行shell时，会同时存在三种变量：
1) 局部变量
局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
2) 环境变量
所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
3) shell变量
shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行


9.特殊变量
```
#!/bin/bash
#输出当前shell脚本进程id
echo "pid: $$"

#输出当前shell脚本文件名
echo "file name: $0"

#传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是$1>，第二个参数是$2
echo "first parameter: $1"
echo "first parameter: $2"

#传递给脚本或函数的参数个数
echo "total number of parameters: $#"

#传递给脚本或函数的所有参数。
echo "quoted values: $*"

#传递给脚本或函数的所有参数。被双引号(" ")包含时，与 $* 稍有不同，"$*"将所有的参数作为一个整体，以"$1 $2 … $n"的形式输出，"$@" 会将各个参数分开，以"$1" "$2" … "$n" 的形式输出所有参数
到。
echo "quoted values: $@"

#上个命令的退出状态，或函数的返回值。退出状态是一个数字，一般情况下，大部分命令执行成功会返回 0，失败返回 1。也有一些命令返回其他值，表示不同类型的错误。
echo "exit return: $?"
```

10.Shell替换：Shell变量替换，命令替换，转义字符
```
#!/bin/bash
#-e 表示对转义字符进行替换。如果不使用 -e 选项，将会原样输出
#\\     反斜杠
#\a     警报，响铃
#\b     退格（删除键）
#\f     换页(FF)，将当前位置移到下页开头
#\n     换行
#\r     回车
#\t     水平制表符（tab键） 
#\v     垂直制表符
#可以使用 echo 命令的 -E 选项禁止转义，默认也是不转义的；使用 -n 选项可以禁止插入换行符
a=10
echo -e "value of a is ${a} \n"

#将命令执行结果保存在变量中
DATE=`date`
echo "Date is $DATE"
USERS=`who | wc -l`
echo "Logged in user are $USERS"
UP=`date ; uptime`
echo "Uptime is $UP"

#${var:-word}   如果变量 var 为空或已被删除(unset)，那么返回 word，但不改变 var 的值。
echo ${var:-"Variable is not set"}
echo "1 - Value of var is ${var}"

#${var:=word}   如果变量 var 为空或已被删除(unset)，那么返回 word，并将 var 的值设置为 word。
echo ${var:="Variable is not set"}
echo "2 - Value of var is ${var}"

#${var:+word}   如果变量 var 被定义，那么返回 word，但不改变 var 的值。
unset var
echo ${var:+"This is default value"}
echo "3 - Value of var is $var"

var="Prefix"
echo ${var:+"This is default value"}
echo "4 - Value of var is $var"

#${var:?message} 如果变量 var 为空或已被删除(unset)，那么将消息 message 送到标准错误输出，可以用来检测变量 var 是否可以被正常赋值。
#若此替换出现在Shell脚本中，那么脚本将停止运行。
echo ${var:?"Print this message"}
echo "5 - Value of var is ${var}"
```

11.Shell运算符：Shell算数运算符、关系运算符、布尔运算符、字符串运算符等
原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。
expr 是一款表达式计算工具，使用它能完成表达式的求值操作。

**算数运算符**
```
#!/bin/bash
value=`expr 2 + 2`
echo ${value}
```
表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
完整的表达式要被 ` ` 包含，注意这个字符不是常用的单引号，在 Esc 键下边。
```
#!/bin/sh
a=10
b=20
val=`expr $a + $b`
echo "a + b : $val"
val=`expr $a - $b`
echo "a - b : $val"
val=`expr $a \* $b`
echo "a * b : $val"
val=`expr $b / $a`
echo "b / a : $val"
val=`expr $b % $a`
echo "b % a : $val"
if [ $a == $b ]
then
   echo "a is equal to b"
fi
if [ $a != $b ]
then
   echo "a is not equal to b"
fi
```
乘号(*)前边必须加反斜杠(\)才能实现乘法运算；
if...then...fi 是条件语句，后续将会讲解。

**关系运算符**
```
#!/bin/sh
a=10
b=20
if [ $a -eq $b ]
then
   echo "$a -eq $b : a is equal to b"
else
   echo "$a -eq $b: a is not equal to b"
fi
if [ $a -ne $b ]
then
   echo "$a -ne $b: a is not equal to b"
else
   echo "$a -ne $b : a is equal to b"
fi
if [ $a -gt $b ]
then
   echo "$a -gt $b: a is greater than b"
else
   echo "$a -gt $b: a is not greater than b"
fi
if [ $a -lt $b ]
then
   echo "$a -lt $b: a is less than b"
else
   echo "$a -lt $b: a is not less than b"
fi
if [ $a -ge $b ]
then
   echo "$a -ge $b: a is greater or  equal to b"
else
   echo "$a -ge $b: a is not greater or equal to b"
fi
if [ $a -le $b ]
then
   echo "$a -le $b: a is less or  equal to b"
else
   echo "$a -le $b: a is not less or equal to b"
```

**布尔运算符**
```
#!/bin/sh
a=10
b=20
if [ $a != $b ]
then
   echo "$a != $b : a is not equal to b"
else
   echo "$a != $b: a is equal to b"
fi
if [ $a -lt 100 -a $b -gt 15 ]
then
   echo "$a -lt 100 -a $b -gt 15 : returns true"
else
   echo "$a -lt 100 -a $b -gt 15 : returns false"
fi
if [ $a -lt 100 -o $b -gt 100 ]
then
   echo "$a -lt 100 -o $b -gt 100 : returns true"
else
   echo "$a -lt 100 -o $b -gt 100 : returns false"
fi
if [ $a -lt 5 -o $b -gt 100 ]
then
   echo "$a -lt 100 -o $b -gt 100 : returns true"
else
   echo "$a -lt 100 -o $b -gt 100 : returns false"
fi
```

**字符串运算符**
```
#!/bin/sh
a="abc"
b="efg"
if [ $a = $b ]
then
   echo "$a = $b : a is equal to b"
else
   echo "$a = $b: a is not equal to b"
fi
if [ $a != $b ]
then
   echo "$a != $b : a is not equal to b"
else
   echo "$a != $b: a is equal to b"
fi
if [ -z $a ]
then
   echo "-z $a : string length is zero"
else
   echo "-z $a : string length is not zero"
fi
if [ -n $a ]
then
   echo "-n $a : string length is not zero"
else
   echo "-n $a : string length is zero"
fi
if [ $a ]
then
   echo "$a : string is not empty"
else
   echo "$a : string is empty"
fi
```

**文件测试运算符**
```
#!/bin/sh
file="/var/www/tutorialspoint/unix/test.sh"
if [ -r $file ]
then
   echo "File has read access"
else
   echo "File does not have read access"
fi
if [ -w $file ]
then
   echo "File has write permission"
else
   echo "File does not have write permission"
fi
if [ -x $file ]
then
   echo "File has execute permission"
else
   echo "File does not have execute permission"
fi
if [ -f $file ]
then
   echo "File is an ordinary file"
else
   echo "This is sepcial file"
fi
if [ -d $file ]
then
   echo "File is a directory"
else
   echo "This is not a directory"
fi
if [ -s $file ]
then
   echo "File size is zero"
else
   echo "File size is not zero"
fi
if [ -e $file ]
then
   echo "File exists"
else
   echo "File does not exist"
fi
```
