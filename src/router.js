import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import CustomersPage from './pages/CustomersPage.vue';
import UserDataPage from './pages/UserDataPage.vue';
import RoomPage from './pages/RoomPage.vue';
import ReservationsPage from './pages/ReservetationsPage.vue';
import StatisticsPage from './pages/StatisticsPage.vue';
import SettingsPage from './pages/SettingsPage.vue';
import ForgotPassword from './pages/ForgotPassword.vue';
import NotAuthorizedPage from './pages/NotAuthorizedPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';
import ExistingUsers from './components/user/UserData/ExistingUsers.vue';
import NewUser from './components/user/UserData/NewUser.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: DashboardPage,
            meta: { requiresAuth: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/login',
            component: LoginPage,
            meta: { requiresUnauth: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/glemt',
            component: ForgotPassword,
            meta: { requiresUnauth: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/kunder',
            component: CustomersPage,
            meta: { requiresAuth: true, roles: ['admin'] }
        },
        {
            path: '/brukere',
            component: UserDataPage,
            meta: { requiresAuth: true, roles: ['customer'] },
            children: [
                { path: '', component: ExistingUsers },
                { path: 'ny', component: NewUser }
            ]
        },
        {
            path: '/rom',
            component: RoomPage,
            meta: { requiresAuth: true, roles: ['user', 'customer'] }
        },
        {
            path: '/reservasjoner',
            component: ReservationsPage,
            meta: { requiresAuth: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/statistikk',
            component: StatisticsPage,
            meta: { requiresAuth: true, roles: ['admin', 'customer'] }
        },
        {
            path: '/innstillinger',
            component: SettingsPage,
            meta: { requiresAuth: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/401',
            component: NotAuthorizedPage,
            meta: { requiresAuth: false, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/404',
            name: 'Not found',
            component: NotFoundPage,
            meta: { requiresAuth: false, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/:notFound(.*)',
            redirect: { name: 'Not found' },
            meta: { requiresAuth: false, roles: ['user', 'admin', 'customer'] }
        }
    ]
});

router.beforeEach(function(to, _, next) {
    const role = store.getters.role;

    // User does not have permissions to view the page
    if (role && !to.meta.roles.includes(role)) {
        return next('/401');
    }

    // User is not authenticated and page requires authentication
    if (!store.getters.isAuthenticated && to.meta.requiresAuth) {
        return next('/login');
    }

    // User is authenticated but page requires unauthentication
    if (store.getters.isAuthenticated && to.meta.requiresUnauth) {
        return next('/');
    }

    next();
});

export default router;
