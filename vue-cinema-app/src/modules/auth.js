import types from '@/types/auth';
import globalTypes from '@/types/global';
import Vue from 'vue';

// Esqueleto del módulo - Compuesto por estado, acciones, getters y mutaciones, y se devuelve en un objeto para que pueda ser insertado en la 
// tienda global

const state = {
    user: null,
    logged: !!window.localStorage.getItem('_token') // Para saber si el usuario está logado. Lo convierte en un booleano para saber si el usuario está usando la sesión de localStorage
};

const actions = {
    [types.actions.login]: ({commit}, userInput) => { // Los datos del formulario del login
        commit(globalTypes.mutations.startProcessing); // PAra bloquear la pantalla con blockUI

        return new Promise( (resolve, reject) => {
            Vue.http.post('login', {user: userInput}) // Estos son los datos que vamos a enviar, el objeto, a la API
                .then(user => {
                    window.localStorage.setItem('_token', user.body.token);
                    commit(types.mutations.setUser);
                    resolve(user); // Se está devolviendo el usuario que estamos creando en la aplicación
                })
                .catch( error => { // Capturar el error en caso de que falle la promesa
                    reject(error);
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                })
        });
    },
    [types.actions.register]: ({commit}, userInput) => { // Los datos del formulario del registro
        commit(globalTypes.mutations.startProcessing); // PAra bloquear la pantalla con blockUI

        return new Promise( (resolve, reject) => {
            Vue.http.post('register', {user: userInput})
                .then(user => {
                    resolver(user);
                })
                .catch(error => {
                    reject(error);
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                })
        });
    },
    [types.actions.updateProfile]: ({commit}, userInput) => { // Los datos para al actualización del usuario
        commit(globalTypes.mutations.startProcessing); // PAra bloquear la pantalla con blockUI

        return new Promise( (resolve, reject) => {
            Vue.http.put('profile', {user: userInput}) // Estos son los datos que vamos a enviar, el objeto, a la API
                .then(user => {
                    window.localStorage.setItem('_token', user.body.token); // Se inserta un nuevo token porque cuando se cambia el email o el username el payLoado del token 
                                                            //también cambiará y como vamos a estar utilizando el token, tenemos que actualizar el token en el cliente.
                                                            // Por eso, actualizamos el token con los nuevo datos que llegan desde la api
                    commit(types.mutations.setUser);
                    resolve(user); // Se está devolviendo el usuario que estamos creando en la aplicación
                })
                .catch( error => { // Capturar el error en caso de que falle la promesa
                    reject(error);
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                })
        });
    },
    [types.actions.logout]: ({ commit }) => {
        window.localStorage.removeItem('_token'); // Se elimina el token
        commit(types.mutations.setUser);  // como va a comprobar si existe el token, como no lo va a encontrar pondrá el state.logged a FALSE
    }
};

const getters = {
    // Se obtiene el usuario
    [types.getters.user]: (state) => {
        return state.user;
    },
    // está logueado
    [types.getters.logged]: (state) => {
        return state.logged;
    }
};

const mutations = {
    // Se establece el user a través del token jwt. [types.mutations.setUser] --> setUser se encuentra en el archivo types/auth
    [types.mutations.setUser]: (state) => {
        if (window.localStorage.getItem('_token')) {
            
            const token = window.localStorage.getItem('_token');
            const jwtDecode = require('jwt-decode');

            state.user = jwtDecode(token); // El usuario decodificado desde la API y se convierte en un objeto con los datos del usuario
            state.logged = true;

        } else {
            // Si el usuario no está logueado o no existe
            state.logged = false;
            state.user = null;
        }
    },
    [types.mutations.setLogged]: (state, logged) => { // Establecemos el estado de si el usuario está o no logueado
        state.logged = logged;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
}

