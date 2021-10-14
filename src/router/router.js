import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Toolbar from "../components/Toolbar";
import TextEditor from "../components/TextEditor";
import Register from "../components/Register";
import Home from "../components/Home";
import Login from "../components/Login";

const router = new VueRouter({
    // mode: history,
    // base: __dirname,
    routes: [
        {
            path: "/editor", components: {
                toolbar: Toolbar,
                textEditor: TextEditor,
            },
            props: {
                toolbar: true,
                textEditor: true,
            },
            meta: {
                requiresAuth: true
            }
        },
        { path: "/register", component: Register, name: "register" },
        { path: "/", component: Home },
        {
            path: "/login", components: {
                login: Login
            },
            name: "login",
            props: {
                login: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("jwt") == null) {
            next({
                path: "/login"
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;