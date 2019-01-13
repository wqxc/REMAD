instanceof是用来检测对象的类型，检测一个对象是不是另一个对象的实例。
检测的规则是
查看对象B的prototype指向的对象是否在对象A的[[prototype]]链上。
如果在，则返回true,如果不在则返回false。
不过有一个特殊的情况，当对象B的prototype为null将会报错(类似于空指针异常)。


比如：
function Person(){}
function Student(){}
function Animal(){}
var person = new Person()
Student.prototype = person
var student = new Student()
var animal = new Animal()

student instanceof Student//true
// student 是构造函数Student的实例，这个是没错的。

student instanceof Person//True
// 根据规则，我们查看
student.__proto__==Student.prototype//true
student.__proto__.__proto__==Person.prototype//true
student.__proto__.__proto__.__proto__==Object.prototype//true

// 所以
student instanceof Object//true
但是：
animal instanceof Animal //true
animal instanceof Person//false

如上，简单的来说，instanceof的作用就是判断，左边的值的隐式原型能否访问到
右边的对象的prototyped对象。
如果左边的值是右边new 出来的，那自然说明，左边是右边的实例。
如果右边的值在new 之前已经继承了别的对象，那么继承的对象的constructor 指向的对象也处在左边值的原型链上。
因为这个方法，判断的左边的值是否是右边的值的实例，那么右边的值一定得是个构造函数。
否则的话会报错：Right-hand side of 'instanceof' is not callable。


我们自己实现一个检测方法。
第二个参数必须是一个函数
function _instanceof(A,B){
  var toString = Object.prototype.toString
  if(toString.call(B)!=="[object Function]")return 'TypeError'
  var A=A.__proto__;
  var B=B.prototype;
  while (true) {
    if(A==null) return false;
    if (A===B) {
      return true
    }
    A=A.__proto__
  }
}
