import types from '@/types/cinema';
import globalTypes from '@/types/global';
import Vue from 'vue';

const state = {
    cinemas: [],
    query: { // Con lo que se va a hacer consultas. Las consultas que vamos a poder hacer
        search: '',
        rooms: null,
        seats: null
    }
};

const actions = {
    [types.actions.fetchCinemas]: ({commit}) => {
        commit(globalTypes.mutations.startProcessing); // Para procesar una petición se hace con el commit() el cual va a ejecutar una mutación
        Vue.http.get('cinemas').then(cinemas => { // Se obtiene todos los cines
            commit(types.mutations.receivedCinemas, {apiResponse: cinemas}); // se pasan los cines para establecer el estado. Se pasa como un objeto
            commit(globalTypes.mutations.stopProcessing); // Se para (de parar) para que desaparezca el blockUI
        })
    }
};

const getters = {
    [types.getters.search]: state => state.query.search, // Obtener el estado search
    [types.getters.rooms]: state => state.query.rooms,
    [types.getters.seats]: state => state.query.seats,
    [types.getters.cinemas]: (state) => {
        let cinemas = state.cinemas;
        if(state.query.search) {
            cinemas = cinemas.filter(cinema => cinema.cinema_name.toLowerCase().includes(state.query.search))
        }
        if(state.query.rooms) {
            cinemas = cinemas.filter(cinema => cinema.__meta__.number_of_rooms >= state.query.rooms);
        }
        if(state.query.seats) {
            cinemas = cinemas.filter(cinema => cinema.cinema_seat_capacity >= state.query.seats);
        }
        return cinemas;
    }
};

const mutations = {
    [types.mutations.receivedCinemas]: (state, {apiResponse}) => {
        state.cinemas = apiResponse.data; // Con esto ya ponemos los cines en la aplicación
    },
    [types.mutations.setSearch]: (state, query) => {
        state.query.search = query;
    },
    [types.mutations.setRooms]: (state, rooms) => {
        state.query.rooms = rooms;
    },
    [types.mutations.setSeats]: (state, seats) => {
        state.query.seats = seats;
    },
    [types.mutations.clearFilter]: (state) => {
        state.query = {
            search: '',
            rooms: null,
            seats: null
        }
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};