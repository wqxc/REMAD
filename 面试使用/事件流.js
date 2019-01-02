事件流描述的是从页面中接收事件的顺序,DOM2级事件流包括下面几个阶段。

事件捕获阶段
处于目标阶段
事件冒泡阶段
addEventListener：addEventListener 是DOM2 级事件新增的指定事件处理程序的操作，
这个方法接收3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。
最后这个布尔值参数如果是true，表示在捕获阶段调用事件处理程序；
如果是false，表示在冒泡阶段调用事件处理程序。

IE只支持冒泡，其他的多数浏览器则是使用的是捕获事件。
取消事件冒泡：
e.stopPropagation();

IE下取消事件冒泡
e.cancelBubble = true;


1、一个完整的JS事件流是从window开始，最后回到window的一个过程
2、事件流被分为三个阶段捕获过程、目标过程、冒泡过程
默认情况下，事件使用冒泡事件流，不使用捕获事件流。
然而，在Firefox和Safari里，你可以显式的指定使用捕获事件流，方法是在注册事件时传入useCapture参数，将这个参数设为true。
addEventListener('事件'，'handeler',false)
事件是不带on前缀的。比如change,blur等。这个和ie不同
第三个参数，默认是false，现代的浏览器多数都采用冒泡事件。
removeEventListener()//有注册事件，但是一定要记得在事件执行完毕的时候移除。

IE下添加事件的方法：因为ie只支持事件冒泡，所以他是不存在第三个参数的。
obj.attachEvent(evtype,fn)——IE提供的添加事件处理函数的方法。obj是要添加事件的对象，evtype是事件类型，带on前缀，fn是事件处理函数，IE不支持事件捕获
这个时候this指向了window
obj.detachEvent(evtype,fn,)——IE提供的删除事件处理函数的方法，evtype包含on前缀
