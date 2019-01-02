所谓的模块化，其实简单的来说就是拆分，将复杂的系统拆分成一个个独立的模块，而后再组装在一起，
便于重复利用和版本迭代。
一个模块就是实现了某种功能的代码，有了模块化就能够更加方便快捷的使用别人的工具。

commonjs规范：
    在CommonJs规范中：

    一个文件就是一个模块，拥有单独的作用域；

    普通方式定义的变量、函数、对象都属于该模块内；

    通过require来加载模块；

    通过exports和modul.exports来暴露模块中的内容；

    所有代码都运行在模块作用域，不会污染全局作用域；
    模块可以多次加载，但只会在第一次加载的时候运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果；
    模块的加载顺序，按照代码的出现顺序是同步加载的;

    浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量。

    module
    exports
    require
    global


简单的来说，commonjs是同步的模块加载，更加适用于服务端，因为全部的资源都是在服务端的硬盘中存储的，
但是，浏览器端却是不行，因为全部的资源都需要从服务器获取，受制于网速，同步加载会导致浏览器假死。

AMD
因为commonjs的一些问题，浏览器端更为合适的是AMD规范的方案，
其实就是异步模块化，因为是异步的，所以也就不会阻塞浏览器。
实现AMD规范的例子就是require;

AMD标准中，定义了下面两个API：

   1.require([module], callback)

   2. define(id, [depends], callback)
   即通过define来定义一个模块，然后使用require来加载一个模块。 并且，require还支持CommonJS的模块导出方式。

   定义alert模块：

   //alert.js
   define(function () {
       var alertName = function (str) {
         alert("I am " + str);
       }
       var alertAge = function (num) {
         alert("I am " + num + " years old");
       }
       return {
         alertName: alertName,
         alertAge: alertAge
       };
     });

     使用
     require(['alert'], function (alert) {
      alert.alertName('JohnZhu');
      alert.alertAge(21);
    });

    但是，在使用require.js的时候，我们必须要提前加载所有的依赖，然后才可以使用，而不是需要使用时再加载。
    优点：

    适合在浏览器环境中异步加载模块。可以并行加载多个模块。
    缺点：

    提高了开发成本，并且不能按需加载，而是必须提前加载所有的依赖。


CMD
    CMD规范是阿里的玉伯提出来的，实现js库为sea.js。
    它和requirejs非常类似，即一个js文件就是一个模块，但是CMD的加载方式更加优秀，
    是通过按需加载的方式，而不是必须在模块开始就加载所有的依赖。如下：

    define(function(require, exports, module) {
      var $ = require('jquery');//在需要的时候加载进来，而不是像require那样，实现全部加载
      var Spinning = require('./spinning');
      exports.doSomething = ...
      module.exports = ...
    })
    优点：
    同样实现了浏览器端的模块化加载。
    可以按需加载，依赖就近。

    缺点：
    依赖SPM打包，模块的加载逻辑偏重。

    其实，这时我们就可以看出AMD和CMD的区别了，
    前者是对于依赖的模块提前执行，而后者是延迟执行。
     前者推崇依赖前置，而后者推崇依赖就近，即只在需要用到某个模块的时候再require。 如下：

    // AMD
    define(['./a', './b'], function(a, b) {  // 依赖必须一开始就写好
       a.doSomething()
       // 此处略去 100 行
       b.doSomething()
       ...
    });
    // CMD
    define(function(require, exports, module) {
       var a = require('./a')
       a.doSomething()
       // 此处略去 100 行
       var b = require('./b')
       // 依赖可以就近书写
       b.doSomething()
       // ...
    });


es6的模块化

    之前的几种模块化方案都是前端社区自己实现的，
    只是得到了大家的认可和广泛使用，而ES6的模块化方案是真正的规范。
    在ES6中，我们可以使用 import 关键字引入模块，
    通过 export 关键字导出模块，功能较之于前几个方案更为强大，也是我们所推崇的，
    但是由于ES6目前无法在浏览器中执行，所以，我们只能通过babel将不被支持的import编译为当前受到广泛支持的 require。

    虽然目前import和require的区别不大，但是还是推荐使用使用es6，因为未来es6必定是主流，对于代码的迁移成本还是非常容易的。 如：

      import store from '../store/index'
      import {mapState, mapMutations, mapActions} from 'vuex'
      import axios from '../assets/js/request'
      import util from '../utils/js/util.js'

      export default {
        created () {
          this.getClassify();

          this.RESET_VALUE();
          console.log('created' ,new Date().getTime());
        }
      }
