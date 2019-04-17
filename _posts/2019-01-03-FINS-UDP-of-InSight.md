---
layout: post
title: In-Sight 与 OMRON PLC 使用 FINS/UDP 方式通讯
date: 2019-01-03 17:59:10
postid: post190103
categories: [Life]
tags: 
    - code
    - 通讯
    - In-Sight
published: true
comments: true
hand-excerpt: false
header-img: https://ja50n-1251581744.cos.ap-guangzhou.myqcloud.com/20190103134143.png
---

上一篇博客（[再见2018.祝愿2019](https://blog.ulinkmega.com/life/2018/12/31/goodbye-2018/)）说到之前去烟台测试新项目。那个项目客户规定与他们的OMRON PLC通讯要使用FINS/UDP方式。之前没接触过OMRON的PLC，也不知道这个FINS/UDP是什么协议。如果我们使用PC写程序，不管是什么通讯方式肯定都有办法能做，不过我们使用的是**COGNEX**的**In-Sight**智能相机，官方支持的协议里面没有FINS，所以得实际测试一下。

从公司仓库找到一个**CP1E-N30S1DR-A**型号的OMRON PLC，结果没有网络模块，而且还不支持**CP1W-CIF41**模块网络模块。幸好我在某宝找了一个**TK 6000-CP**通讯模块可以支持，万能的马爸爸！

然后FINS协议方面，查了些资料，发现OMRON的`FINS协议`跟三菱的`MC协议`有些类似，本质上还是一个TCP或UDP通讯，这个In-Sight智能相机是支持的。只不过发送给PLC的命令需要封装成特定的格式，以此进行读写寄存器等操作；同样，PLC返回的数据也是特定格式的。那么重点就在于怎么用In-Sight智能相机做数据格式转换了。

最终测试成功，做个记录。

### 一、 FINS/UDP的命令格式：

#### 1. 读取：

读取命令实例：读取DM区3个字, 从DM100H开始:

```
80 00 02 00 41 00 00 0B 00 00 01 01 82 00 64 00 00 03

# 说明：

80 00 02    :固定帧头
00 41 00    :PLC的网络号，节点号，单元号
00 0B 00    :PC 的网络号，节点号，单元号
00 01 01    :SID+MRC+SRC，00 01 01表示读取，00 01 02表示写入
82          :表示DM区
00 64       :首地址
00          :固定
00 03       :读取数量
```

读取命令响应:读取到D100=`0x1388`, D101=`0x1770`, D102=`0x1B58`

```
C0 00 02 00 0B 00 00 41 00 00 01 01 00 00 13 88 17 70 1B 58

# 说明

C0 00 02    :固定帧头
00 0B 00    :PC 网络号，节点号，单元号
00 41 00    :PLC网络号，节点号，单元号
00 01 01    :SID+MRC+SRC，00 01 01表示读取，00 01 02表示写入
00 00       :固定（错误码）
13 88       :数据1
17 70       :数据2
1B 58       :数据3
```
---

#### 2. 写入

写入命令实例：将D100=`0x0001`, D101=`0x0002`, D102=`0x0003`，写入DM区:

```
80 00 02 00 41 00 00 0B 00 00 01 02 82 00 64 00 00 03 00 01 00 02 00 03

# 说明

80 00 02    :固定帧头
00 41 00    :PLC的网络号，节点号，单元号
00 0B 00    :PC 的网络号，节点号，单元号
00 01 01    :SID+MRC+SRC，00 01 01表示读取，00 01 02表示写入
82          :表示DM区
00 64       :首地址
00          :固定
00 03       :读取数量
00 01       :数据1
00 02       :数据2
00 03       :数据3
```

写入命令响应:

```
C0 00 02 00 0B 00 00 41 00 00 01 02 00 00 

# 说明

C0 00 02    :固定帧头
00 0B 00    :PC 网络号，节点号，单元号
00 41 00    :PLC网络号，节点号，单元号
00 01 02    :SID+MRC+SRC，00 01 01表示读取，00 01 02表示写入
00 00       :固定（错误码），00 00表示写入成功
```

### 二、 In-Sight格式化处理 FINS/UDP命令：

上面说到FINS/UDP通讯方式本质上还是UDP通讯，所以在In-Sight中的建立一个UDP连接：
`UDPDevice("192.168.2.178",9600,1000,1)`

![UDPDevice](https://ja50n-1251581744.cos.ap-guangzhou.myqcloud.com/20190103151448.png)

注意：勾选二进制信息包，使用二进制方式通讯。


#### 1. In-Sight读取PLC数据

1. 添加`ReadDevice()`函数，读取UDP接收到的数据。
2. 解析UDP接收到的数据，接受到的数据属于二进制结构，根据上面的FINS命令响应格式，我们需要进行解析数据。使用`BGetInt(N3,14,2,0,0)`，意为将二进制结构中第14个字节开始（即数据区起始位置）的第一个字转换成有符号整型。依次类推转换其他数据。
>- `BGetInt(Binary, Offset, Bytes,[Sign], [Byte/Word Order])`的函数解释：
>   - 返回结构中的整数值。
>   - Binary：Reference to a Binary,Query or a Device structure, returned from a BStringf, TCPDevice or QueryDevice function (respectively).
>   - Offset：Specifies the Offset, in bytes.
>   - Bytes：1, 2, or 4.
>   - Sign：0 = signed(default) ，1 = unsigned.
>   - Byte/Word Order：Specifies the byte order for words and bytes read by thefunction.
>     - 0 = Big Endian(default)
>     - 1 = Little Endian
>     - 2 = Big Endian with 16-bit word swapping
>     - 3 = Little Endian with 16-bit word swapping
3. 将命令FINS格式化后，备用：![格式化FINS命令](https://ja50n-1251581744.cos.ap-guangzhou.myqcloud.com/20190103160708.png)
4. 添加`BStringf(0,"%c",N10,N11,N12...)`命令，根据指定的格式返回二进制结构，因为我们使用二进制信息包，所以我们把要发送的命令封装成二进制结构。这里要封装的命令就是上文中读取DM寄存器的FINS格式命令。![BStringf-read](https://ja50n-1251581744.cos.ap-guangzhou.myqcloud.com/20190103162222.png)
5. 添加`WriteDevice(N28>420,N1,P7)`，指定条件，将命令发出去。实际上发送数据在接受数据之前，先发送一个读取数据命令给PLC，然后PLC将数据返回，这个时候才开始步骤1和步骤2的接收和解析工作。

#### 2. In-Sight写入PLC数据

1. 将命令FINS格式化后，同上面步骤3；
2. 添加`BStringf(0,"%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%c%h",N10,N11,N12,...)`命令，也是根据指定的格式返回二进制结构。这里要封装的命令就是上文中写入DM寄存器的FINS格式命令。但是注意，FINS固定帧头转化成一个个字节，数据区每个数据转换成一个字。![BStringf-write](https://ja50n-1251581744.cos.ap-guangzhou.myqcloud.com/20190103165418.png)
3. 添加`WriteDevice($A$0,N1,N7)`，指定条件，将命令发出去。




 

