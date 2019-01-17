参考(https://harttle.land/2015/08/10/cookie-session.html)
cookie：每一次的同源请求都会携带cookie，
如果是跨域的ajax请求默认是不会携带cookie，即使跨域的时候服务端设定了Access-Control-Allow-Credentials:true;
如果想在跨域的时候携带cookie，必须得开启携带cookie，withCredentials=true;

cookie是服务端发给客户端存起来的数据，用以表示用户身份，
一般浏览器在一个域名下至多只能存储20个键值对。
我们可以通过document.cookie获取cookie，这个方法只能获取当前域下的cookie。


cookie除了键值对，表示存储的内容外，还有几个属性，用来表示cookie的信息。
expires:表示cookie的过期时间。是一个GMT格式的时间，new Date().toGMTString()或者new Date().toUTCString()来获得。
如果没有设定这个属性，那么过期时间就是session,在窗口打开期内有效。
这个属性就是一个具体到某一时间点的值，过了这个时间点就失效。但是，这个时间点是以服务器的时间为准的，可能和本地时间不一致。
所以，在http1.1的时候出现了max-age
max-age:是一个时间段，max-age默认值是-1，表示session期内有效，0，表示删除，正数表示一个时间段，从创建cookie到删除cookie之间的间隔。

domain和path.domain是域名，path是路径，两者合起来就是一个完整的url，用来限制，cookie能被哪些url访问。
比如我们设定，domain为 baidu.com,path为/,那么我们在www.baidu.com的任意页面都能访问cookie，
而且，api.baidu.com,xx.baidu.com下也都能够访问到这个cookie，也就是说，子域名能够访问父域名的cookie。

secure:用来设置只有在安全的情况下才能发送cookie，比如https的网络请求下。

httpOnly:表示只能由服务器来修改cookie，js不能修改cookie，禁止js来操作cookie


服务端设置cookie：
有一个字段叫做：set-cookie:key=value;expires=xxxxx;...

cookie多个属性之间是有分号进行分割。


cookie其实是个字符串，但这个字符串中逗号、分号、空格被当做了特殊符号。所以当cookie的 key 和 value 中含有这3个特殊字符时，需要对其进行额外编码，一般会用escape进行编码，读取时用unescape进行解码；当然也可以用encodeURIComponent/decodeURIComponent或者encodeURI/decodeURI
