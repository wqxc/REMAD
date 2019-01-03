var obj = {
  x:1
}
Object.defineProperty(obj,'x',{
  set:function(newVal){
    console.log('设定了新值',newVal)
  }
})
obj.x=3//设定了新值 3
如此一来我们就完全可以监控对象obj里的变量的改动，
实现定义了函数，在变量修改的时候调用函数，比如说
变量修改的时候，修改document的值或者是内容。
当然如果是多个数据的话，完全可以使用 defineProperties()
var obj = {
  x:1
}
Object.defineProperties(obj,{
  x:{
    set:function(key,newVal){
      console.log('修改了x的值',key,newVal)
    }
  },
  y:{
    set:function(newVal){
      console.log('修改了y的值',newVal)
    }
  }
})
obj.x=3
