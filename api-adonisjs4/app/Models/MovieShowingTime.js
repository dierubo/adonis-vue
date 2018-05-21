'use strict'

const Model = use('Model')

class MovieShowingTime extends Model {

    // De esta forma decimo que no vamos a tener la columna createdAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get createdAtColumn() {
        return null
    }

    // De esta forma decimo que no vamos a tener la columna updatedAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get updatedAtColumn() {
        return null
    }

    // Va a tener un momento en el que se vea la película y día
    movie_showing() {
        return this.belongsTo('App/Models/MovieShowing')
    }

    // En el momento que se ve la película tiene muchas reservas
    bookings() {
        return this.hasMany('App/Models/Booking')
    }
}

module.exports = MovieShowingTime
