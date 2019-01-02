js中new操作都做了哪些东西：
创建一个新的空对象
而后将空对象的原型指向构造函数的prototype
最后将这个空对象赋值给this
最后，返回这个对象。
比如：
function Cat(name,age){
  console.log(this)//
    // Cat {name: "斑点", age: 2, desc: ƒ}
    //   age: 2
    //   desc: ƒ ()
    //   name: "斑点"
    //   __proto__: Object
  this.name =name;
  this.age=age;
  this.desc=function(){
    console.log('this is a cat.it\'s name' +this.nae +" and it\'s age is " +this.age +" years old");
  }
}

var cat1 = new Cat('斑点',2)
console.log(cat1)//
Cat {name: "斑点", age: 2, desc: ƒ}
    age: 2
    desc: ƒ ()
    name: "斑点"
    __proto__: Object
cat1.__proto__==Cat.prototype
