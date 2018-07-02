<template>
  <div>
    <div class="col-md-3 col-xs-12" id="filters">
      <cinema-filter></cinema-filter>
    </div>

    <div class="col-md-9 col-xs-12" id="cinemas">
        <div v-if="cinemas.length > 0">
          <div v-for="(cinema, index) in cinemas">
            <cinema-item :cinema="cinema" :key="index"></cinema-item>
            <div class="clearfix"></div>
            <hr />
          </div>
        </div>

        <div v-else>
          <div class="alert alert-danger">
            {{ $t('cinema.empty') }}
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import cinemaTypes from '@/types/cinema';
  import {mapGetters} from 'vuex';
  import CinemaItem from "./CinemaItem";
  import CinemaFilter from "./CinemaFilter";
  export default {
    components: {
      CinemaFilter,
      CinemaItem},
    name: 'cinema-list',
    mounted () {
       this.$store.dispatch(cinemaTypes.actions.fetchCinemas);
    },
    computed: {
      ...mapGetters({
        cinemas: cinemaTypes.getters.cinemas
      })
    }
  }
</script>
