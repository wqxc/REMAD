http：超文本传输协议，是互联网上应用最为广发的一种网络协议。
https:是在http的基础上，加入了ssl协议，简单的来说，就是更为安全的协议。

http的数据传输是明文传输的，不够安全，但是，https的传输是加密传输的，更为安全。
但是，https需要ca认证，费用高



tcp的三次握手：
浏览器会先想服务器发送一个数据syn=1；询问服务器是否能接受自己发送的消息。
服务器接受之后，会在这个数据后驾驶ACK变为SYN=1;ACK 发送给浏览器，告诉浏览器，自己接收到它发来的消息了，
但是现在自己发送了一个消息给它，询问它能否接收到。
浏览器在接收到服务器发送的消息之后就能确认，自己发送的消息，服务器能够正常接收，现在服务器询问了一下它发送的消息，
浏览器能不能接收。
浏览器将服务器发送给自己的信息ACK。再次转发回服务器，服务器接收之后，就确认自己发送的信息，浏览器能够接受。

如此一来。服务器知道自己能够接收浏览器发送的信息，而且也知道自己发送的信息浏览器能够接收到。
浏览器一方也是如此。


TCP和UDP区别：
TCP是面向连接的，数据传输的时候首先要建立连接，UDP无需建立连接
TCP传输数据更加稳定安全可靠，UDP只管发送，不管接收与否。


WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。允许服务端主动向客户端推送数据
http是不支持持久连接的。connection:keep-alive
实际上不是一个真正的持久连接，只是将多个http请求合并为一个。
http的生命周期是一个request和一个response为一个周期，
一个request对应一个response，不能去一对多。
而且response是不能主动给客户端发信息的。

而websocket是基于http的，构造websocket依靠两个header
upgrade，connection
如下：
Upgrade:webSocket
Connection:Upgrade


传统模式下，为了实现服务器对客户端的推送，一般都是使用轮询机制，比如每隔一秒ajax请求一次。
这样明显是浪费宽带资源的。
websocket 的使用方式如下：
var Socket = new WebSocket(url, [protocol] );
以上代码中的第一个参数 url, 指定连接的 URL。第二个参数 protocol 是可选的，指定了可接受的子协议。

webSocket 属性：
Socket.readyState ：
  0 - 表示连接尚未建立。

  1 - 表示连接已建立，可以进行通信。

  2 - 表示连接正在进行关闭。

  3 - 表示连接已经关闭或者连接不能打开。

websocket事件
  open	Socket.onopen	连接建立时触发
  message	Socket.onmessage	客户端接收服务端数据时触发
  error	Socket.onerror	通信发生错误时触发
  close	Socket.onclose	连接关闭时触发

websocket方法
  Socket.send()  使用连接发送数据

  Socket.close()  关闭连接


使用websocket需要服务器端支持websocket。


head请求方式：HTTP HEAD 方法 请求资源的首部信息, 并且这些首部与 HTTP GET 方法请求时返回的一致.
该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源.
比如，可以用来判断一个文件是否存在，或者是是否可以被使用，只会返回一些消息体：


http2.0相比http1.0速度上快了很多。
允许多路复用，就是允许在单一连接中发送多重请求响应信息。http1.0中，同一时间，同一域名下的请求次数有限制，超出的话，会被阻塞。
允许服务器推送。
