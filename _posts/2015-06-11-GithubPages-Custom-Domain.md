---
layout: post
title: "Github Pages绑定godaddy注册的域名"
postid: post0611
date: 2015-06-11 22:50:00
tags: [Github Pages, Web]
categories: [Method]
published: True
comments: True
---

使用GitCafe Pages服务来搭建博客时就计划了要使用自定义的域名，一是为了更专业，二是对于普通人来说 `username.gitcafe.io` 这个域名太难记了。原计划在博客完成后期去考虑配置自定义域名，所以最终没有给GitCafe Pages配置，现在整个站点已经完全迁移到了Github上。最近看到由网友分享将博客同步提交到GitCafe和Github，而且针对IP地址进行解析，境内解析到GitCafe，境外解析到Github。有时间的时候准备也这样做一下。

<!--more-->

本文参考多篇网络教程，结合操作实际情况，汇总而成，文末由参考文章链接。不同时期由于github Pages配置方法和godaddy设置界面会有所升级改变,此方法适用2015年6月以后。

首先,需要在Github Pages项目的根目录下,添加一个CNAME文件,不需要后缀名,在文件中写入你要绑定的域名,如 `xxx.com` 或者 `blog.xxx.com` ,不需要 `http` 或 `www` 前缀。

##### 方法一:使用godaddy默认域名解析服务

1.进入 [godaddy] 域名管理界面

2.进入DNS管理，找到 `nameservicers / 域名服务器` 选项,点击 `Manage / 管理` ,确认域名解析地址为godaddy默认地址

3.进入DNS Zone File选项

* 在 `A` 记录中添加Github主机地址 `192.30.252.153` ,地址会有变动,使用 `ping github.com` 获取最新主机地址.
* 在 `CNAME` 中将 `WWW` 指向 `username.github.io` ,如果是二级域名,如blog,也是一样设置(二级域名配置未验证,如有错误,欢迎指正)

<br>

---

<br>

##### 方法二:使用国内 [DNSPod] 域名解析服务

由于godaddy域名解析服务在国内不是很稳定,所以可以使用国内的 [DNSPod].

1.注册或者使用QQ/微信登录DNSPod

2.在我的域名管,添加你的域名,然后解析
3.点击添加的域名,进入记录管理,添加A记录和CNAME记录

![](https://myulinkblog.oss-cn-shenzhen.aliyuncs.com/20180911222606.png)

4.进入godaddy域名管理界面,同方法一

5.将 `nameservicers / 域名服务器` 设置为 `custom / 自定义` ,写入DNSPos的两个默认地址,如:

> `f1g1ns1.dnspod.net`
>
> `f1g1ns2.dnspod.net`

![](https://myulinkblog.oss-cn-shenzhen.aliyuncs.com/20180911222802.png)

然后等待域名解析服务完成。


> 参考文章:
> 
> [使用Github Pages建独立博客](http://beiyuu.com/Github-Pages/) - BeiYuu
> 
> [在Godaddy上给Github Pages配置自定义域名](http://jingchao.me/zai-godaddyshang-gei-Github-Pagespei-zhi-zi-ding-yi-yu-ming.html) - 荆超的小站
> 
> [Github Pages绑定自定义域名说明](https://coderq.com/t/Github-Pagesbang-ding-zi-ding-yi-yu-ming-shuo-ming/90) - 码农圈



[DNSPod]:https://www.dnspod.cn/
[godaddy]:http://godaddy.com/