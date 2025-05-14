import { createRouter, createWebHistory } from "vue-router";
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
 
import SignUp from '../pages/SignUp.vue'
import store from "../store";
import Preview from "../pages/Preview.vue";

import Profile from "../pages/Profile.vue";
import Dashboard from "../pages/Dashboard.vue";
import NotFound from "../pages/NotFound.vue";
const routes=[
    {
        path:'/',
        component:Home
    
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/sign-up',
        component:SignUp
    },
    {
        path:'/profile',
        component:Profile
    }
    , {
        path:'/preview/:id',
        component:Preview
    },
    {
        path:'/dashboard',
        component:Dashboard,
        meta: { requiresAuth: true }
    
    },
     {
        path:"/:pathMatch(.*)*",
        component:NotFound
    }
]
     


const router=createRouter({
    history:createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    const isLoggedIn = store.state.isLogin;
  
    if ((to.path === '/login' || to.path === '/sign-up') && isLoggedIn) {
      next('/dashboard?pageno=1');
    }
    
    else if(to.path==='/'&&!isLoggedIn){
         next('/dashboard?pageno=1')
    }
    else if(to.path==='/'&&isLoggedIn){
         next('/dashboard?pageno=1')
    }
    
     else if (to.meta.requiresAuth && !isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  });
export default router;