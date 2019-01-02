function Animal(name){
  this.name = name;
  this.sleep=function(){
    console.log(this.name +' is sleeping')
  }
}
Animal.prototype.eat=function(food){
  console.log(this.name +' is eating '+ food)
}
//以上形成了一个类，一个Animal的类。
//我们在构建一个猫的类
function Cat(){}
Cat.prototype=new Animal("斑点")
var cat = new Cat()
cat.sleep()

Cat类继承了Animal类。
