'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class DatabaseSeeder {
  
  async run () {
    const customersArray = await Factory
      .model('App/Models/Customer')
      .createMany(5); // Esto crearía 5 clientes de forma automática

    const cinemasArray = await Factory
      .model('App/Models/Cinema')
      .createMany(10); // 10 registros en la tabla cinemas

    const genreAction = await Factory
      .model('App/Models/Genre')
      .create({genre_name: 'Acción'}); // Crea un género de Acción

    const genreComedy = await Factory
      .model('App/Models/Genre')
      .create({genre_name: 'Comedia'}); // Crea un género de Comedia

    // Iterar para cada cine e insertar para cada uno de ellos
    cinemasArray.forEach(async(cinema) => {
      // Por cada cine se hará 5 salas, 5 películas
      for(let i = 1; i <= 5; i++) {
        const room = await Factory
          .model('App/Models/Room')
          .createMany({ cinema_id: cinema.id });

        const movie = await Factory
          .model('App/Models/Movie').create(); // No lo estamos relacionando con nada. No tiene relación directa. De por sí es una película que se ve en cualquier cine y sala
        
        // Para insertar relaciones de muchos a muchos, en este caso dentro de una película queremos añadir varios géneros
        await movie.genres().attach([genreAction.id, genreComedy.id]); // Se puede añadir varios parámetros. Dos géneros disponibles

        // En qué momento y en qué día se va a ver una película
        const movie_showing = await Factory
          .model('App/Models/MovieShowing').create({
            cinema_id: cinema.id,
            room_id: room.id,
            movie_id: movie.id
          });

        // Para definir la hora de la película
        const movie_showing_time = await Factory
          .model('App/Models/MovieShowingTime').create({
            movie_showing_id: movie_showing.id,
          });

        // Para cada customer varias reservas y también los asientos
        customersArray.forEach(async (customer) => {
          const booking = await Factory
            .model('App/Models/Booking').create({
              customer_id: customer.id,
              movie_showing_time_id: movie_showing_time.id
            });
          
          await Factory
            .model('App/Models/Seat').create({
              booking_id: booking.id
            });
        })
      }
    });
  }
}

module.exports = DatabaseSeeder
