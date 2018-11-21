---
layout: post
title: "Cognex ViDi 培训笔记"
date: 2018-06-29 16:16:22
postid: post180629
categories: [Notes]
tags: [Cognex,Machine Vision,ViDi]
published: true
comments: true

---

##### 深度学习 [Deep Learning]
1. Abundance of Data 【大量数据】
2. Algorithms 【算法】
3. Affordare Computing Power 【GPU计算】

<!--more-->

<br>

##### 图像深度学习要点
- 图像
- 特征信息

<br>

##### 图像深度学习代表性算法：
 - **Alex Net** - a Convolutional Neural Network（CNN）

<br>

##### ViDi应用步骤
1. 标注
2. 训练
3. 验证
4. 应用

<br>

<!-- ##### ViDi应用过程
1. 图像采集
2. 特征提取
3. --
4. -- -->

<br>

##### 工具介绍

![Blue](http://myulinkblog.oss-cn-shenzhen.aliyuncs.com/18-7-29/16495628.jpg)
- **Blue**: 标注 [*FEATURE DETECTION & IDENTIFICATION*]
 
![Red](http://myulinkblog.oss-cn-shenzhen.aliyuncs.com/18-7-29/592488.jpg)
- **Red**: 检查 [*AESTHETIC VISUAL INSPECTION & SEGMENTATION*]

![Green](http://myulinkblog.oss-cn-shenzhen.aliyuncs.com/18-7-29/32677104.jpg)
- **Green**: 分类 [*SCENE TAGGING & OBJECT CLASSIFICATION*]

![Blue Read](http://myulinkblog.oss-cn-shenzhen.aliyuncs.com/18-7-29/39601969.jpg)
- **Blue Read**: OCR识读 [*Optical Character Recognition*]

<br>

##### ViDi相关特性:
- 使用PatMax为ViDi精准定位,ViDi不会做精准定位，对细节信息不敏感（尺寸、面积等）
- ViDi提取出来的特征：是区域、面积、结果...
- OCR：康耐视用自己的字库，Halcon等使用MNIST标准字库

<br>

##### 授权
- 训练版（开发版，包含VisionPro：MAX Package，时效训练版1 or 5年有效，到期续费，可中断）
- 运行版（包含不同功能的版本，Red、Blue、Green，永久有效。软件升级需要续费）
> VisionPro也有两个版本的加密狗

<br>

##### 性能选项
- BASE - 基础版：相当于人检速度，在客户一块NVidia GPU卡上运行，适用于汽车行业；
- STANDDARD - 标准版：在客户一块NVidia GPU卡上运行
- ADVANCED - 高级版：在客户多块NVidia GPU卡上运行

<br>

<!-- ##### 代理商名称：ViDi PSI
> 尚菱
> 贝特威

<br> -->

##### 聚焦
- 植入ViDi概念到每个客户规划会议中
- 关注人工检查工位
- 表面缺陷检查
- 组装验证
- OCR字符识别
- 阐述深度学习VS人工检查
- 分析投资回报率
- 较长销售周期的心理准备，部署前需要几个月的工厂验证时间
- 控制项目风险，最初阶段只对有限信息。

<br>

##### 为应用选择合适的工具
- ViDi
    + 复杂背景下的无规则异类检查
    + 即便形态的物体定位
    + 变形字体的OCR
- VisionPro
    + 精确定位
    + 精确测量
    + 读码（暗码ViDi读不出来，就像人眼读不出来二维码一样，ViDi属于WYSIWYG）
