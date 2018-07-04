import namespace from '@/utils/namespace';

export default namespace('cinema', {
    getters: [
        'cinemas',
        'search',
        'rooms',
        'seats'
    ],
    actions: [
        'fetchCinemas', // Todos los cinemas
    ],
    mutations: [
        'receivedCinemas',
        'setSearch',
        'setRooms',
        'setSeats',
        'clearFilter'
    ]
})