<template>
  <div class="register col-md-6 col-md-offset-3">
    <h1 class="text-center text-muted">
      <u v-html="$t('register.title')"></u>
    </h1>

    <div class="alert alert-danger" v-if="error" v-html="$t('register.error')">
    </div>

    <hr />

    <user-form
      :user="user"
      :btnText="$t('register.title')"
      :isRegister="true"
      v-on:processUserForm="processRegister($event)"
    ></user-form>

  </div>
</template>

<script>
  import authTypes from '@/types/auth';
  import {mapActions} from 'vuex';
  import UserForm from "./UserForm";
  export default {
    components: {UserForm},
    name: 'register',
    data () {
        return {
          user: {
            email: '',
            password: '',
            password_confirmation: '',
          },
          error: null
        }
    },
    methods: {
      ...mapActions({
        register: authTypes.actions.register
      }),
      processRegister (user) {
        this.register({
          email: user.email,
          password: user.password
        })
          .then(res => {
            this.$router.push('/login')
          }, err => {
            this.error = true
          })
      }
    }
  }
</script>
