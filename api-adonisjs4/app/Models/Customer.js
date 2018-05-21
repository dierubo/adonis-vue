'use strict'

const Model = use('Model')

class Customer extends Model {

    // De esta forma decimo que no vamos a tener la columna createdAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get createdAtColumn() {
        return null
    }

    // De esta forma decimo que no vamos a tener la columna updatedAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get updatedAtColumn() {
        return null
    }

    // Un cliente puede tener muchas reservas
    bookings() {
        return this.hasMany('App/Models/Booking')
    }
}

module.exports = Customer
