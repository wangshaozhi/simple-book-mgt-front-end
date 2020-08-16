import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //用户名
    username: '',
    menuList: [] //菜单列表
  },
  mutations: {
    saveUserName(state, val) {
      state.username = val;
      localStorage.setItem('username', val);
    },
    initMenuList(state, val) {
      state.menuList = val;
      console.log(state.menuList)
    },
    //清空state中username信息，并将localstore中的数据也清除
    clearUsername(state,val)
    {
      state.username=val;
      localStorage.removeItem('username',val);
    }
  },
  actions: {
    //提交commit，从而改变state中的username
    changeName(context, args) {
      context.commit('saveUserName', args)
    },
    initMenuLists(context, arg) {
      context.commit('initMenuList', arg)
    },
    clearUsername(context,args)
    {
      context.commit('clearUsername',args);
    }
  },
  modules: {}
});