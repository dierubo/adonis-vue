'use strict'

const Model = use('Model')

class Booking extends Model {

    // De esta forma decimo que no vamos a tener la columna createdAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get createdAtColumn() {
        return null
    }

    // De esta forma decimo que no vamos a tener la columna updatedAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get updatedAtColumn() {
        return null
    }

    // Una reserva puede tener mucho asientos reservados. Con hasMany podemos definirlo
    seats() {
        // Aquí como primer parámetro es el modelo relacionado, después la PK y la FK. Solo se le pasará el primer parámetro
        return this.hasMany('App/Models/Seat');
    }

    // La reserva pertenecerá a una película en ese tiempo
    movie_showing_time() {
        return this.belongsTo('App/Models/MovieShowingTime')
    }
}

module.exports = Booking
