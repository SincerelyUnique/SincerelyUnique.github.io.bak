---
title: vision server installation guide
date: 2017-03-2 13:15:15
tags: 
categories: Research
---
Purpose
Vision consists of server side and portlet/dashboard side, server side is deployed to Vision server box and portlet/dashboard side is deployed to Portal box.

<!--more-->

This document descripes how to install vision server.

Before Installation
Before installation, assume you got one VM from Amazon, Amazon Linux AMI is necessary.

If you want to reinstall or upgrade vision server only, please skip these steps.

How to know if it's a new installation or upgrade?
```
rpm -qa | grep -i tomcat-8.5-8.x86_64
rpm -qa | grep -i jdk1.8.0_111.x86_64
rpm -qa | grep -i VisionServerRefLib
rpm -qa | grep -i vision-server-1.0.0.161124-1
```
Pre-condition:
The EC2 server has at least 4GB memory.
It is expected that the OS can be installed on a separate 8GB partition and leaving an empty partition (100GB minimum) for installing Vision Server
Scope and Conditions:
The steps below are based on an empty Amazon cloud server machine, if it's not empty, in other words, if the Amazon server's hard drive and associated environment has been prepared for SPC server, you can skip some steps and can directly install Vision server RPM packages(step 10-Install Vision RPM), and Restart Apache tomcat.

Install OS/ CentOS
You can go to Amazon website(aws.amazon.com) to buy it.
Now you have a Amazon Cloud Server(AWS EC2).

Assume we use CentOS 7,Now we create partition for the the server,we choose LVM(Logical Volume Manager) to manage our disk partition.

1. Create LVM Partition
First check our physical disk information ,to confirm your server disk exist and work.
```
fdisk -l
```
Then create PV(Physical Volume) , VG(Volume Group) and LV(Logical Volume) partition.pay attention that you must create at least one partition for each of them,it means that PV,VG and LV can not empty.
In PV partition:
  	we will create “xvdf” point to our equipment,this is device access interface point.
In LV partitions:
we will create “swp” for recovery data.
we will create “bkup” for backup.
we will create “home” as our root catalog.home directory.
we will create “tmp” for run program,this is a buffer area for current running program.
we will create “var” for store some cache file or lock file.
we will create “log” for store all log  information.
```

lvm pvcreate /dev/xvdf
lvm vgcreate vgsys /dev/xvdf
lvm pvs
lvm lvcreate -L8G -nlvswp vgsys
lvm lvcreate -L10G -nlvbkup vgsys
lvm lvcreate -L10G -nlvhome vgsys
lvm lvcreate -L5G -nlvtmp vgsys
lvm lvcreate -L10G -nlvvar vgsys
lvm lvcreate -L10G -nlvlog vgsys

lvm pvs

```
2. Format Hard Driver
You must format the disk,or you won’t use the partition correctly.
Format the partitions that you build in previous steps. “-j” means show log(ext3) information.
```

mke2fs -j /dev/vgsys/lvbkup
mke2fs -j /dev/vgsys/lvhome
mke2fs -j /dev/vgsys/lvtmp
mke2fs -j /dev/vgsys/lvlog
mke2fs -j /dev/vgsys/lvvar
```
3. Copy Previous Folder to LVM Folder
When you complete above steps,now you need mount it to “/mnt” catalog.
This step show how to mount the disk partition which we build.

```

mount /dev/vgsys/lvhome /mnt
rsync -az --progress /home/  /mnt/
umount /mnt
mount /dev/vgsys/lvvar /mnt
rsync -az --progress /var/ /mnt/
umount /mnt
```
4. vi /etc/fstab and add
This file is responsible for partition automatically mount configuration when Linux boot,you can find the LV partitions we have created before.set column 4 “defaults”,it is very important in this file.
```
/dev/vgsys/lvvar     	/var                	ext3	defaults    	1 2
/dev/vgsys/lvlog     	/logs                ext3	defaults    	1 2
/dev/vgsys/lvbkup     	/Bkup               ext3	defaults    	1 2
/dev/vgsys/lvhome    	/home              ext3	defaults    	1 2
/dev/vgsys/lvtmp     	/tmp                	ext3	defaults    	1 2
```
5. Check System Date Setting
We must ensure our system date setting is correct, or the vision server security authorize will error.input this code to check system date:
```
date
```
Then you will get an information like this :”Fri Dec 16 12:55:29 CST 2016”

If the date isn’t correctly,reset the date like this:
```

date -s “01:01:01 2008-05-23”
```
If the timezone also incorrectly, please reset it(for example:”Shanghai”):
```

vi /etc/sysconfig/clock
# The timezone of the system is defined by the contents of /etc/localtime.
ZONE="Asia/Shanghai"
UTC=true
ARC=false
cd /usr/share/zoneinfo
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
6. Run Linux Command “ mount -a ” to Remount Folders
```
mount -a 
```
7. Create Folders & Files
Now we create the forders we need for our project.
create a logs folder for vision server log4j output catalog. in epanel we create 3 log file,one is error log,one is debug log,the last one is console output information.
We also create a tomcat folder for install tomcat server and java folder for install JDK
```

mkdir -p /logs/epanel
cd /logs/epanel
touch LineStatusMonitorError.log
touch LineStatusMonitorDebug.log
touch LineStatusMonitorInfo.log
mkdir -p /usr/local/tomcat
mkdir -p /usr/java
```
8. Get & Install sudo-patch from HSV CDC Develop FTP
Download sudo-patch file by ftp method. the server 172.26.100.202 is sanmina corp rpm packages repository.
Then install sudo-patch file.
```
wget ftp://sfdc3:sfdcadmin@172.26.100.202/vision/rpms/sudo-patch-1.0-02.i386.rpm
 rpm -i sudo-patch-1.0-02.i386.rpm
```
Tomcat and JDK Installation 
After install sudo-patch, next you need install Tomcat and JDK.
Tomcat 8 or above is required, JDK 1.8 or above is required
 6.4 bits is required. (check by below commond) 
```
uname-i
```
Now install Tomcat and JDK(default is x86-64).
```
Step 1: yum install jdk1.8.0_111.x86_64                (default install path: /usr/java/... )    (258M)
Step 2: yum install tomcat-8.5-8.x86_64                (default install path: /usr/local/tomcat/... )  (15M)  
```
Set the Tomcat portal, recommend to use “9080” for vision server:
```

Step 1: vi /usr/local/tomcat/tomcat-8.5-8.x86_64/conf/server.xml                             (check port)
Step 2: -i                                                                                                                    (find and edit)
<Server port="9005" shutdown="SHUTDOWN">
<Listener className="org.apache.catalina.startup.VersionLoggerListener"/>
 
<Connector connectionTimeout="20000" port="9080" protocol="HTTP/1.1"  
redirectPort="8443"/>

<Connector port="9009" protocol="AJP/1.3" redirectPort="8443"/>                       (OK,press “ESC”)
Step 3: :wq                                                                                                         (login out and save)
```
Vision Server Installation
1. Install Vision RPM
Install neccessary dependencies(some neccessary jar files) 
Install vision server
```

Step 1: yum install VisionServerRefLib                   (default install path: /usr/local/tomcat/... )  (34M)
Step 2: yum install vision-server-1.0.0.161124-1    (default install path: /usr/local/tomcat/...)  (49M) 
```
3. (Optional) Edit Access-MES-Interval
This setting determines how frequently the background jobs access database to get fresh production data. By default, it’s 5 minutes, you can change it by editing  webapps/mes-dashboard-server/WEB-INF/thread.properties
```
accessMESInterval=5           
```
4. Start (/Restart) Tomcat
Great, after having done all environment settings as above steps, now start the Tomcat
```

sh /usr/local/tomcat/apache-tomcat-8.5.8/bin/startup.sh
```
You can input http://host:9080 to check tomcat is working or not, you can check your IP address:
```
ifconfig                                                                         (change “host” to the right host/IP)
```

Optional
1. Add Tomcat User
If you want to access tomcat home page in your browser, you can add a tomcat user like this:     
(after start tomcat you can access to: http://{ip host}:9080/ ,click Manager App to login),
```
Step 1:  vi /usr/local/tomcat/tomcat-8.5-8.x86_64/conf/tomcat-users.xml 
Step 2: -i                                                                                                                 (edit)
            <tomcat-users>
                <role rolename="tomcat"/>
                <role rolename="role1"/>
                <role rolename="manager-gui"/>
                <user password="tomcat" roles="tomcat" username="tomcat"/>
                <user password="tomcat" roles="tomcat,role1" username="both"/>
                <user password="tomcat" roles="role1" username="role1"/>
                <user password="s3cret" roles="manager-gui" username="tomcat"/>
           </tomcat-users>                                                                                       (OK,press “ESC”)
Step 3: :wq                                                                                                    (login out and save)
```
2. Install Swagger-ui
Go to github website: https://github.com/swagger-api/swagger-ui
Download this project and decompression it.
Go to your tomcat “webapps” folder and create a new folder named “swagger-ui”.
Copy all folders and files in “swagger-ui-master/dist” what you download to new folder.
Restart tomcat.
```
Step 1: mkdir -p /usr/local/tomcat/apache-tomcat-8.5.8/webapps/swagger-ui
Step 1: copy swagger-ui-master/dist/* /usr/local/tomcat/apache-tomcat-8.5.8/webapps/swagger-ui
Step 3: sh  /usr/local/tomcat/apache-tomcat-8.5.8/bin/shutdown.sh
Step 4: sh  /usr/local/tomcat/apache-tomcat-8.5.8/bin/startup.sh

```
