'use strict'

const Model = use('Model')

class Genre extends Model {

    // De esta forma decimo que no vamos a tener la columna createdAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get createdAtColumn() {
        return null
    }

    // De esta forma decimo que no vamos a tener la columna updatedAt. Columna que se crea al hacer tabletimestamp en las migraciones
    static get updatedAtColumn() {
        return null
    }

    // Relación muchos a mucho. Una película puede tener muchos géneros y al revés, un género puede tener muchas películas
    // Aquí seguramente se formará una tabla intermedia
    movies() {
        return this.belongsToMany('App/Models/Movie')
    }
}

module.exports = Genre
