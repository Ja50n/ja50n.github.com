---
layout: post
title: "改用 Valine 作为博客评论系统"
date: 2018-11-07 18:00:00
postid: post181107
categories: [Method]
tags: [评论, Valine, LeanCloud]
published: true
comments: true
---

大家都会在博客里添加评论系统，有评论就有社交的感觉，就能交到更多的朋友（虽然我的博客更像我自己的后花园，没种什么好看的花，也没什么人来光顾）。
最早使用的评论系统是`多说`，当时用着还是挺舒服的，速度快，可自定义项也丰富。可是后来`多说`停止服务了。

<!--more-->

然后忙着找其他的来代替，对比了几个，发现`来必力`相对来说是我那会儿最好的选择。配置也很简单。用了有一段时间，没人评论过。本来没太在意，很少去跟别人交流，没什么人知道这个博客也很正常。最近跟别人互动频繁了一些，又开始重新审视这个问题。总结来必力有两点问题：

1. 加载速度慢。这个其实早就发现了，特别是手机端。翻到页底还要加载一会儿评论框才能完整的加载出来；
2. 访客评论不太方便。虽然来必力支持社交登录，但是微信/QQ等登录我自己在手机上试发现总是没发跳转到登录页面，访客登录还得设个密码，很是不便。

所以准备还换掉`来必力`。

最开始不知道有`Valine`这个东西，而是看到别人使用过`github issues`来做评论系统，bd后知道是一款由国内大神imsun开发的基于github issues的评论系统[ gitment ](https://github.com/imsun/gitment)，因为我的博客是`Jekyll` + `Github Pages`，想用它来做评论系统来着。

不过与此同时，我在搜索结果里得知了[ Valine ](https://valine.js.org/)，基于[ LeanCloud ](https://leancloud.cn/)的评论系统。详细了解过后，发现这个更好，更方便。

直接动手将二者全部都配置到博客里面去了。加上之前的`来必力`，三者同时保留配置，使用`_config.yml`来设置具体使用哪个，不用的就暂且留着吧。

目前使用的是`Valine`。希望自己坚持多写写东西，好坏不讲，至少是个锻炼。

最后放几个`gitment`和`Valine`的配置方法：

1. **gitment**
> [gitment](https://github.com/imsun/gitment)：github 源仓库
> 
> [在Jekyll博客添加评论系统：gitment篇](https://www.cnblogs.com/jacobpan/archive/2017/07/18/7200512.html)
2. **Valine**
> [Valine - 一款快速、简洁且高效的无后端评论系统](https://valine.js.org/)：Valine 配置方法。
> 
> [Valine Admin 配置手册](https://panjunwen.com/valine-admin-document/)：Valine Admin 是 Valine 评论系统的扩展和增强，主要实现评论邮件通知、评论管理、垃圾评论过滤等功能