import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import("@/views/Login.vue")
    },
    {
        path: '/',
        redirect: '/temp'
    },
    {
        path: "/temp",
        name: "Temp",
        component: () => import("@/views/Temp.vue")
    },
    {
        path: "/person",
        name: "Person Home",
        component: Home,
        children: [
            {
                path: "/person/home",
                name: "person home",
                meta: {
                    title: '个人首页'
                },
                component: () => import("@/views/Dashboard.vue")
            },
            {
                path: "/person/beian",
                name: "person beian form",
                meta: {
                    title: '个人备案'
                },
                component: () => import("@/views/beian/PersonBeian.vue")
            },
            {
                path: "/person/tuzai_buy",
                name: "tuzai person buy",
                meta: {
                    title: '购买页面'
                },
                component: () => import("@/views/buy/TuzaiBuy.vue")
            },
            {
                path: "/person/pifa_buy",
                name: "pifa person buy",
                meta: {
                    title: '购买页面'
                },
                component: () => import("@/views/buy/PifaBuy.vue")
            },
            {
                path: "/person/lingshou_buy",
                name: "lingshou person buy",
                meta: {
                    title: '购买页面'
                },
                component: () => import("@/views/buy/LingshouBuy.vue")
            },
            {
                path: "/person/pifa_trace",
                name: "pifa trace",
                meta: {
                    title: '溯源信息'
                },
                component: () => import("@/views/trace/PifaTrace.vue")
            },
            {
                path: "/person/lingshou_trace",
                name: "lingshou trace",
                meta: {
                    title: '溯源信息'
                },
                component: () => import("@/views/trace/LingshouTrace.vue")
            },

        ]
    }, {
        path: "/qiye",
        name: "Qiye Home",
        component: Home,
        children: [
            {
                path: "/qiye/home",
                name: "qiye home",
                meta: {
                    title: '企业首页'
                },
                component: () => import("@/views/Dashboard.vue")
            },
            {
                path: "/qiye/beian",
                name: "qiye beian form",
                meta: {
                    title: '企业备案'
                },
                component: () => import("@/views/beian/QiyeBeian.vue")
            },
            {
                path: "/qiye/tuzai_import_list",
                name: "tuzai import list",
                meta: {
                    title: '屠宰进场'
                },
                component: () => import("@/views/import/TuzaiImportList.vue")
            },
            {
                path: "/qiye/pifa_import_list",
                name: "pifa import list",
                meta: {
                    title: '批发进场'
                },
                component: () => import("@/views/import/PifaImportList.vue")
            },
            {
                path: "/qiye/lingshou_import_list",
                name: "lingshou import list",
                meta: {
                    title: '零售进场'
                },
                component: () => import("@/views/import/LingshouImportList.vue")
            },
            {
                path: "/qiye/tuzai_deal",
                name: "tuzai deal",
                meta: {
                    title: '交易页面'
                },
                component: () => import("@/views/deal/TuzaiDeal.vue")
            },
            {
                path: "/qiye/pifa_deal",
                name: "pifa deal",
                meta: {
                    title: '交易页面'
                },
                component: () => import("@/views/deal/PifaDeal.vue")
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        role
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;