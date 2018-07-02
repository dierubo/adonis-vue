'use strict'

const Booking = use('App/Models/Booking')
const Seat = use('App/Models/Seat')
const Customer = use('App/Models/Customer')
const Database = use('Database')

class BookingController {

    async save({ response, request, auth }) {
        const trx = await Database.beginTransaction()

        const user = await auth.getUser()
        const customer = await Customer.findBy('user_id', user.id)
        const booking = await Booking.create({ // Crear solamente un registro
            customer_id: customer.id,
            movie_showing_time_id: request.input('movie_showing_times_id'),
            booking_seat_count: request.input('seats').length,
            booking_made_date: new Date(),
        }, trx) // Se pasa el parámetro trx para que se ejecute como una transacción

        let seats = [];
        for (let i = 0; i < request.input('seats').length; i++) {
            const current_seat = request.input('seats')[i]
            const seat_row = current_seat.split('-') // 1-5 . Fila 1 asiento 5. Array con la fila y luego el asiento
            seats.push({
                booking_id: booking.id,
                seat_row: seat_row[0],
                seat_number: seat_row[1],
                seat_state: 'BOOKED'
            })
        }
        await Seat.createMany(seats, trx)

        trx.commit()

        return response.json({ res: 'ok' })
    }

    async last({ response, auth }) { // Esto necesitará del middleware JWT
        const user = await auth.getUser()
        const customer = await Customer.findBy('user_id', user.id)
        await customer.loadMany({
            bookings: (booking) => { // Todas las reservas de un cliente
                booking.where('customer_id', customer.id).limit(1).orderBy('id', 'desc')
                    .with('seats')
                    .with('movie_showing_time', async movie_showing_time => {
                        movie_showing_time.select('id', 'hour_to_show', 'movie_showing_id')
                            .with('movie_showing', (movie_showing) => {
                                movie_showing.select('id', 'cinema_id', 'room_id', 'movie_id')
                                    .with('movie', (movie) => {
                                        movie.select('id', 'movie_name')
                                            .with('genres', (genres) => {
                                                gneres.select('id', 'genre_name')
                                            })
                                    })
                                    .with('cinema', (cinema) => {
                                        cinema.select('id', 'cinema_name', 'cinema_address', 'cinema_phone', 'cinema_seat_capacity')
                                    })
                            })
                    })
            }
        })

        return response.json({ data: customer })
    }

    async all({ response, auth }) { // Se quita el limit(1)
        const user = await auth.getUser()
        const customer = await Customer.findBy('user_id', user.id)
        await customer.loadMany({
            bookings: (booking) => { // Todas las reservas de un cliente
                booking.where('customer_id', customer.id).orderBy('id', 'desc')
                    .withCount('seats')
                    .with('movie_showing_time', async movie_showing_time => {
                        movie_showing_time.select('id', 'movie_showing_id')
                            .with('movie_showing', (movie_showing) => {
                                movie_showing.select('id', 'cinema_id', 'room_id', 'movie_id')
                                    .with('movie', (movie) => {
                                        movie.select('id', 'movie_name')
                                            .with('genres', (genres) => {
                                                gneres.select('id', 'genre_name')
                                            })
                                    })
                                    .with('cinema', (cinema) => {
                                        cinema.select('id', 'cinema_name', 'cinema_address', 'cinema_phone', 'cinema_seat_capacity')
                                    })
                            })
                    })
            }
        })
    }
}

module.exports = BookingController
