import $ from "jquery";
import jwt_decode from "jwt-decode";
const ModuleUser = {
  state: {
    id: "",
    username: "",
    photo: "",
    followerCount: 0,
    access: "",
    refresh: "",
    is_login: false,
  },
  getters: {},
  mutations: {
    updateUser(state, user) {
      state.id = user.id;
      state.username = user.username;
      state.photo = user.photo;
      state.followerCount = user.followerCount;
      state.access = user.access;
      state.refresh = user.refresh;
      state.is_login = user.is_login;
    },
    updateAccess(state, access) {
      state.access = access;
    },
    updateLogout(state, user) {
      state.id = user.id;
      state.username = user.username;
      state.photo = user.photo;
      state.followerCount = user.followerCount;
      state.access = user.access;
      state.refresh = user.refresh;
      state.is_login = user.is_login;
    },
  },
  actions: {
    login(context, data) {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/api/token/",
        type: "POST",
        data: {
          username: data.username,
          password: data.password,
        },
        success(resp) {
          const { access, refresh } = resp;
          const access_obj = jwt_decode(access);

          setInterval(() => {
            $.ajax({
              url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
              type: "POST",
              data: {
                refresh, //key与value一样可以简写
              },
              success(resp) {
                context.commit("updateAccess", resp.access);
              },
            });
          }, 4.5 * 60 * 1000);
          $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            data: {
              user_id: access_obj.user_id,
            },
            headers: { //jwt验证
              Authorization: "Bearer " + access,
            },
            success(resp) {
              context.commit("updateUser", {
                ...resp,
                access: access,
                refresh: refresh,
                is_login: true,
              });
              data.success();
            },
          });
        },
        error() {
          data.error();
        },
      });
    },
    logout(context) {
      context.commit("updateLogout", {
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        access: "",
        refresh: "",
        is_login: false,
      });
    },
  },
  modules: {},
};

export default ModuleUser;
