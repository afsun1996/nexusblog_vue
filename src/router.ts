import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "project",
      component: () => import("./views/project.vue")
    },
    {
      path: "/articles",
      name: "articles",
      // route level code-splitting
      // this generates a separate chunk (articles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "articles" */ "./views/articles.vue")
    },
    {
      path: "/archive",
      name: "archive",
      component: () =>
        import(/* webpackChunkName: "archive" */ "./views/archive.vue")
    },
    {
      path: "/project",
      name: "project",
      component: () =>
        import(/* webpackChunkName: "project" */ "./views/project.vue")
    },
    {
      path: "/message",
      name: "message",
      component: () =>
        import(/* webpackChunkName: "message" */ "./views/message.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/articleDetail.vue")
    },
    {
      path: "/articleDetail",
      name: "articleDetail",
      component: () =>
        import(/* webpackChunkName: "articleDetail" */ "./views/articleDetail.vue")
    }
  ]
});
