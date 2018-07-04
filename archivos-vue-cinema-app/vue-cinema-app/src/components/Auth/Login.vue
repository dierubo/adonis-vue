<template>
  <div class="login col-md-6 col-md-offset-3">

    <h1 class="text-center text-muted">
      <u v-html="$t('login.title')"></u>
    </h1>

    <div class="alert alert-danger" v-if="error" v-html="$t('login.error')"></div>

    <hr />

    <user-form
      :isLogin="true"
      :user="user"
      :btnText="$t('login.title')"
      v-on:processUserForm="processLogin($event)"
    ></user-form>

  </div>
</template>

<script>
  import authTypes from '@/types/auth';
  import {mapActions} from 'vuex';
  import UserForm from "./UserForm";
  export default {
    components: {UserForm},
    name: 'login',
    data () {
      return {
        user: {
          email: '',
          password: '',
        },
        error: null
      }
    },
    methods: {
      ...mapActions({
        login: authTypes.actions.login
      }),
      processLogin (user) {
        this.login({
          email: user.email,
          password: user.password
        })
          .then(
            user => {
              this.$router.push('/');
            },
            error => {
              this.error = true;
            })
      }
    }
  }
</script>
