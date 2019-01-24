---
title: 项目RPM打包
date: 2017-02-22 14:18:59
tags: rpm
categories: Linux
---
Take server-info-portlet as example
Login 172.26.100.202
Download project source code into target version folder:
<!--more-->
svn export --force --your_username http://hsvsvn.sanmina-sci.com/SES/Scion/trunk/mesportal/server-info-portlet/ /home/mfguser/rpmbuild/rpm/SOURCES/mes-portal/server-info-portlet/svn/1.12.7.160317
Edit file /home/mfguser/rpmbuild/rpm/SPECS/mes-port/1.4/server-info-portlet.spec
change version, add change log ...
Package: bb /home/mfguser/rpmbuild/rpm/SPECS/mes-port/1.4/server-info-portlet.spec
Copy generated rpm to repository (see above command output)
cp /home/mfguser/rpmbuild/rpm/RPMS/mes15_portal_server-information-1.12.7.160317-1.i386.rpm /home/mfguser/rpmbuild/mes-portal_repo_cdc/rpms/
Upload rpm data to 172.26.100.202
sh /root/upload_mes-portal_rpm.sh local




On other machine install the latest package (run as root)

yumconfig (Optional, confirm is 172.26.100.202)
yum clean all
yum remove mes15_portal_server-information-1.12.....
yum install mes15_portal_server-information

test
