简单对象克隆
var obj = {
  x:1,
  y:2,
  r:function(){
    console.log('add',this.x+this.y)
  }
}
obj.r()//
var copyObj = JSON.parse(JSON.stringify(obj))
copyObj.x=3;
copyObj.y=4;
copyObj.r()//r不是一个函数，如上所述的转换，只会转换对象的普通属性，function是无法序列化的。
obj.r()//3
数组对象的深度克隆
var arr = [{x:2,y:3}]
arr[0]['x']//2
copyArr = JSON.parse(JSON.stringify(arr))
copyArr[0]['x']=4
console.log(arr[0]['x'])//2
console.log(copyArr[0]['x'])//4

另外一种深度克隆方式
var obj = {
  x:1,
  y:2,
  r:function(){
    console.log('add',this.x+this.y)
  }
}
Object.defineProperty(obj,'x',{configurable:false})
function deepClone(obj){
  var newObj= obj instanceof Array ? []:{};
  for(var item in obj){
    var temple= typeof obj[item] == 'object' ? deepClone(obj[item]):obj[item];
    newObj[item] = temple;
  }
  return newObj;
}
var copy = deepClone(obj)
copy.x=3
copy.y=4
copy.r()//7
obj.r()//3

Object.getOwnPropertyDescriptor(obj,'x')// {value: 1, writable: true, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor(copy,'x')// {value: 3, writable: true, enumerable: true, configurable: true}
如上所示，我们之前修改了obj.x的描述值为不可配置，但是，copy后的却依旧是可配置的。

包含描述属性的克隆
var obj = {
  x:1,
  y:2,
  r:function(){
    console.log('add',this.x+this.y)
  }
}
Object.defineProperty(obj,'x',{configurable:false})
function deepClone(obj){
  var newObj= obj instanceof Array ? []:{};
  for(var item in obj){

    console.log("item",item)
    var temple= typeof obj[item] == 'object' ? deepClone(obj[item]):Object.getOwnPropertyDescriptor(obj,item);

    Object.defineProperty(newObj,item,temple)
  }
  return newObj;
}
var copy = deepClone(obj)
copy.x=3
copy.y=4
copy.r()//7
obj.r()//3

Object.getOwnPropertyDescriptor(obj,'x')  {value: 1, writable: true, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor(copy,'x') {value: 3, writable: true, enumerable: true, configurable: false}
如此一来，就齐活了。

另外的。对象可以设定其中一个属性为不可枚举的，那么这个时候就无法拷贝了。
我们使用for/in循环是无法枚举那些不可枚举的属性的

比如：

var obj = {
  x:1,
  y:2,
  z:3
}
Object.defineProperty(obj,'x',{enumerable:false})
for (var item in obj) {
  console.log('item',item)
}
item y
item z
属性x就无法被遍历出来。
如果此时我们想把这个不能被遍历出来的属性也加入到新对象中，可以使用
Object.getOwnPropertyNames(obj)返回一个数组，数组内是对象的属性['x','y','z']
而后再使用上边的方法，将这些对象的描述属性全部拷贝进入
