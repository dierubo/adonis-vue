import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

//types and components
import authTypes from '@/types/auth';
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';
import Cinemas from '@/components/Cinemas/Cinemas';
import Movies from '@/components/Movies/Movies';
import Booking from '@/components/Booking/Booking';
import BookingLast from '@/components/Booking/BookingLast';
import Bookings from '@/components/Profile/Bookings';
import Profile from '@/components/Profile/Profile';
//.types and components

//global store
import {store} from '@/main';
//.global store

//configurar el router
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { Auth: false, title: 'Iniciar sesión' },
      beforeEnter: (to, from, next) => {
        if(store.state.authModule.logged) {
          next({ path: '/' });
        } else {
          next();
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { Auth: false, title: 'Registrarme' },
      beforeEnter: (to, from, next) => {
        if(store.state.authModule.logged) {
          next({ path: '/' });
        } else {
          next();
        }
      }
    },
    {
      path: '/',
      name: 'cinemas',
      component: Cinemas,
      meta: { Auth: false, title: 'Cines' },
    },
    {
      path: '/cinema/:id',
      name: 'cinema',
      component: Movies,
      meta: { Auth: false, title: 'Listado de películas' }
    },
    {
      path: '/booking/last',
      name: 'booking-last',
      component: BookingLast,
      meta: { Auth: true, title: 'Tu última reserva' }
    },
    {
      path: '/booking/:movieId',
      name: 'booking',
      component: Booking,
      meta: { Auth: true, title: 'Hacer una reserva' }
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: Bookings,
      meta: { Auth: true, title: 'Mis reservas' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { Auth: true, title: 'Perfil usuario' }
    }
  ]
});
//.configurar el router

//para cada cambio de ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.meta.Auth && !store.state.authModule.logged) {
    next({path: '/login'});
  } else {
    if (store.state.authModule.logged) {
      store.commit(authTypes.mutations.setUser);
    }
    next();
  }
});
//.para cada cambio de ruta

export default router;
