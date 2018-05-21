'use strict'

const Cinema = use('App/Models/Cinema')
const Genre = use('App/Models/Genre')
const moment = require('moment')

class CinemaController {

    async allCinemas({ response }) {

        const cinemas = await Cinema.query().withCount('rooms as number_of_rooms').fetch() // withCount nos permite acceder al conteo de una relación, es decir a los registros que hay en la tabla que está relacionada
                                                                                        // Aquí queremos saber el número de salas de un cine
        return response.json(cinemas)
    }

    async findCinema({response, params}) {
        const cinema = await Cinema.find(params.id)
        await cinema.loadMany({ // recibe un objeto
            movie_showings: (movie_showing) => { // Esto va a ser la relación que está definida en el modelo de Cinema
                movie_showing
                    .select('id', 'movie_id', 'room_id')
                    .where('movie_show_date', moment(new Date()).format('YYYY-MM-DD'))
                    .with('movie_showing_times', (movie_showing_time) => { // Esto es para consultar con la relación con la tabla movie_showing_times
                        movie_showing_time.where('hour_to_show', '>=', new Date().getHours()) // Las hora que sean superiores a la actual
                            .with('bookings', (bookings) => {
                                bookings.with('seats')
                            })
                    })
                    .with('movie', (movie) => { // Los generos que tiene esta película disponible
                        movie.with('genres', (genres) => {
                            genres.select('genre_name')
                        })
                    })
                    .with('room')// Queremos saber a que cine pertenece la sala y esta sala es la que se va a ver la película
            }
        })

        return response.json({ data: cinema })
    }

    async allGenres({ response }) {
        const genres = await Genre.all();

        return response.json(genres);
    }

}

module.exports = CinemaController
