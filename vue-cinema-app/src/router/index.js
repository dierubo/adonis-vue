import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// components

/////////

// types
import authTypes from '@/types/auth';
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';
import Cinemas from '@/components/Cinemas/Cinemas';
import Movies from '@/components/Movies/Movies';
import Booking from '@/components/Booking/Booking';
import BookingLast from '@/components/Booking/BookingLast';
import Bookings from '@/components/Profile/Booking';
import Profile from '@/components/Profile/Profile';
////////////

// global store
import {store} from '@/main';
//////////

// configurar router

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { Auth: false, title: 'Iniciar sesión' }, // False porque no requiere autenticación
            beforeEnter: (to, from, next) => { // Antes de que se entre en el componente
                if (store.state.authModule.logged) { // Si el usuario está identificado o no. Está consultando la variable de Modules/auth.js en const state.logged
                    next({ path: '/'}); // Si el usuario está identificado lo enviamos al directorio raíz
                } else {
                    next();
                }
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { Auth: false, title: 'Registrarme' }, // False porque no requiere autenticación
            beforeEnter: (to, from, next) => { // Antes de que se entre en el componente
                if (store.state.authModule.logged) { // Si el usuario está identificado o no. Está consultando la variable de Modules/auth.js en const state.logged
                    next({ path: '/'}); // Si el usuario está identificado lo enviamos al directorio raíz
                } else {
                    next();
                }
            }
        },
        {
            path: '/',
            name: 'cinemas',
            component: Cinemas,
            meta: { Auth: false, title: 'Cines' }, // False porque no requiere autenticación
        },
        {
            path: '/cinema/:id',
            name: 'cinema',
            component: Movies,
            meta: { Auth: false, title: 'Listado de Películas' }, // False porque no requiere autenticación
        },
        { // Las rutas estáticas siempre tienen que ir antes que las rutas dinámicas (/booking/:movieId)
            path: '/booking/last',
            name: 'booking-last',
            component: BookingLast,
            meta: { Auth: true, title: 'Tú última reserva' },
        },
        {
            path: '/booking/:movieId',
            name: 'booking',
            component: Booking,
            meta: { Auth: true, title: 'Realizar una reserva' },
        },
        {
            path: '/bookings',
            name: 'bookings',
            component: Bookings,
            meta: { Auth: true, title: 'Mis reservas' },
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: { Auth: true, title: 'Perfil usuario' },
        },

    ]
})
////////////////

// Para cada petición o cambio de ruta
router.beforeEach( (to, from, next) => {
    document.title = to.meta.title;
    if (to.meta.Auth && !store.state.authModule.logged) { // Comprobación de si el usuario está conectado o no y si a la ruta (to) necesita autenticación
        next({path: '/login'}); // el usuario no está logueado y le llevamos a login
    } else {
        if (store.state.authModule.logged) { // Comprueba si el usuario está logueado
            store.commit(authTypes.mutations.setUser); // Para que persista el usuario al actualizar el navegador
        }
        next();
    }
})
/////////////////////////

export default router;
