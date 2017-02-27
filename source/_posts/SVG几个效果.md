---
title: SVG几个效果
date: 2017-02-21 09:23:06
tags:
categories: SVG
---
1. 设置链接：
```
<a xlink:href="http://www.w3schools.com" target="_blank">
```
<!--more-->
2. 创建javascript脚本：
```
<script>
</script>
```

3. 淡出效果
```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect x="20" y="20" width="250" height="250" style="fill:blue">
<animate attributeType="CSS" attributeName="opacity" 
from="1" to="0" dur="5s" repeatCount="indefinite" />    //5s淡出
</rect>

</svg>
```

4. 动画效果：放大
```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect id="rec" x="300" y="100" width="300" height="100" style="fill:lime"> 
<animate attributeName="x" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="300" to="0"/> 
<animate attributeName="y" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="100" to="0"/> 
<animate attributeName="width" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="300" to="800"/> 
<animate attributeName="height" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="100" to="300"/> 
<animateColor attributeName="fill" attributeType="CSS" from="lime" to="red" begin="2s" dur="4s" fill="freeze"/>
</rect>

</svg>
```

5. 改变颜色
```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect x="10" y="20" width="90" height="60">
  <animateColor id="a1" attributeName="fill"
  from="red" to="blue"
  dur="3s"/>
</rect>
<rect x="10" y="120" width="90" height="60">
  <animateColor id="a2" attributeName="fill"
  from="blue" to="yellow"
  begin="a1.end" dur="3s"/>
</rect>
<rect x="10" y="220" width="90" height="60">
  <animateColor id="a3" attributeName="fill"
  from="yellow" to="green"
  begin="a2.end" dur="3s"/>
</rect>

</svg>
```

6. 移动路径
```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<g transform="translate(100,100)">
<text id="TextElement" x="0" y="0" style="font-family:Verdana;font-size:24"> It's SVG!
<animateMotion path="M 0 0 L 100 100" dur="5s" fill="freeze"/>
</text>
</g>

</svg>
```

7. 移动路径后旋转并缩放
```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<g transform="translate(100,100)"> 
<text id="TextElement" x="0" y="0" style="font-family:Verdana;font-size:24; visibility:hidden"> It's SVG!
<set attributeName="visibility" attributeType="CSS" to="visible" begin="1s" dur="5s" fill="freeze"/>
<animateMotion path="M 0 0 L 100 100" begin="1s" dur="5s" fill="freeze"/>
<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-30" to="0" begin="1s" dur="5s" fill="freeze"/> 
<animateTransform attributeName="transform" attributeType="XML" type="scale" from="1" to="3" additive="sum" begin="1s" dur="5s" fill="freeze"/> 
</text> 
</g> 

</svg>
```

8. 移动路径后旋转并缩放，逐步放大并改变颜色的矩形
```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect id="rec" x="300" y="100" width="300" height="100" style="fill:lime"> 
<animate attributeName="x" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="300" to="0"/> 
<animate attributeName="y" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="100" to="0"/> 
<animate attributeName="width" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="300" to="800"/> 
<animate attributeName="height" attributeType="XML" begin="0s" dur="6s" fill="freeze" from="100" to="300"/> 
<animateColor attributeName="fill" attributeType="CSS" from="lime" to="red" begin="2s" dur="4s" fill="freeze"/>
</rect>

<g transform="translate(100,100)"> 
<text id="TextElement" x="0" y="0" style="font-family:Verdana;font-size:24; visibility:hidden"> It's SVG!
<set attributeName="visibility" attributeType="CSS" to="visible" begin="1s" dur="5s" fill="freeze"/>
<animateMotion path="M 0 0 L 100 100" begin="1s" dur="5s" fill="freeze"/>
<animateColor attributeName="fill" attributeType="CSS" from="red" to="blue" begin="1s" dur="5s" fill="freeze"/> 
<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-30" to="0" begin="1s" dur="5s" fill="freeze"/> 
<animateTransform attributeName="transform" attributeType="XML" type="scale" from="1" to="3" additive="sum" begin="1s" dur="5s" fill="freeze"/> 
</text> 
</g>

</svg>
```

10. SVG参考手册
[http://www.w3school.com.cn/svg/svg_reference.asp](http://www.w3school.com.cn/svg/svg_reference.asp)

参考：
[http://www.w3school.com.cn/svg](http://www.w3school.com.cn/svg)
