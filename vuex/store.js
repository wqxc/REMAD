
由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：
Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。
比如：
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}



2.mapState
他是state的语法糖，主要是用来辅助state的，比如：
我们通过计算属性来监控state，但是如果我们有多个state需要监控的话，
每一个都写一个函数，显得太过于臃肿，所以，mapState就能够进行整合，简便操作
用法如下：
computed: mapState({
    count: 'count', // 第一种写法
    sex: (state) => state.sex, // 第二种写法
    from: function (state) { // 用普通函数this指向vue实例,要注意
      return this.str + ':' + state.from
    },
    // 注意下面的写法看起来和上面相同,事实上箭头函数的this指针并没有指向vue实例,因此不要滥用箭头函数
    // from: (state) => this.str + ':' + state.from
    myCmpted: function () {
      // 这里不需要state,测试一下computed的原有用法
      return '测试' + this.str
    },
    // 映射 this.count 为 store.state.count我们甚至可以直接写一个字符串。
    'count'
})
或者是使用：
...mapState({
   // ...
   "count",
   .....
 })


3.getter
getter可以简单的理解为state的计算属性，计算值会被缓存起来，直到依赖的值发生变化才会重新执行。
比如：
有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：
正常的使用方式如下：
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
这样写并没有什么问题，但是如果有多个组件需要用到此属性，那就要么写很多遍，或者抽出来到一个共享函数里，多出导入。
但是有了getter就不一样了。直接如下所示。
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

访问:
通过属性访问
Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：
Getter 也可以接受其他 getter 作为第二个参数如下：
getters: {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}

通过方法访问
我们也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }


mapGetter辅助函数
与mapState辅助函数一样。
用法：
computed: {
 // 使用对象展开运算符将 getter 混入 computed 对象中；... 是es6的展开运算符
   ...mapGetters([
     'doneTodosCount',
     'anotherGetter',
     // ...
   ])
 }
 或者是：
 mapGetters({
    // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    doneCount: 'doneTodosCount'
  })
