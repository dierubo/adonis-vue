import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// components

/////////

// types
import authTypes from '@/types/auth';
import globalTypes from '@/types/global';
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';
////////////

// global store
import {store} from '@/main';
//////////

// configurar router

const router = new Router({
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
        }

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
            store.commit(authTypes.mutations.setUser);
        }
        next();
    }
})
/////////////////////////

export default router;
