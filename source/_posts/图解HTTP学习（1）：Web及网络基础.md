---
title: 图解HTTP学习（1）：Web及网络基础
date: 2017-02-21 09:33:22
tags:
categories: Protocol
---
*摘要: 推荐书籍：《图解HTTP》《HTTP权威指南》《TCP/IP详解，卷1》*
<!--more-->
1. 使用HTTP协议访问Web

    （1）根据web浏览器地址栏中指定的url，web浏览器从web服务器端获取文件资源等信息，从而显示web界面

    （2）客户端：通过发送请求获取服务器资源的web浏览器等

    （3）web是建立在HTTP协议上通信的

2. HTTP的诞生

    （1）时间：1989年，1996年成为标准，HTTP/1.0（记载于RFC1945，目前为HTTP/1.1，标准为RFC2616）

    （2）三项www构建技术：①把SGML作为页面的文本标记语言的HTML； ②最为文档传递协议的HTTP； ③指定文档所在        地址的URL

    （3）1990，CERN诞生第一台web服务器和web浏览器；1993，Mosaic问世；1994，Netscape Navigator；1995，IE问世

    之后是Apache服务器，2004，Firefox问世，之后Chrome，opera等

3. 网络基础TCP/IP

    （1）网络是在TCP/IP协议族的基础上运作的，规则--协议protocol

    （2）广义TCP/IP协议：IEEE802.3，TCP，IP，UDP，ICMP，HTTP，FDDI，FTP，SNMP，PPPOE等

    （3）协议族分层：应用层，传输层，网络层，数据链路层

    （4）应用层：向用户提供应用，FTP，DNS，HTTP

    （5）传输层：网络连接中两台计算机之间的数据传输，TCP，UDP

    （6）网络层：处理网络上流动的数据包，含传输线路，选线，路径，IP

    （7）链路层：网络接口，硬件部分，网卡，光纤，适配器等物理可见部分

    （8）TCP/IP传输流：HTTP客户端--TCP--IP--网络链路--IP--TCP--HTTP服务器

![](http://static.oschina.net/uploads/space/2016/0310/195503_Aqif_2550349.jpg)
![](http://static.oschina.net/uploads/space/2016/0310/195600_9iBR_2550349.jpg)
![](http://static.oschina.net/uploads/space/2016/0310/195612_XIXZ_2550349.jpg)
    （9）IP：作用是把各种数据包传送给对方，有两个重要条件：IP地址和MAC地址，IP地址指节点被分配到的地址，MAC地

	址指网卡所属的固定地址，IP地址可变，IP地址与MAC地址配对

    （10）使用ARP协议凭借MAC地址进行通信：IP间通信依赖MAC地址，ARP可解析地址，根据通信方IP反查对应的MAC地

	址，属于中转协议，但通信细节无法预知

    （11）TCP：字节流服务，大块数据分割成报文段，为了便于传送大数据，采用三次握手策略：SYN--SYN/ACK--ACK，

	如果中断，重新来过
![](http://static.oschina.net/uploads/space/2016/0310/200943_q0as_2550349.png)
    （12）DNS：提供域名到IP地址之间的解析服务，域名请求IP

4. URI和URL：统一资源标识符和统一资源定位符

    （1）URI：某个协议方案表示的资源的定位标识符（协议方案指协议类型，如HTTP协议类型），当前URI协议方案30多个

    （2）URL：表示资源的地点，是URI的子集

    （3）URI格式：http://user:pass@www.example.com.jp:80/dir/index.htm?uid=1#ch1

	协议方案名+登录信息+服务器地址+服务器端口号+带层次的文件路径+查询字符串+片段标识符

    （并不是所有的应用程序都符合RFC）
