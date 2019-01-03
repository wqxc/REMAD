1.defer
使用：<script src="http://xxxxxxxxx/xxx/xxx/xx.js" defer="defer"></script>
如此一来这个js文件的加载就会是异步的，在浏览器空闲的时候来加载这个文件。
当然，前提是这个js文件没有操作dom；因为如果这个文件操作dom而后却在全部的内容加载完 时候
再加载，那显然会造成紊乱。
这个属性只支持IE

2.async；H5的属性，仅仅适用于外部脚本。

async 属性规定一旦脚本可用，则会异步执行。

注释：async 属性仅适用于外部脚本（只有在使用 src 属性时）。

注释：有多种执行外部脚本的方法：

如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本



3.创建script标签，插入到DOM中
在合适的时候创建script标签，并插入DOM中。
