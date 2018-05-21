'use strict'

const Model = use('Model')

class MovieShowing extends Model {

    // De esta forma decimo que no vamos a tener la columna createdAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get createdAtColumn() {
        return null
    }

    // De esta forma decimo que no vamos a tener la columna updatedAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get updatedAtColumn() {
        return null
    }

    // Pertencerá en ese momento solamente a una película
    movie() {
        return this.belongsTo('App/Models/Movie')
    }

    // Tendrá esta relación porque tendrá muchos momentos en el tiempo. tiene una FK en el schema de su tabla
    movie_showing_times() {
        return this.hasMany('App/Models/MovieShowingTime')
    }

    // Pertencerá en ese momento solamente a una sala
    room() {
        return this.belongsTo('App/Models/Room')
    }

    // Pertencerá en ese momento solamente a un cine
    cinema() {
        return this.belongsTo('App/Models/Cinema')
    }
}

module.exports = MovieShowing
