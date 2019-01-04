DOM：就是document Object Model的缩写，简单的额说来就是
document对象，它能够做的事情很多，比如：
查找元素：document.getElementById("元素id")；document.getElementsByClassName("class名字")
操作内容：innerHTML,innerText
操作属性：getAttribute();setAttribute();removeAttribute();
操作样式：style
新增元素：document.createElement("<p>sad</p>")


BOM：browser Object  Model;浏览器对象模型，
宿主环境，浏览器提供的一个可以被js操作的对象。
所有的属性和方法都挂载在window上的。
window.onload()//
window.location//
setInterval()
setTimeout()

Navigator 对象
navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie

location.href//返回当前的url
等等的方法。
