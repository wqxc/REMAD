mutation:就是转变，改变的意思，
想要修改state的唯一的方法就是提交mutation
用法如下：
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})

在你需要修改state的时候提交mutation

store.commit('increment')


你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：

比如：store.comm]('increment',10)
在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：
比如：
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})

Mutation 必须是同步函数
一条重要的原则就是要记住 mutation 必须是同步函数。
