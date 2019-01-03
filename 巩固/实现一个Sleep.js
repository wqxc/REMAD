1.使用setTimeout
function sleep(f,ms){
  setTimeout(f,ms)
}
function f(){
  end = new Date().getTime()
  console.log("打印",end-start)
}
var start = new Date().getTime()
console.log('开始时间',start)
sleep(f,1000)
var end;
会在给定的时间之后执行传入的函数


2.循环的方式
function sleep(ms){
   var start=Date.now(),expire=start+ms;
   while(Date.now()<expire);
   console.log('1111');
   return;
}


3.promise
function sleep(ms){
    return new Promise(resove=>{
      console.log('1111')
      setTimeout(resove,ms)
    })
}
sleep(10000).then(res=>{
  console.log('休眠了10000秒之后开始执行',res)
})
