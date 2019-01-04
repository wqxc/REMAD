var i=0;

function timedCount()
{
  i=i+1;
  postMessage(i);
  setTimeout("timedCount()",500);
}

timedCount()


chrome不支持这种本地使用 本地 方式使用Web Worker；
但是在其他的浏览器下是可以使用的，这个不同的厂商浏览器实现的方式不一样
