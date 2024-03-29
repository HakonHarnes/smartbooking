import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

import AccountsPage from './pages/AccountsPage.vue';
import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import CustomersPage from './pages/OrganizationsPage.vue';
import UserDataPage from './pages/UserDataPage.vue';
import ReservationsPage from './pages/ReservetationsPage.vue';
import SettingsPage from './pages/SettingsPage.vue';
import ForgotPasswordPage from './pages/ForgotPasswordPage.vue';
import NotAuthorizedPage from './pages/NotAuthorizedPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';
import ExistingUsers from './components/user/UserData/ExistingUsers.vue';
import ExistingRooms from './components/areas/ExistingAreas.vue';
import ExistingCustomers from './components/customer/ExistingOrganizations.vue';
import NewCustomer from './components/customer/NewOrganization.vue';
import ExistingAccounts from './components/account/ExistingAccounts.vue';
import NewAccount from './components/account/NewAccount.vue';
import NewUser from './components/user/UserData/NewUser.vue';
import NewArea from './components/areas/NewArea.vue';
import UserRoomPage from './pages/UserRoomPage.vue';
import CustomerRoomPage from './pages/CustomerRoomPage.vue';
import ChooseRoom from './components/rooms/ChooseRoom.vue';
import FindRoom from './components/rooms/FindRoom.vue';
import ResetPasswordPage from './pages/ResetPasswordPage.vue';
import AreaSettings from './components/areas/AreaSettings.vue';
import SetPasswordPage from './pages/SetPasswordPage.vue';
import VerificationPage from './pages/VerificationPage.vue';
import InitTwoFactorPage from './pages/InitTwoFactorPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: DashboardPage,
            meta: { requiresAccessToken: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/login',
            component: LoginPage,
            meta: { requiresUnauth: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/glemt-passord',
            component: ForgotPasswordPage,
            meta: { requiresUnauth: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/reset-passord/:token',
            component: ResetPasswordPage,
            meta: { requiresUnauth: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/sett-passord/:token',
            component: SetPasswordPage,
            meta: { requiresUnauth: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/organisasjoner',
            component: CustomersPage,
            meta: { requiresAccessToken: true, roles: ['admin'] },
            children: [
                { path: '', component: ExistingCustomers },
                { path: 'ny', component: NewCustomer }
            ]
        },
        {
            path: '/kontoer',
            component: AccountsPage,
            meta: { requiresAccessToken: true, roles: ['admin'] },
            children: [
                { path: '', component: ExistingAccounts },
                { path: 'ny', component: NewAccount }
            ]
        },
        {
            path: '/brukere',
            component: UserDataPage,
            meta: { requiresAccessToken: true, roles: ['customer'] },
            children: [
                { path: '', component: ExistingUsers },
                { path: 'ny', component: NewUser }
            ]
        },
        {
            path: '/rom',
            component: CustomerRoomPage,
            meta: { requiresAccessToken: true, roles: ['customer'] },
            children: [
                { path: '', component: ExistingRooms },
                { path: 'nytt', component: NewArea },
                { path: 'innstillinger', component: AreaSettings }
            ]
        },
        {
            path: '/finn-rom',
            component: UserRoomPage,
            meta: { requiresAccessToken: true, roles: ['user'] },
            children: [
                { path: '', component: FindRoom },
                { path: ':id', component: ChooseRoom }
            ]
        },
        {
            path: '/reservasjoner',
            component: ReservationsPage,
            meta: { requiresAccessToken: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/innstillinger',
            component: SettingsPage,
            meta: { requiresAccessToken: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/bekreftelse',
            component: VerificationPage,
            meta: { requiresVerificationToken: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/init-to-faktor',
            component: InitTwoFactorPage,
            meta: { requiresVerificationToken: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/401',
            component: NotAuthorizedPage,
            meta: { requiresAccessToken: false, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/404',
            name: 'Not found',
            component: NotFoundPage,
            meta: { requiresAccessToken: true, roles: ['user', 'admin', 'customer'] }
        },
        {
            path: '/:notFound(.*)',
            redirect: { name: 'Not found' },
            meta: { requiresAccessToken: true, roles: ['user', 'admin', 'customer'] }
        }
    ]
});

router.beforeEach(function(to, _, next) {
    const role = store.getters['auth/user'] ? store.getters['auth/user'].role : null;

    // User does not have permissions to view the page
    if (role && !to.meta.roles.includes(role)) {
        return next('/401');
    }

    //
    if (!store.getters['auth/verificationToken'] && to.meta.requiresVerificationToken) {
        return next('/login');
    }

    // User is not authenticated and page requires authentication
    if (!store.getters['auth/accessToken'] && to.meta.requiresAccessToken) {
        return next('/login');
    }

    // User is authenticated but page requires unauthentication
    if (store.getters['auth/accessToken'] && to.meta.requiresUnauth) {
        return next('/');
    }

    next();
});

export default router;
