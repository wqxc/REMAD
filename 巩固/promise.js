Promise是一个构造函数，自己身上有all、reject、resolve这几个眼熟的方法，原型上有then、catch等同样很眼熟的方法。
既然是构造函数需要的时候就new一个出来。

将ajax封装成一个promise
var  myNewAjax=function(url){
  return new Promise(function(resolve,reject){
      var xhr = new XMLHttpRequest();
      xhr.open('get',url);
      xhr.send(data);
      xhr.onreadystatechange=function(){
           if(xhr.status==200&&xhr.readyState==4){
                var json=JSON.parse(xhr.responseText);
                resolve(json)
           }else if(xhr.readyState==4&&xhr.status!=200){
                reject('error');
           }
      }
  })
}




function runAsync(){
    return  new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成');
            let data = {name:'JSON',age:12,address:'上海市黄浦区上市'}
            resolve(data);
        }, 2000);
    });
}
runAsync().then(function(data){
  console.log('接受的参数',data)
})

Object.prototype.toString.call(runAsync())  "[object Promise]"
Promise构造函数接收一匿名个函数作为参数，这个匿名函数接收两个参数，resolve和reject，
这两个参数其实都是函数，一个代表执行成功的回调，一个则是代表失败。
Promise有三种状态pending:表示请求执行中，fulfilled表示执行成功，rejected:表示执行失败。
比如 var p = new Promise(function(resolve,reject) {
  code:{
    这里会执行一些异步的操作，执行成功之后
    resolve("这里会是是一些异步获取到的一些信息")
    如果说执行失败了
    reject("抛出一些错误的信息")
  }
})
以上是定义了一个promise，接下来就是如何使用
p.then(function(success){},function(error){})
Promise的原型上有一个then方法，这个方法可以接受一个或者是两个参数，
这两个参数都是函数，可以简单的将其理解为回调resove();和reject()
promise p里，定义了异步执行完成之后调用resove()，其实就是调用then方法的第一个参数。
失败之后调用的则是第二个参数。
当然，我们也可以在then方法中继续返回一个promise，以便继续进行链式的调用。
比如：
p.then(function(data){
  这里，我们只写一个函数参数，表示只认同执行成功时候进行执行，
  这个时候我们完全可以在第一个异步执行完毕的时候继续进行下个异步操作。
  code:{
    这里又是一个promise
    return new Promise(function(resolve,reject) {
      code:{
        这里会执行一些异步的操作，执行成功之后
        resolve("这里会是是一些异步获取到的一些信息")
        如果说执行失败了
        reject("抛出一些错误的信息")
      }
    })
  }
})

举个栗子；这个栗子会在四秒之后输出第一个变量，又四秒之后输出第二个变量
var p = new Promise(function(resove,reject){
      setTimeout(function(){
          console.log("这是第一个异步之后的输出数据")
          var data = {name:'123',age:123,address:'上海市怀化区从安阳了123号'}
          resove(data)
      },4000)
})
p.then(function(data){
  console.log(data)// {name:'123',age:123,address:'上海市怀化区从安阳了123号'}
  return new Promise(function(resove,reject){
        setTimeout(function(){
            console.log("这是第二个异步之后的输出数据")
            var data = {name:'五块',age:12,address:'阳了123号'}
            resove(data)
        },4000)
  })
})
.then(function(data){
  console.log(data)//{name:'五块',age:12,address:'阳了123号'}
})

Promise 也有一些缺点。
首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。



reject的使用
var p = new Promise(function(resove,reject){
      setTimeout(function(){
        var num = Math.ceil(Math.random()*10); //生成1-10的随机数
        if(num<=5){
            resolve(num);
        }
        else{
            reject('数字太大了');
        }
      },4000)
})
p.then(
  function(data){
    // 这里是执行成功之后的事情。
    console.log(data)
  },
  function(error){
    // 这里表示执行失败的情况
    console.log(error)
  }
)

如上的then方法中的函数，只会被调用两次，要么成功输出获取的的数据，
要么失败，获取失败的原因
reject则是表示失败的情况下的处理情况。



catch 方法也是promise的一个方法，它的作用一方面是像reject那样捕获异常，
另外一面则是捕获resove回调的异常。
比如：
var p = new Promise(function(resove,reject){
      setTimeout(function(){
        var num = Math.ceil(Math.random()*10); //生成1-10的随机数
        resove(num);
      },4000)
})
p.then(
  function(data){
    // 这里是执行成功之后的事情。
    console.log(data)
    console.log(somedata);
    //此处我们打印一个不存在的变量，正常情况下，这个会报错，但是，promise是不会往外抛出这个错误的，
    //但是，我们可以使用catch来捕获这个错误。
  },
)
.catch(function(error){
  console.log('error',error)
}) //error ReferenceError: somedata is not defined at <anonymous>:16:17
如果有reject的话，catch率先会捕获reject，而会放弃resove的错误。




all方法。接收一个数组作为参数，数组的元素都是promise。表示
这些promise都完成的时候再回调
格式如下：
Promise
.all([runAsync1(), runAsync2(), runAsync3()])
.then(function(results){
    console.log(results);
});

function runAsync1(){
    return  new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成第一个异步');
            let data = {name:'请问请问',age:12,address:'上海市黄浦区上市'}
            resolve(data);
        }, 3000);
    });
}

function runAsync2(){
    return  new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成第二个异步');
            let data = {name:'请问',age:12,address:'小星星'}
            resolve(data);
        }, 4000);
    });
}

function runAsync3(){
    return  new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成第三个异步');
            let data = {name:'阿萨德',age:12,address:'爱谁谁打死'}
            resolve(data);
        }, 2000);
    });
}

如上所示，all方法接收了三个参数，这三个参数都是promise。
then方法接收一个函数，之前的回调都是返回一个值，这次是三个promise，那么
返回的会是如何？
执行一下结果如下：
    执行完成第三个异步
    执行完成第一个异步
    执行完成第二个异步
results ：[{name:'请问请问',age:12,address:'上海市黄浦区上市'}, {name:'请问',age:12,address:'小星星'}, {name:'阿萨德',age:12,address:'爱谁谁打死'}]
这个时候results会变成一个数组，接收三个promise传递过来的参数。
数组内的元素的顺序是。all函数里的先后顺序，与promise执行完成的先后顺序无关。




race方法：
  all方法表示的是全部都执行完，参照的是最后那一个执行完才调用then方法。以最慢的一个作为参照物。

  race方法则是以最快的一个作为参照物。
  如果最快的一个执行完了，那么直接调用回调，不管其他的。
  最契合的使用方式就是设定一个超时时间,超时之后就不管其他的了
比如：

function requestImg(){
    var p = new Promise(function(resolve, reject){
      setTimeout(function(){
        var data ={name:'john',age:23,address:'上海市宝山区'}
          resolve()
      }, 12000);
    });
    return p;
}

//延时函数，用于给请求计时
function timeout(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('图片请求超时');
        }, 5000);
    });
    return p;
}

Promise
.race([requestImg(), timeout()])
.then(function(results){
    console.log(results);
})
.catch(function(reason){
    console.log(reason);
});

设定timeout promise的执行完毕的时间是五秒钟，如果五秒内，requestImg率先执行完毕，获取了数据，那么
直接调用回调函数，但是，如果五秒内requestImg没有执行完毕，那么timeout就会直接执行，
程序就认为，requestImg卡主了(5秒都没有执行完成，那就不确定还要等多久才能执行完)，为了不影响继续使用，
直接切断requestImg的继续执行。转而执行了timeout。
这个是race方法的一个作用
