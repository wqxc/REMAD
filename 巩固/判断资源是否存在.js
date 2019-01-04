var  myNewAjax=function(url){
  return new Promise(function(resolve,reject){
      var xhr = new XMLHttpRequest();
      xhr.open('head',url);
      xhr.send();
      xhr.onreadystatechange=function(){
           if(xhr.status==200&&xhr.readyState==4){
                resolve(xhr.getResponseHeader('Content-Length'))//跨域的情况下是不允许拿到这个header的
           }else if(xhr.readyState==4&&xhr.status!=200){
                reject(xhr.status);
           }
      }
  })
}
var noExit = "http://lucton-test.oss-cn-beijing.aliyuncs.com/152336hplbzqajl1opm5bd_6653.jpg"
var exist = "http://lucton-test.oss-cn-beijing.aliyuncs.com/timg%20%283%29_1545114051372.jpg"

myNewAjax(exist).then(function(data){
  console.log("执行成功",data)
},function(error){
  console.log("执行失败",error)
})

如上所示，如果资源存在，那么会返回资源的长度（B），
如果不存在则会返回404；
如果是请求失败，则是别的状态码
