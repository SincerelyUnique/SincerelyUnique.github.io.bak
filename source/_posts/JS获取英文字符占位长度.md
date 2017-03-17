---
title: JS获取英文字符占位长度
date: 2017-03-10 15:29:15
tags:
categories: JavaScript
---
工作中因为前台为不同长度的英文字符进行自适应，首先获取其长度
<!--more-->
```
function textSize(fontSize, text) {
								    var span = document.createElement("span");
								    var result = {};
								    result.width = span.offsetWidth;
								    result.height = span.offsetWidth; 
								    span.style.visibility = "hidden";
								    span.style.fontSize = fontSize;
								    document.body.appendChild(span);
								    if (typeof span.textContent != "undefined")
								        span.textContent = text;
								    else span.innerText = text;
								    result.width = span.offsetWidth - result.width;
								    result.height = span.offsetHeight - result.height;
								    span.parentNode.removeChild(span);
								    return result;
								}
```