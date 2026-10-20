---
title: "【题解】洛谷 P4933 —— 等差子序列计数（DP + 哈希表）"
published: "2026-01-23"
originalPublished: "2026-01-23T21:00:00+08:00"
category: 算法题解
tags: ["算法", "ACM"]
description: "按最后一项和公差分类，用 DP 与哈希表统计等差子序列。"
draft: false
---

> 题目链接：[P4933 大师](https://www.luogu.com.cn/problem/P4933)

<br>
   

## 思路

> 把“等差子序列”按 **最后一项** 和 **公差** 分类。  
> 逐个枚举位置 $i$ 作为最后一项，用哈希表维护：  
> “以 $a_i$ 结尾、某个公差 $d$ 的等差子序列有多少个”。

<br>
   

## 状态

设输入数组为 $a[0..n-1]$ , 约定 $a[i]$ 为 $a_i$ 。

> **定义状态：**  
> $dp[i][d]$ 表示：以 $a_i$ 结尾、公差为 $d$ 的等差子序列个数（长度 ≥ 2）。

<br>   

## 转移方程

固定 $i$，枚举所有 $j < i$，令 $d = a_i - a_j$

此时会产生两类贡献：

1. **新长度为 2 的等差子序列**：$(a_j, a_i)$  
   贡献 $+1$

2. **把所有以 $a_j$ 结尾、公差同为 $d$ 的等差子序列接上 $a_i$**  
   贡献 $+dp[j][d]$

因此：

> $dp[i][d] += dp[j][d] + 1$

完整状态转移方程如下：

$$
dp[i][a_i-a_j] = dp[i][a_i-a_j] + dp[j][a_i-a_j] + 1
$$

$$
cnt  \;\; +\!\!= \sum_{j>=0}^{i-1} dp[j][a_i-a_j] + 1
$$


同时，题目要求统计所有等差子序列总数。  
每次转移新增了 $dp[j][d] + 1$ 个合法子序列，所以直接累加到答案即可。



> 外层 $i$，内层 $j$：时间复杂度 $O(n^2)$  
> 使用 哈希表(unordered_map) 按需存储不同公差，减少内存使用。

<br>
   
   
## 代码实现

> 下面代码按照上述 DP 直接实现：  
> $dp[i]$ 是一个哈希表：key 为公差，value 为方案数。  
> 每次枚举 $(j, i)$ 更新 $dp[i][d]$，并把新增数量累加到 $cnt$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
const i64 Z = 998244353;

int main(){
    i64 n;cin>>n;
    vector<i64> a(n);for(i64& x:a)cin>>x;

    // dp[i][d]：以a[i]结尾、公差为 d 的（长度>=2）等差子序列数量
    vector<unordered_map<i64,i64>> dp(n);

    i64 cnt = 0;
    for(int i=0;i<n;++i){
        cnt++;
        for(int j=i-1;j>=0;--j){
            dp[i][a[i]-a[j]] += dp[j][a[i]-a[j]]+1;
            dp[i][a[i]-a[j]] %= Z;
            cnt += dp[j][a[i]-a[j]]+1;
            cnt %= Z;
        }
    }
    cout<<cnt<<endl;
    return 0;
}
```
