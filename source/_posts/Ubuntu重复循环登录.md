---
title: Ubuntu重复循环登录
date: 2017-02-17 12:40:58
tags: Ubuntu
categories: Linux
---
问题描述：在ubuntu的登陆器上输入密码后，屏幕闪过，然后又重新回复到刚才的输入密码界面，如此反复。
<!--more-->
一.环境变量原因
1. 在登录界面按下ctrl+alt+F1进入命令行模式
2. 输入你的用户名，然后输入密码登录
3. 然后输入:  $  /usr/bin/sudo /usr/bin/vi /etc/enviroment (  $ sudo vi /etc/environment).
4. 在vim编辑器里输入（按i插入）以下内容，就合原来里面的内容合并 PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games" 或者删除掉之前添加的 变量path。
5. 按Esc 然后按“：”输入wq 回车保存 (可以按ctrl+z退出vi编辑)
6. 输入/usr/bin/sudo /sbin/reboot 回车重启。

二.使用gdm登陆器登陆
1. 在登录界面按下ctrl+alt+F1进入命令行模式
2. 使用命令安装gdm， $ sudo apt-get install gdm
3. 配置默认登陆器选项， $ sudo dpkg-reconfig gdm  使用gdm作为默认登陆器
4. $ sudo reboot  重启登陆

三.如果是lightdm的登陆器问题，而且是不知名的问题，可以直接使用gdm登陆器来登陆。但是登陆后会需要修改相关的bash，可能和之前lightdm登陆后的PATH变量的目录不同

四. Home目录下.Xauthority文件属性问题
1. 在登录界面按下ctrl+alt+F1进入命令行模式
2. 查看home目录下的 .Xauthority文件的属性
3. ower和group是否是你的用户名。否则修改后重启 $ sudo chown yourusername:yourusername .Xauthority.

五.依赖关系
1. 在登录界面按下ctrl+alt+F1进入命令行模式
2. $ sudo apt-get -f install 或 $ sudo apt-get install install -f ,修复依赖关系，假如你的系统上有某个package无法满足依赖关系时，她会自动修复，即帮你安装这个package的依赖包

六.环境变量另一种方法

1. 重新启动，将光标停留在 recovery mode，然后按E 进入grub 编辑。
2. 在编辑的最后一行输入 rw init=/bin/bash ,然后按Ctrl+X 重启
3. 进入GRUB菜单，选择root ...(可能是resume ...) 进入命令行模式
4. 启动vim,编辑/etc/environment  命令： vi /etc/environment
5. 删除错误配置，或者正确配置后 :wq 保存并退出vim
6. reboot

七.修改profile
1. 在登陆界面，同时按下CTRL+SHIFT+F2键，进入到命令行登陆界面，此时需要输入账号和密码才能登陆。用户名的大小写需要注意，登陆界面显示的用户名一律使用的大写显示，但是实际的用户名可能是小写，需要根据实际情况填写。我登陆后如下所示：已经登陆成功了
2. 此时可以访问profile文件，但是是readonly的无法修改，所以需要先使能写操作，输入：$ mount -o remount,rw /
3. 此时是不能使用gedit命令的只能使用vi命令所以输入：$ vi /etc/profile
4. 如此就打开了prifile文件，然后输入“：i”进入插入模式，将添加的PATH整行删除，然后保存退出“：wq”就完成后对profile的修改。
5. reboot重启后，就成功进入系统了。

八.删除 .Xauthority
1. 初始化文件问题：删除.Xauthority ， Xinit 等初始文件 并重启

九.Home权限问题
1. /home权限：直接将/home  chmod 成 777的权限

十.temp权限问题
1. /tmp权限问题：找到日志文件，分析日志文件，cd 到 /home/user 里面，然后你会发现一个 启动X组件相关的日志文件：.xsession-errors文件，打开这个文件发现有以下错误： mkdtemp: private socket dir: Permission denied，可以知道在读写/tmp文件时 遇到权限问题而读写失败，所以 直接chmod 777 /tmp 后 然后 重启 就能进入桌面系统了。

附：以上信息部分转自网络，仅供参考
