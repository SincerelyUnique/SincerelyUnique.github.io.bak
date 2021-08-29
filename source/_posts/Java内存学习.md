---
title: Java内存学习
date: 2017-02-20 16:35:40
tags: cache
categories: Java
---
1. java内存管理：对象的分配与释放

    1）分配：由程序完成（new个对象，申请空间），堆操作

    2）释放：垃圾回收机制执行，简化工作，加重jvm工作，需GC监控
<!--more-->
2. java内存泄露

    分配对象两个特点：①有向图中可达，存在通路，② 对象无用，（占用不被gc回收）

3. 内存区域

    1）栈内存：函数中，基本类型变量，对象的引用变量的分配，变量超过作用域自动释放，优点存取快，仅此与cpu中寄存器，栈数据也可共享，但数据大小与生存期必须确定，灵活性差

    2）堆内存：new出的对象，数组及对象的实例变量，jvm处理，优点运行时动态分配内存大小 ，生存期不必预先告知编译器，存取较慢

    3)基本数据类型：8种，int, short, long, byte, float, double, boolean, char(注意，并没有string的基本类型)，如int a=3，a是一个指向int类型的引用，指向3这个值，大小可知，生存期可知，存于栈中，且数据可共享，如同时定义int b=3，无需开辟地址

    4）对象：创建对象=对象声明+实例化，

        ①声明对象时内存：People p=new Person（）；栈内为p分配内存空间，空对象，不能使用，不能引用任何实体

        ②对象实例化时内存：People p=new Person（“Bob”）；对内存中为类的成员变量分配内存并初始化（显式），之后可以通过p引用堆内存中的对象

        ③创建多个不同实例对象：new出多个，在堆中互不影响，注意：Person p1=new Person（）；Person p2=p1；两个对象引用同时指向一个对象实例

        ④包装类：基本类型都有包装类，包装类创建对象和普通对象一样
	```
	int i=0;                //i直接存储在栈中
	Integer i=new Integer(0);        //i对象数据存储在堆中，i的引用存储在栈中，通过栈中的引用来操作对象
	```
	⑤String：特殊的包装类，创建方式：
	```
	String str1=new String("abc");            //普通对象的的创建过程一样；
	String str2="abc";        //有一个转化过程
	//1）先定义一个名为str的对String类的对象引用变量：String str；
	//2）栈里查找“abc”的地址，没有就开辟个，接着创建一个新的String类的对象o，o指向这个地址并标记，以后可以调用o地址
	//3）讲str指向对象o的地址

	//下面是个测试：
	String str1="abc"；
	String str2="abc"；
	System.out.println(s1==s2)；//true，同一对象

	String str1= new String("abc")；
	String str2="abc"；
	System.out.println(str1==str2)；//false 不同对象
	```
	⑥数据：int a[]；栈内存创建一个数组引用，通过数组名来引用数组
	```
	x=new int[3]；    //将在堆内存中分配3个保存int型数据的空间，堆内存的首地址放到栈内存中，每个数组元素被初始化为0。
	```
	⑦静态变量：Static，静态标识内存的共享，即共有内存空间，每个实例都指向同一内存地址，两种属性：static和instance，static第一次用初始化，后来不在初始化，如：
	```
	class Student{                    //每一次创建一个新的Student实例时,成员numberOfStudents都会不断的递增,只存储在一个位置上
	static int numberOfStudents=0;
	Student()
	{
	numberOfStudents++;
	}
	}
	```
4. java内存管理实例

    实例变量和对象驻留在堆上，局部变量驻留在栈上，实例如下：
	```
	public class Dog {
	Collar c;
	String name;
	//1. main()方法位于栈上
	public static void main(String[] args) {
	//2. 在栈上创建引用变量d,但Dog对象尚未存在
	Dog d;
	//3. 创建新的Dog对象，并将其赋予d引用变量
	d = new Dog();
	//4. 将引用变量的一个副本传递给go()方法
	d.go(d);
	}
	//5. 将go()方法置于栈上，并将dog参数作为局部变量
	void go(Dog dog){
	//6. 在堆上创建新的Collar对象，并将其赋予Dog的实例变量
	c =new Collar();
	}
	//7.将setName()添加到栈上，并将dogName参数作为其局部变量
	void setName(String dogName){
	//8. name的实例对象也引用String对象
	name=dogName;
	}
	//9. 程序执行完成后，setName()将会完成并从栈中清除，此时，局部变量dogName也会消失，尽管它所引用的String仍在堆上
	}
	```
5. 垃圾回收机制

    1）什么叫垃圾回收机制？

        垃圾回收是一种动态存储管理技术，它自动地释放不再被程序引用的对象，按照特定的垃圾收集算法来实现资源自动回收的功能。当一个对象不再被引用的时候，内存回收它占领的空间，以便空间被后来的新对象使用，以免造成内存泄露。   

    2） java的垃圾回收有什么特点？

        JAVA语言不允许程序员直接控制内存空间的使用。内存空间的分配和回收都是由JRE负责在后台自动进行的，尤其是无用内存空间的回收操作(garbagecollection,也称垃圾回收)，只能由运行环境提供的一个超级线程进行监测和控制。

    3）垃圾回收器什么时候会运行？

        一般是在CPU空闲或空间不足时自动进行垃圾回收，而程序员无法精确控制垃圾回收的时机和顺序等。

    4）什么样的对象符合垃圾回收条件？

        当没有任何获得线程能访问一个对象时，该对象就符合垃圾回收条件。

    5）垃圾回收器是怎样工作的？

        垃圾回收器如发现一个对象不能被任何活线程访问时，他将认为该对象符合删除条件，就将其加入回收队列，但不是立即销毁对象，何时销毁并释放内存是无法预知的。垃圾回收不能强制执行，然而Java提供了一些方法（如：System.gc()方法），允许你请求JVM执行垃圾回收，而不是要求，虚拟机会尽其所能满足请求，但是不能保证JVM从内存中删除所有不用的对象。 

    6）一个java程序能够耗尽内存吗？

         可以。垃圾收集系统尝试在对象不被使用时把他们从内存中删除。然而，如果保持太多活的对象，系统则可能会耗尽内存。垃圾回收器不能保证有足够的内存，只能保证可用内存尽可能的得到高效的管理。

    7）如何显示的使对象符合垃圾回收条件？

        （1） 空引用 ：当对象没有对他可到达引用时，他就符合垃圾回收的条件。也就是说如果没有对他的引用，删除对象的引用就可以达到目的，因此我们可以把引用变量设置为null，来符合垃圾回收的条件。
```
StringBuffer sb = new StringBuffer("hello");
System.out.println(sb);
sb=null;
```
        （2） 重新为引用变量赋值：可以通过设置引用变量引用另一个对象来解除该引用变量与一个对象间的引用关系。     
```
StringBuffer sb1 = new StringBuffer("hello");
StringBuffer sb2 = new StringBuffer("goodbye");
System.out.println(sb1);
sb1=sb2;//此时"hello"符合回收条件
```
	（3） 方法内创建的对象：所创建的局部变量仅在该方法的作用期间内存在。一旦该方法返回，在这个方法内创建的对象就符合垃圾收集条件。有一种明显的例外情况，就是方法的返回对象。
```
public static void main(String[] args) {
    Date d = getDate();
    System.out.println("d = " + d);
}
private static Date getDate() {
    Date d2 = new Date();
    StringBuffer now = new StringBuffer(d2.toString());
    System.out.println(now);
    return d2;
}
```
	（4） 隔离引用：这种情况中，被回收的对象仍具有引用，这种情况称作隔离岛。若存在这两个实例，他们互相引用，并且这两个对象的所有其他引用都删除，其他任何线程无法访问这两个对象中的任意一个。也可以符合垃圾回收条件。
```
public class Island {
        Island i;
        public static void main(String[] args) {
                    Island i2 = new Island();
                    Island i3 = new Island();
                    Island i4 = new Island();
                    i2.i=i3;
                    i3.i=i4;
                    i4.i=i2;
                    i2=null;
                    i3=null;
                    i4=null;
        }
}
```
 	8）垃圾收集前进行清理------finalize()方法

        java提供了一种机制，使你能够在对象刚要被垃圾回收之前运行一些代码。这段代码位于名为finalize()的方法内，所有类从Object类继承这个方法。由于不能保证垃圾回收器会删除某个对象。因此放在finalize()中的代码无法保证运行。因此建议不要重写finalize();

6. final问题

    final使得被修饰的变量"不变"，但是由于对象型变量的本质是"引用"，使得"不变"也有了两种含义：引用本身的不变?，和引用指向的对象不变。
```
//引用本身的不变，
final StringBuffer a=new StringBuffer("immutable");
final StringBuffer b=new StringBuffer("not immutable");
a=b;//编译期错误

//引用指向的对象不变
final StringBuffer a=new StringBuffer("immutable");
a.append(" broken!"); //编译通过
```
final只对引用的"值"(也即它所指向的那个对象的内存地址)有效，它迫使引用只能指向初始指向的那个对象，改变它的指向会导致编译期错误。至于它所指向的对象的变化，final是不负责的。这很类似==操作符：==操作符只负责引用的"值"相等，至于这个地址所指向的对象内容是否相等，==操作符是不管的。另一个例子：
```
public class Name {
private String firstname;
private String lastname;
public String getFirstname() {
return firstname;
}
public void setFirstname(String firstname) {
this.firstname = firstname;
}
public String getLastname() {
return lastname;
}
public void setLastname(String lastname) {
this.lastname = lastname;
}
 
 //编写测试方法：
public static void main(String[] args) {
final Name name = new Name();
name.setFirstname("JIM");
name.setLastname("Green");
System.out.println(name.getFirstname()+" "+name.getLastname());
}
}
```
 许多程序漏洞都基于此----final只能保证引用永远指向固定对象，不能保证那个对象的状态不变。在多线程的操作中,一个对象会被多个线程共享或修改，一个线程对对象无意识的修改可能会导致另一个使用此对象的线程崩溃。一个错误的解决方法就是在此对象新建的时候把它声明为final，意图使得它"永远不变"。其实那是徒劳的。同时注意一下这里：对于类变量，Java虚拟机会自动进行初始化。如果给出了初始值，则初始化为该初始值。如果没有给出，则把它初始化为该类型变量的默认初始值。但是对于用final修饰的类变量，虚拟机不会为其赋予初值，必须在constructor (构造器)结束之前被赋予一个明确的值。

参考：
[http://blog.csdn.net/tutngfei1129287460/article/details/7383480](http://blog.csdn.net/tutngfei1129287460/article/details/7383480)
test
