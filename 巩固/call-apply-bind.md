js的上下文分为：
定义时候的上下文，运行时候的上下文。
而且js的上下文是可以被修改的。
而call,apply,bind.三个方法是Function对象自带的三个方法，这三个方法的主要作用是改变函数中的this指向。
核心是：他们是用来改变函数的this指向的。
我的理解是，这三个方法是改变了函数的执行环境。
一般函数的上下文包含三部分：AO对象，scopeChain,this。
这三个函数实际上是修改了全部的这三个部分，只是前两个部分是不会变化的，所以，就简单的理解为修改了this的值。

比如：
var y=2
function f(){
	var a=100
  console.log(this.x)
}
var obj = {
  x:3
}
var f1 =f.bind(obj)
f1
ƒ f(){
	var a=100
  console.log(this.x)
}

如上所示。函数f的内部变量依旧是包含在里边的。
其实简单的来说，这三个方法都是将一个函数整体的转移到另外一个对象内部去执行。
比如上边的：
我们使用：f.call(obj)是等价于
obj.f= f
obj.f()

三者的区别：
apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
apply 、 call 、bind 三者都可以利用后续参数传参；
bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

三者的共同点，第一个参数有以下的几种情况：
 (1)  不传，或者传null,undefined， 函数中的this指向window对象(严格模式下是undefined，非严格模式下才是window)
（2） 传递另一个函数的函数名，函数中的this指向这个函数的引用
    bg:function eat(x,y){   
      console.log(x+y);   
     console.log("ttt",this)
    }   
    function drink(x,y){   
      console.log(x-y);  
      console.log("xxxx",this)
    }   
    eat.call(drink,3,2);//5

    ttt ƒ drink(x,y){   
      console.log(x-y);  
      console.log("xxxx",this)
    }
（3） 传递字符串、数值或布尔类型等基础类型，函数中的this指向其对应的包装对象，如 String、Number、Boolean
（4） 传递一个对象，函数中的this指向这个对象


个人理解：
如果第一个参数是一个对象，那么就将函数放于对象中执行。
如果第一个参数是一个函数，那相当于替换掉参数中的那个函数
使用call或者是apply、bind方法修改this值，其中修改的是调用这三个方法的函数的this值。
将这个this指向这三个方法的第一个参数。


例子：
function eat(x,y){   
  console.log(x+y);   
 console.log("ttt",this)
}   
function drink(x,y){   
  console.log(x-y);  
  console.log("xxxx",this)
}   
eat.call(drink,3,2);//5

ttt ƒ drink(x,y){   
  console.log(x-y);  
  console.log("xxxx",this)
}

一种情况是eat函数替代了drink函数，所以console.log(x+y); 放在了console.log(x-y);的下边，
覆盖了drink的log方法。
另外的一种情况是将drink并没有起到什么作用，只是摆设而已。执行的依旧是eat方法。
