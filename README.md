# CanisMinor ACT

`ACT` `OverlayPlugin` `FFXIV` `React` `Redux`

FF14 ACT OverlayPlugin Skin: [Online](http://ffxiv.canisminor.cc)

## OverView

![](http://qn.canisminor.cc/2017-10-23-1.png)
![](http://qn.canisminor.cc/2017-10-23-2.png)
![](http://qn.canisminor.cc/2017-10-23-3.png)
![](http://qn.canisminor.cc/2017-10-23-4.png)
![](http://qn.canisminor.cc/2017-10-23-5.png)
![](http://qn.canisminor.cc/2017-10-23-6.png)

<br />

## 安装

- 下载最新版`OverlayPlugin`: [Latest](https://github.com/hibiyasleep/OverlayPlugin/releases)
- 或直接下载ACT整合包: [NGA](http://bbs.ngacn.cc/read.php?tid=12526945)
- DPS统计美化插件 > DPS统计（MiniParser）> 模板路径

```sh
# 拷贝下面的地址至模板路径
http://ffxiv.canisminor.cc
```

## 更新说明

|日期|版本|改动|
|---|---|---|
|2017.11.10|v2.1.3|Add 量化设置界面/按人数自动Mini设置|
|2017.11.10|v2.1.2|Add 设置页面反馈组件/设置页面关于界面|
|2017.11.10|v2.1.1|Fix 修复某些用户报错无法使用的情况|
|2017.11.09|v2.1.0|Add 量化判定输出，显示不同颜色/根据10秒DPS和60秒DPS判断当前升降情况|
|2017.11.09|v2.0.1|Fix 优化Mini模式及其他|
|2017.11.08|v2.0.0|Add 数据自定义设置/数据结构重构|
|2017.11.03|v1.1.3|Fix 修复mini模式Bug|
|2017.11.01|v1.1.2|Add 增加团队统计图|
|2017.11.01|v1.1.1|Fix 一些数据Bug|
|2017.10.25|v1.1.0|Add 设置页面:坐标轴是否动态缩放/溢出量是否计入HPS|
|2017.10.24|v1.0.9|Add 历史记录功能|
|2017.10.24|v1.0.8|Add 马赛克ID功能/Up 优化迷你模式|
|2017.10.22|v1.0.7|Add 标题直达副本Wiki|
|2017.10.22|v1.0.6|Add 迷你模式|
|2017.10.22|v1.0.5|Add 透明模式|
|2017.10.22|v1.0.4|Fix 设置页面Bug/无法滚动Bug|
|2017.10.20|v1.0.3|Add 设置页面|
|2017.10.19|v1.0.2|Add 每人数据详情页面|
|2017.10.18|v1.0.1|Add 右键菜单/折叠模式|
|2017.10.18|v1.0.0|Root CanisMinor Act 上线|

<br />

## 使用说明

|模式|路径|
|---|---|
|设置|右键菜单 - 设置|
|历史记录|点击右下角时钟查看历史记录|
|详情模式|点击某人列表条目，即可显示此人详情模式|
|折叠模式|右键菜单 - 折叠/展开|
|透明模式|右键菜单 - 透明/实体|
|马赛克ID|右键菜单 - 马赛克/显示|

<br />

## 关于量化

**输出职业DPS判定:**
- `> 140% 平均DPS` => `金`
- `< 80% 平均DPS` => `紫`

**坦克职业DPS判定:**
- `> 80% 平均DPS` => `金`
- `< 50% 平均DPS` => `紫`

**治疗职业DPS判定:**
- `> 60% 平均DPS` => `金`
- `< 30% 平均DPS` => `紫`

**治疗职业过量判定:**
- `过量 < 10%` => `金`
- `过量 > 30%` => `紫`

**升降判定:**
- `10秒DPS > 120% 60秒DPS` => `↑`
- `10秒DPS < 80% 60秒DPS` => `↓`

> PS:此为预设值，可在设置中调整

<br />

## Q&A

- **本地版本和浏览器版本不一致:** 恭喜你遇到了ACT强制缓存，请打开调试模式 > Network标签 > 勾选Disable Cache，再右键刷新界面
- **无法调节窗口大小:** 请关闭ACT中的，锁定窗口和鼠标穿透，并不要启动皮肤的折叠模式，然后右下角调整窗口大小
- **屏幕小挂件尺寸大:** 请默认开启mini模式，如果依然觉得大，可以调整UI缩放倍率至0.X
- **4K显示器:** 调整UI缩放倍率至2
- **无法合并宠物数据:** 请升级OverlayPlugin至0.3.3.14

<br />

## Link

- **Site:** [ffxiv.canisminor.cc](https://ffxiv.canisminor.cc)
- **NGA.cn:** [bbs.ngacn.cc/read.php?tid=12689516](http://bbs.ngacn.cc/read.php?tid=12689516)
- **Github:** [github.com/canisminor1990/ffxiv-cmski](https://github.com/canisminor1990/ffxiv-cmskin)
- **Coding:** [coding.net/u/canisminor1990/p/ffxiv-cmskin](https://coding.net/u/canisminor1990/p/ffxiv-cmskin)

<br />

## Copyright

- **Author:** CanisMinor
- **ID:** 男孩纸榨汁机(紫水)
- **E-Mail:** <i@canisminor.cc>
- **License:** MIT