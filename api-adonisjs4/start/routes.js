'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

// Se creará un grupo de rutas para que esas rutas tengan el prefijo 'api/v1' y pertenezcan a ese grupo
Route.group(() => {
    // api/v1/login y quien va a atender la acción el AuthController y su método Login
    Route.post('login', 'AuthController.login');
    Route.post('register', 'AuthController.register');
    // la ruta será 'api/v1/profile' y antes de ir al controlador pasará por 'auth:jwt (json web token)' que es un método que existe dentro de 
    // adonis y lo que va a hacer es comprobar que viene a través de los HEADERS de la petición que estamos haciendo un HEADER que se llama authorization y
    // que este HEADER esté compuesto por un string - token. Lo que hará con ese token es comprobar que coincide con un usuario de la base de datos y ejecutará
    // el método profile dentro de AuthController. En caso de que falle devolverá una excepción
    Route.put('profile', 'AuthController.profile').middleware(['auth:jwt']);

    // De esta forma podremos acceder a una cine y recogiendo el parámetro con la función params
    Route.get('cinema/:id', 'CinemaController.findCinema');
    Route.get('cinemas', 'CinemaController.allCinemas');
    Route.get('genres', 'CinemaController.allGenres'); // Mostrar los géneros

    Route.get('movies/:cinemaId/byCinema', 'MovieController.byCinema'); // Todas las películas que pertenezcan a ese cine
    Route.get('movies/:movieId/byMovie', 'MovieController.byMovie'); // Acceder a una película

    // Solamente se podrá reservar los usuarios que estén registrados
    Route.post('booking', 'BookingController.save').middleware(['auth:jwt']);
    // Una vez que haya hecho la última reserva se lo mostraremos
    Route.get('bookings/last', 'BookingController.last').middleware(['auth:jwt']);
    Route.get('bookings/all', 'BookingController.all').middleware(['auth:jwt']);
    
}).prefix('api/v1');
