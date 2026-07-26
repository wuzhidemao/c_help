---
title: C++ 编译错误：undefined reference to `vtable for XXX`
author: 张三
avatar: https://api.dicebear.com/7.x/avataaars/svg?seed=ZhangSan
category: 编译问题
tags: [编译错误, 虚函数, vtable]
date: 2024-01-15
---

## 问题描述

我在编译一个包含虚函数的类时，遇到了以下错误

```
undefined reference to `vtable for MyClass`
```

我的代码结构如下：

```cpp
// MyClass.h
class MyClass {
public:
    virtual void doSomething();
};

// MyClass.cpp
#include "MyClass.h"
void MyClass::doSomething() {
    // 实现
}
```

## 尝试过的解决方案

1. 确保头文件和源文件都被正确包含在编译命令中
2. 检查虚函数是否都有实现
3. 清理构建目录重新编译

但是问题依然存在，请问有什么其他可能的原因吗？

## 环境信息

- 编译器：g++ 11.2.0
- 操作系统：Ubuntu 22.04
