手动实现观察这模式
function Event(){
  this.handles={},
  this.on=function(eventName,callBack){
    this.handles[eventName]=callBack
  },
  this.emit = function(eventName,param){
    if(this.handles[eventName]){
      this.handles[eventName](param)
    }else {
      throw Error("There is no Event. it's name is "+eventName)
    }
  }
}
var event = new Event()
event.on("say",function(param){
  console.log('Hello '+param);
})
event.on("eat",function(param){
  console.log('eat with '+param);
})
console.log(event)
event.emit('say','John')
event.emit('eat','John')
event.emit('noEvent',"param")

个人理解，观察者模式就是实现注册好事件，将这些事件保存起来，而后
在触发的时候，找到正确的注册方法执行即可.
