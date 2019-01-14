cors跨域请求分为两种，一种是简单的跨域请求，一种是复杂的跨域请求。
1.简单请求：
  满足以下条件的则是简单的请求。
  请求方法为get，post，head。
  请求的header为：accept，accept-language,content-type,last-Event-ID,content-language.
  content-type为以下几种：application/x-www-urlencode,multipart/form-data,text/plain。

  满足以上条件的就是简单请求，浏览器会在请求头上加一个字段origin:http://xxxxxx/xxx/xx/:9090
  这个字段表示当前请求的域。
  服务器会根据这个域，确定是否允许请求，如果不允许的话，则不会返回包含cors信息的响应头，
  浏览器就知道这是跨域失败，则打印出不允许跨域的信息。
  否则的话就是成功，受到服务器的认可，服务器的响应字段会包含一个固定的字段：
  Access-Control-Allow-Origin:''，这个字段的值可以是'*'，表示所有的域都可以访问，或者是固定的某一个域名。
  (有点类似于白名单)；
  同时，响应头也可以包含其他的可选响应头，比如：
  Access-Control-Allow-Credentials:true，这个字段如果出现的还，只能有一个值true。表示是否允许
  浏览器携带cookie信息。
  Access-Control-Expores-Headers:'FOO':表示允许客户端拿到的响应头信息。
  正常情况下，我们通过getResponseHeader()访问到允许访问的六个header：
  Cache-Control,Content-type,Content-language,Expiress,last-modefied,pragma,
  但是因为，Access-Control-Expores-Headers:'FOO'这个响应头就是告诉我们，我们可以访问到Foo
  这个header信息。

  withCredentials:cors请求默认是不会发送cookie给服务器的，除非服务器指定必须发送。也就是加了响应字段
  Access-Control-Allow-Credentials:true。
  同时，ajax请求也必须指定withCredentials为true，否则，即使服务器允许发送cookies，浏览器也是不会发送cookies给服务器的。
  xhr.withCredentials=true.指定允许ajax请求发送cookies。
  一旦，xhr指定了允许发送cookies，那么服务器端的Access-Control-Allow-Origin的值就不能是“*”，而必须与请求域名一致。

  但是，这个时候携带的cookies信息是服务器域名下的cookies信息，别的信息依旧不会被携带的，同时，我们要想在本地去访问服务器域名下的
  cookie信息是访问不到的。


2.非简单请求，指的是那些对服务器有特殊要求的请求，不满足简单请求的就都是非简单请求，比如请求的方法是PUT,DELETE，
  或者有一些自定义的请求header。
  浏览器发现当前的请求是非简单请求就会先发送一个预检请求OPTIONS,
  同样的，浏览器会在请求头中加上origin字段以及
  Access-Control-Request-Method:PUT(询问服务器是否允许请求，该字段是必须的)
  Access-Control-Request-Headers:自定义的header(询问服务器是否支持自定义的header，可以用逗号分隔多个字段。)


  服务器接受到了预检请求之后会做出响应。
  Access-Control-Allow-Origin:与简答请求一样，表示接受的请求来源
  Access-Control-Allow-Methods:PUT,DELETE,FETCH。(表示服务器允许接受的方法)
  Access-Control-Allow-Headers:''(表示请求发送的自定义的一些字段，如果存在Access-Control-Request-Headers，那么该字段是必须的)
  Access-Control-Allow-Credentials:与简单请求一样表示是否允许携带cookie
  Access-Control-Max-Age:表示此次预检请求之后多长时间内可以不再进行预检请求。
  服务器访问了如上的一些信息之后才表示接受了预检请求，否则的话就返回一些政策热响应信息，
  这个时候浏览器就知道失败了，会捕获到跨域失败的错误打印出来。

  预检请求完成之后，浏览器会再次发送请求，该次请求是真正的ajax请求，
  也就变成了简单请求。
  浏览器会在header中添加origin，服务器响应的时候会加上Access-Control-Allow-Origin;
  Access-Control-Allow-Origin是必须的。
