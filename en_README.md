# CanisMinor ACT

![](http://qn.canisminor.cc/2017-11-14-1.png)

[![](https://img.shields.io/github/tag/canisminor1990/ffxiv-cmskin.svg)](https://github.com/canisminor1990/ffxiv-cmskin)
[![](https://img.shields.io/badge/Works%20with-OverlayPlugin-green.svg)](https://github.com/hibiyasleep/OverlayPlugin)

`ACT` `OverlayPlugin` `FFXIV` `React` `Redux`

**FFXIV CanisMinor ActSkin:** [🌱 Online](http://ffxiv.canisminor.cc)

**README:** [📙 简体中文 (CN)](README.md)

## OverView

![](http://qn.canisminor.cc/2017-11-14-2.png)
![](http://qn.canisminor.cc/2017-11-14-3.png)
![](http://qn.canisminor.cc/2017-11-14-4.png)
![](http://qn.canisminor.cc/2017-11-14-5.png)
![](http://qn.canisminor.cc/2017-11-14-6.png)
![](http://qn.canisminor.cc/2017-11-14-7.png)
![](http://qn.canisminor.cc/2017-11-14-8.png)
![](http://qn.canisminor.cc/2017-11-14-9.png)
![](http://qn.canisminor.cc/2017-11-14-10.png)

<br />

## Setup (1 or 2)

**ACTWebSocket (Recommand)：**
- Download Latest `ACTWebSocket`: [🔗 Latest](https://github.com/ZCube/ACTWebSocket/releases)

**OverlayPlugin：**
- Download Latest `OverlayPlugin`: [🔗 Latest](https://github.com/hibiyasleep/OverlayPlugin/releases)
- Act > MiniParser > Paste Url

```sh
http://ffxiv.canisminor.cc
```

## Language

- To Change Language: Right Click > `设置` > Language > English > `应用`


## Changelog

|Date|Version|Changelog|
|---|---|---|
|2017.11.13|v2.1.7|Support ActWebsocket|
|2017.11.13|v2.1.6|Add English Version|
|2017.11.13|v2.1.5|Add Overheal Progress|
|2017.11.10|v2.1.4|Fix Load Setting Bug|
|2017.11.10|v2.1.3|Add Setting: Quantity / Auto Mini|
|2017.11.10|v2.1.2|Add Feedbac / About|
|2017.11.10|v2.1.1|Fix Bug|
|2017.11.09|v2.1.0|Add Quantity|
|2017.11.09|v2.0.1|Fix MinoMode|
|2017.11.08|v2.0.0|Add Diy Data / Rebuild Data Tree|
|2017.11.03|v1.1.3|Fix Fix MiniMode Bug|
|2017.11.01|v1.1.2|Add Team View|
|2017.11.01|v1.1.1|Fix Some Data Bug|
|2017.10.25|v1.1.0|Add Setting Item: Chart Scale / Pure Hps|
|2017.10.24|v1.0.9|Add History|
|2017.10.24|v1.0.8|Add HideID / Fix MiniMode|
|2017.10.22|v1.0.7|Add Click Header to Wiki|
|2017.10.22|v1.0.6|Add Mini Mode|
|2017.10.22|v1.0.5|Add Transparent Mode|
|2017.10.22|v1.0.4|Fix Setting Bug / Scroll Bug|
|2017.10.20|v1.0.3|Add Setting Page|
|2017.10.19|v1.0.2|Add Detail Page|
|2017.10.18|v1.0.1|Add Right-click Menu / Collapse|
|2017.10.18|v1.0.0|CanisMinor Act Online|

<br />

## Usage

|Mode|Note|
|---|---|
|Setting|Right-click - Setting|
|History|Click bottom-right clock icon|
|DetailPage|Click List to Show Detail Data|
|Collapse|Right-click - Collapse/Extended|
|Transparent|Right-click - Transparent/Opaque|
|MiniMode|Right-click - MiniMode/FullMode|
|HideID|Right-click - HideID/ShowID|

<br />

## Quantity

**Dps Damage Quantity:**
- `> 140% Average Dps` => 😇
- `< 80% Average Dps` => 👿

**Tank Damage Quantity:**
- `> 80% Average Dps` => 😇
- `< 50% Average Dps` => 👿

**Heal Damage Quantity':**
- `> 60% Average Dps` => 😇
- `< 30% Average Dps` => 👿

**Example:**
```sh
D1:380 / D2:320 / T:200 / H:100
Average Dps: 250

Dps: 👿 < 200 < ... < 350 < 😇
Tank: 👿 < 125 < ... < 200 < 😇
Heal: 👿 < 75 < ... < 150 < 😇
```

**Heal Overheal Quantity:**
- `Overheal < 10%` => 😇
- `Overheal > 30%` => 👿

**Dps Up & Down Tips:**
- `D10s > 120% D60s` => ⬆️
- `D10s < 80% D60s` => ⬇️


<br />

## Q&A

- **Zoom out gui:** 4K screen could set the UiScale to `2`
- **Zoom in gui:** if the mini mode still too large for u，set the UiScale to `0.x`
- **Can't combine pet data:** update `OverlayPlugin` to `^0.3.3.14`
- **Always waiting data:** Setting > right-click > restore
- **Can't restore:** Open console > enter `document.cookie="setting=false"`
- **Version cache:** Sometimes Act will force cache the html files，Open console > Network > Disable Cache，then right-click > reload

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



