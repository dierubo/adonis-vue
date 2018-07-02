import Vue from 'vue'
import App from '@/App.vue' // Lo de la @ es un alias que está definido en el webpack.config.js en el apartado resolve

import router from '@/router'

// vue resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://127.0.0.1:3333/api/v1/'; // La URL base de la API
Vue.http.interceptors.push( (request, next) => { // Para enviar el token en cada petición
  console.log(window.localStorage.getItem('_token'));
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`);
  // Siempre se ha de enviar con Bearer porque luego ADONIS va a hacer un split de la palabra más un espacio y se quedará con el token
  next(); // Para que el flujo de nuestra aplicación continue
});
//////

// VUEX -- El almacen de datos de la aplicación
import Vuex from 'vuex';
Vue.use(Vuex);
////////////////

// block --- Bloquear la pantalla para que el usuario no pueda interactuar
import BlockUI from 'vue-blockui';
Vue.use(BlockUI);
//////////////

// Módulos y tipos
import globalTypes from '@/types/global';
import authModule from '@/modules/auth';
import cinemaModule from '@/modules/cinema';
import movieModule from '@/modules/movie';
import bookingModule from '@/modules/booking';
////////////////////

// vee-validate - Esto se puede ver en el apartado de Vue de Chrome. Esto saca el apartado computed de cada etiqueta <Root>, <App>, etc
import VeeValidate, {Validator} from 'vee-validate';
import validatorEs from '@/validator/es';
import validatorEn from '@/validator/en';

Validator.localize('es', validatorEs); // Se carga de inicio el español

Vue.use(VeeValidate);
//////////////////

// Vue Tables-2
import {ClientTable} from 'vue-tables-2';
// ClientTable, opciones y vuex, pero decimos que no lo vamos a usar por eso ponemos FALSE , y para los estilos Bootstrap y el tema que es default
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');
/////////////////////

// Global Store de datos con Vuex - Configuración tienda global
export const store = new Vuex.Store({
  // Tener la información a nivel global como con módulos
  state: {
    processing: false, // De inicio no se va a procesar ninguna petición
    language: 'es',    
  },
  actions: { // Una acción normalmente ejecuta una mutación que lo que hace es actualizar un estado de los datos de la tienda
    [globalTypes.actions.changeLanguage]: ({ commit}, lang) => {
      commit(globalTypes.mutations.setLanguage, lang); // Se va a ejecutar la mutación setLanguage que hay más abajo

      switch (lang) {
        case 'en': {
          Validator.localize('en', validatorEn);
          break;
        }
        case 'es': {
          Validator.localize('es', validatorEs);
          break;
        }
      }
    }
  },
  getters: { // Acceder información del estado
    [globalTypes.getters.processing]: state => state.processing,
    [globalTypes.getters.language]: state => state.language
  },
  mutations: { // actualizar un estado de los datos de la store
    [globalTypes.mutations.startProcessing] (state) {
      state.processing = true;
    },
    [globalTypes.mutations.stopProcessing] (state) {
      state.processing = false;
    },
    [globalTypes.mutations.setLanguage] (state, lang) {
      state.language = lang;
    }
  },
  modules: {
    authModule,
    cinemaModule,
    movieModule,
    bookingModule
  }

});

////////////////////////////

// Vue traducciones 
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import messages from '@/translations'

const i18n = new VueI18n({ // Le decimos a la aplicación que use las traducciones
  locale: store.state.language,
  messages // es lo mismo que messages: messages
})


new Vue({
  el: '#app',
  render: h => h(App),
  store, // Para que podamos utilizar nuestro almacen en la aplicación
  i18n,
  router
})
