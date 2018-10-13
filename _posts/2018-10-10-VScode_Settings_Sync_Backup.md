---
layout: post
title: "备份 VS Code - Settings Sync 插件的 User Settings"
postid: post181010
date: 2018-10-10 13:19:13
tags: [Visual Studio Code]
categories: [Backup]
published: false
comments: true
---

备份同用于同步 VS Code 配置和插件的 Sync Settings 插件参数。

{% highlight python linenos %}
{
    "gist_id": "60c045c85986c0d3db0eb1cb7dec8ceeb5cdc892"
}
{% endhighlight %}

<!--more-->

附：Settings Sync 插件使用方法
> 1. Settings Sync是vscode中同步设置和安装插件的小工具，在扩展商店中搜索并安装它
> 2. 登陆Github>Your profile> settings>Developer settings>personal access tokens>generate new token，输入名称，勾选Gist，提交;
> 3. 保存Github Access Token;
> 4. 打开vscode，Ctrl+Shift+P打开命令框，输入sync，找到update/upload settings，输入Token，上传成功后会返回Gist ID，保存此Gist ID;
> 5. 若需在其他机器上DownLoad插件的话，同样，Ctrl+Shift+P打开命令框，输入sync，找到Download settings，会跳转到Github的Token编辑界面，点Edit，regenerate token，保存新生成的token，在vscode命令框中输入此Token，回车，再输入之前的Gist ID，即可同步插件和设置。