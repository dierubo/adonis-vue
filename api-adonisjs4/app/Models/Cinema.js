'use strict'

const Model = use('Model')

class Cinema extends Model {

    // De esta forma decimo que no vamos a tener la columna createdAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get createdAtColumn() {
        return null
    }

    // De esta forma decimo que no vamos a tener la columna updatedAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get updatedAtColumn() {
        return null
    }

    // Un cine puede tener muchas películas en curso
    movie_showings() {
        return this.hasMany('App/Models/MovieShowing')
    }

    // Un cine puede tener muchas salas
    rooms() {
        return this.hasMany('App/Models/Room')
    }
}

module.exports = Cinema
