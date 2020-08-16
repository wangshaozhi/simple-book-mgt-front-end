import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index'
import menuListApi from '../api/menuList'
import AdminIndex from '../components/admin/AdminIndex'
import Index from '../components/admin/index'
Vue.use(VueRouter);

const routes = [{
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/components/login'),
    meta: {
      title: '登录页面'
    }
  },
  {
    path: '/register',
    name: 'Register',
    hidden: true,
    component: () => import('@/components/register'),
    meta: {
      title: '注册页面'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminIndex,
    meta: {
      requireAuth: false
    },
    children: [{
        path: '/admin/index',
        name: 'Index',
        component: Index,
        meta: {
          requireAuth: false,
          title: '项目简介'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/login',
    hidden: true
  }
];

//格式化返回的路由信息
const formatRoutes = routes => {
  let resultRoutes = [];
  routes.forEach(item => {
    //这个地方少加了item.children赋值
    item.children = !!item.children ?
      formatRoutes(item.children) :
      null; //如果有孩子，继续对孩子格式化
    let resRoutes = {
      path: item.path,
      component: resolve => {
        require([
          `../components/admin/${item.component}.vue`
        ], resolve);
      },
      name: item.name,
      nameZh: item.nameZh,
      iconCls: item.iconCls,
      meta: {
        requireAuth: true,
        title: item.nameZh
      },
      children: item.children
    };
    resultRoutes.push(resRoutes);
  });
  return resultRoutes;
};
//初始化菜单 两个参数不能简写必须用括号包起来
const initMenuList = (router, store) => {
  if (store.state.menuList.length > 0) {
    return;
  } else {
    menuListApi.getMenuList()
      .then(res => {
        if (res && res.status == 200) {
          let result = formatRoutes(res.data.data);
          router.addRoutes(result);
          // router.options.routes = router.options.routes.concat(
          //   result
          // );
          //如果菜单中有数据才去添加到store中,否则为空数组
          result.length > 0 ? store.dispatch("initMenuLists", result) : [];
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (store.state.username && to.path.startsWith("/admin")) {
    initMenuList(router, store)
    // console.log(to)
  }
  //将to的title赋值给document
  if (to.meta.title) {
    document.title = to.meta.title
  }
  //如果刷新了，重新渲染菜单
  if (store.state.menuList.length === 0) {
    console.log(to.fullPath)
    //如果是去登录页，则不再初始化菜单
    if (to.fullPath == '/login') {

    } else {
      initMenuList(router, store)
    }
  } else {
    next()
  }
  next()
});
export default router;