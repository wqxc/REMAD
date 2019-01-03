function once(f) {
  var isDone = false
  return function() {
    if(isDone){
      return;
    }else {
      f.apply(null,arguments)
      isDone=true
    }
  }
}
// 使用
function func() {
  console.log('执行函数')
}
var ones = once(func)
ones()
ones()
只会打印一次"执行函数"
