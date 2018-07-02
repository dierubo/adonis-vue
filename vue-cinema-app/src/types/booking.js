import namespace from '@/utils/namespace'

export default namespace('booking', {
    getters: [
        'movie',
        'booked',
        'seatsIds', // Saber si el asiento está reservado
        'lastBooking', // Última reserva que se ha hecho
        'formattedBooking'
    ],
    actions: [
        'fetchMovie', // Obtener una película
        'processReservation',
        'lastBooking',
        'fetchMyBookings'
    ],
    mutations: [
        'receivedMovie',
        'setSelectedHour',
        'receivedLastBooking',
        'setMyBookings'
    ]
})
