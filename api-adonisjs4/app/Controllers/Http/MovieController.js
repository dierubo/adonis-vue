'use strict'

const Cinema = use('App/Models/Cinema')
const MovieShowing = use('App/Models/MovieShowing')
const moment = require('moment')

class MovieController {

    async byCinema({ response, params }) {
        const cinema = await Cinema.find( params.cinemaId )
        await cinema.loadMany({
            movie_showings: (movie_showing) => { // Podemos acceder a las relaciones del modelo
                movie_showing
                    .select('id', 'movie_id', 'room_id')
                    .where('movie_show_date', moment(new Date()).format('YYYY-MM-DD'))
                    .with('movie_showing_times', (movie_showing_time) => {
                        movie_showing_time.where('hour_to_show', '>=', new Date().getHours()) // Las hora que sean superiores a la actual
                    })
                    .with('movie', (movie) => { // Los generos que tiene esta película disponible
                        movie.with('genres', (genres) => {
                            genres.select('genre_name')
                        })
                    })
                    .with('room')// Queremos saber a que cine pertenece la sala y esta sala es la que se va a ver la película
            }
        })

        return response.json(cinema);
    }

    async bymovie({ response }) {
        const movie = await MovieShowing.findBy('movie_id', params.movieId)
        await movie.loadMany({ 
            movie_showing_times: (movie_showing_times) => {
                movie_showing_times
                    .where('hour_to_show', '>=', new Date().getHours())
                    .with('bookings', (bookings) => {
                        bookings.with('seats')
                    })
            },
            movie: (movie) => {
                movie.with('genres', (genres) => {
                    genres.select('genre_name')
                })
            },
            room: null
        })

        return response.json(movie)
    }
}

module.exports = MovieController
