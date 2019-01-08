routes主要包含以下这些内容。
path,
name:
component:
懒加载组件：
component: resolve => require(['./page/linkParamsQuestion.vue'], resolve)
这样就可以在需要的时候再加载这个组件，提升访问速度。

router传参：
路由传参 /:id
params传参。this.$routes.push({name:'component',params:{id:1}})


全局的钩子函数。
beforeEach(to,from,next)=>{
  next()
}

路由独享的钩子函数：
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})

组件内的钩子函数：
在组件内使用。
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}

路由元信息。用来匹配每一个路由的详细情况，比如，这个组件加载是不是必须要登录。
routes: [
    {
      path: '/foo',
      component: Foo,
      meta: { requiresAuth: true }
    }
  ]
