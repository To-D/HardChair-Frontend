import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui';

import Login from '@/components/Login'
import Register from '@/components/Register'
import ConferenceApplication from '@/components/ConferenceApplication'
import ConferenceVerification from '@/components/ConferenceVerification'
import ConferenceHome from '@/components/ConferenceHome'
import ConferenceDetail from '@/components/ConferenceDetail'
import Index from '@/components/Index'

import store from '../store'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/conference-application',
            name: 'ConferenceApplication',
            component: ConferenceApplication,
            meta: {
                requireAuth: true, // 需要登录权限
                authRole: 'USER'
            }
        },
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/verification',
            name: 'ConferenceVerification',
            component: ConferenceVerification,
            meta: {
                requireAuth: true,
                authRole: 'ADMIN' // 只有管理员可以访问
            }
        },
        {
            path: '/conference-home',
            name: 'ConferenceHome',
            component: ConferenceHome,
            meta: {
                requireAuth: true,
                authRole: 'USER'
            }
        },
        {
            path: '/conference-detail',
            name: 'ConferenceDetail',
            component: ConferenceDetail,
            meta: {
                requireAuth: true
            }
        },
    ]
})

// 前端登录拦截
router.beforeEach(function(to, from, next) {
    if (to.matched.some(record => record.meta.requireAuth)) {
        // 如果需要登录
        if (store.state.token) {
            // 如果需要对用户权限有要求
            if (to.matched.some(record => record.meta.authRole)) {
                if (store.state.userType == to.meta.authRole) {
                    next()
                } else {
                    next(false);
                    Message.warning({
                        type: 'warning',
                        center: true,
                        dangerouslyUseHTMLString: true,
                        message: "<strong style='color:teal'>Sorry! You don't have the authority!</strong>"
                    })
                }
            } else {
                next();
            }
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 登录成功之后重新跳转到该路由
            })
        }
    } else {
        next()
    }
})