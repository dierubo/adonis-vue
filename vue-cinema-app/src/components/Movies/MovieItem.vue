<template>
    <div class="col-md-12 col-xs-12 MovieItem__Wrapper">
        <div class="col-md-5 col-xs-12">
        <img :src="movie.movie.movie_screenshot" class="img-responsive" />
        <div class="clearfix"></div><br />
            <button v-if="canBooking && booking" @click="$emit('startReservation', movie.movie.id)" class="btn btn-warning btn-block">{{ $t('movie.reservation') }}</button>
        </div>
        <div class="col-md-7 col-xs-12">
            <h2>{{ $t('movie.name') }}: {{ movie.movie.movie_name }}</h2>
            <h3>{{ $t('movie.director') }}: {{ movie.movie.movie_director }}</h3>
            <p>{{ $t('movie.synopsis') }}: {{ movie.movie.movie_synopsis }}</p>
            <p>{{ $t('movie.room_number') }}: {{ movie.room.room_number }}</p>
            <p>{{ $t('movie.room_rows') }}: {{ movie.room.room_rows }}</p>
            <p>{{ $t('movie.room_seats') }}: {{ movie.room.room_seats }}</p>
            <div class="col-md-6">
                <!-- Componente para mostrar los géneros -->
                <movie-genres :genres="movie.movie.genres"></movie-genres>
            </div>
            <div class="col-md-6">
                <!-- Componente para mostrar las horas disponibles -->
                <!-- Este emit vendría del componente pero de dentro y sería el mismo -->
                <movie-showing-times @selectHour="$emit('selectHour', $event)" :showing_times="movie.movie_showing_times"></movie-showing-times>
            </div>
        </div>
    </div>
</template>

<script>
import MovieGenres from "./MovieGenres";
import MovieShowingTimes from "./MovieShowingTimes";

export default {
    components: {
        MovieShowingTimes,
        MovieGenres
    },
    name: 'movie',
    props: {
        movie: {
            type: Object,
            required: true
        },
        booking: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        canBooking () {
            return this.movie.movie_showing_times.length > 0; // Devuelve true o false si la película todavía se puede reservar. Es decir si son las 16h y la pelí es a las 21h
        }
    }
  }
</script>

<style scoped>
    .MovieItem__Wrapper {
        background: #181D23 !important;
        padding: 10px;
    }
    .MovieItem__Wrapper h2 {
        margin-top: 0;
    }
</style>
