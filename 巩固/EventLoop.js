Event Loop是从任务队列循环取出任务来执行。
那么任务总归有个先后顺序的，正常来说，先后顺序如下：

script(主程序代码，同步的任务，new,func(),等等)—>process.nextTick—>Promises...——>setTimeout——>setInterval——>setImmediate——> I/O——>UI rendering

在Job queue中的队列分为两种类型：macro-task和microTask。我们举例来看执行顺序的规定，我们设

macro-task队列包含任务: a1, a2 , a3
micro-task队列包含任务: b1, b2 , b3

执行顺序为，首先执行marco-task队列开头的任务，也就是 a1 任务，执行完毕后，在执行micro-task队列里的所有任务，也就是依次执行***b1, b2 , b3***，执行完后清空micro-task中的任务，接着执行marco-task中的第二个任务，依次循环。

了解完了macro-task和micro-task两种队列的执行顺序之后，我们接着来看，真实场景下这两种类型的队列里真正包含的任务（我们以node V8引擎为例），在node V8中，这两种类型的真实任务顺序如下所示：

macro-task队列真实包含任务：

script(主程序代码),setTimeout, setInterval, setImmediate, I/O, UI rendering

micro-task队列真实包含任务：
process.nextTick, Promises, Object.observe, MutationObserver

由此我们得到的执行顺序应该为：

script(主程序代码)—>process.nextTick—>Promises, Object.observe, MutationObserver ——>setTimeout——>setInterval——>setImmediate——> I/O——>UI rendering

在ES6中macro-task队列又称为ScriptJobs，而micro-task又称PromiseJobs


一般而言，我们称macro-task为宏认为。micro-task为微任务。
而js任务队列的抓取情况是
宏任务--微任务--微任务--..(一直到没有微任务)--宏任务--微任务--。。依次循环
其中宏任务包括几类：script主程序，就是一些同步任务。
而后是setTimeout;setInterval;setImmediate;I/O，UI rendering。

而微任务包含 process.nextTick(这个是node服务端的方法)
Promises,Object.observe,MutationObserver

比如：
setTimeout(function(){console.log(1)},0);
new Promise(function(resolve,reject){
   console.log(2);
   resolve();
}).then(function(){console.log(3)
}).then(function(){console.log(4)});

process.nextTick(function(){console.log(5)});

console.log(6);

按照规则来一个一个梳理一下这段代码：
宏任务 new Promise() setTimeout() console.log(6);
这几个都是宏任务
但是宏任务也是分类的

new Promise()
console.log(6);
是一类，表示script的主程序，也就是同步任务。
根据规则他们先执行，率先打印出2和6；
这里有个迷惑的地方在于。Promise明明是微任务，
这里的Promise是一个构造函数，只是他的名字叫做Promise而已。
而后是微任务：
分别是：process.nextTick();promise.then().then()
先后顺序也是process在前，promise在后。
所以打印结果是5,3,4；
至此微任务完成，那么接下来就是另外一个宏任务了。setTimeout()了。
所以，最后才输出1
整个的输出顺序就是2,6,5,3,4,1
