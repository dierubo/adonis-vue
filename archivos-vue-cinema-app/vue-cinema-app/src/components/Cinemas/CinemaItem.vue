<template>
  <div class="col-md-12 col-xs-12 CinemaItem__Wrapper">
    <div class="col-md-5 col-xs-12">
      <img :src="cinema.cinema_screenshot" class="img-responsive" />
    </div>

    <div class="col-md-7 col-xs-12">
      <h2>
        <router-link :to="{name: 'cinema', params: {id: cinema.id}}">
          {{ $t('cinema.name') }}: {{ cinema.cinema_name }}
        </router-link>
      </h2>
      <h3>
        {{ $t('cinema.address') }}: {{ cinema.cinema_address }}
      </h3>
      <p>
        {{ $t('cinema.details') }}: {{ cinema.cinema_details }}
      </p>
      <p>
        {{ $t('cinema.telephone') }}: {{ cinema.cinema_phone }}
      </p>
      <p>
        {{ $t('cinema.seats') }}: {{ cinema.cinema_seat_capacity }}
      </p>
      <p>
        {{ $t('cinema.rooms') }}: {{ cinema.__meta__.number_of_rooms }}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cinema-item',
    props: {
        cinema: {
            type: Object,
            required: true
        }
    }
  }
</script>

<style scoped>
  .CinemaItem__Wrapper {
    background: #181D23 !important;
    padding: 10px;
  }
  .CinemaItem__Wrapper h2 {
    margin-top: 0;
  }
</style>
