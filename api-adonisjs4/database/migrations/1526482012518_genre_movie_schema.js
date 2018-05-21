'use strict'

const Schema = use('Schema')

class GenreMovieSchema extends Schema {
  up () {
    this.create('genre_movie', (table) => { // Tabla intermedia entre los generos y las películas
      table.integer('movie_id').unsigned() // Con unsigned signfica que tendrás números positivos, es decir de 0 en adelante
      table.foreign('movie_id').references('movies.id')
      table.integer('genre_id').unsigned()
      table.foreign('genre_id').references('genres.id')
    })
  }

  down () {
    this.drop('genre_movie')
  }
}

module.exports = GenreMovieSchema
