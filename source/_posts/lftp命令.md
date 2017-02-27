---
title: lftp命令
date: 2017-02-21 08:43:42
tags: lftp
categories: Linux
---
```
lftp -u [username],[password] -e "mirror -R --delete --only-newer --verbose 本地目录 远程目录" [ftpsite]

# -e 告诉lftp执行连接服务器后接着运行指定命令
# mirror -R 上传目录
# --delete：删除远程备份服务器中存在的文件而本地服务器不存在的文件    
#--only-newer ：lftp只上传新的文件    
#--verbose：监视同步的进程
```
详情参考：
[http://www.ezencart.com/pages/743.html](http://www.ezencart.com/pages/743.html)
