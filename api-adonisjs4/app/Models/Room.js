'use strict'

const Model = use('Model')

class Room extends Model {

    // De esta forma decimo que no vamos a tener la columna createdAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get createdAtColumn() {
        return null
    }

    // De esta forma decimo que no vamos a tener la columna updatedAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get updatedAtColumn() {
        return null
    }

    // La película se proyectas muchas veces en una sala
    movie_showing() {
        return this.hasMany('App/Models/MovieShowing')
    }
}

module.exports = Room
