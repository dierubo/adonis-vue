<template>
    <div class="register col-md-6 col-md-offset-3">
        <h1 class="text-center text-muted">
            <u v-html="$t('register.title')"></u>
        </h1>

        <div class="alert alert-danger" v-if="error" v-html="$t('register.error')"></div>
        <hr />

        <div class="well">
            <form autocomplete="off" class="form-horizontal" @submit.prevent="validateBeforeSubmit">
                <div class="form-group">
                    <label class="control-label col-md-4" for="email" v-html="$t('register.email')"></label>
                    <div class="col-md-8" :class="{ 'has-error' : errors.has('email') }">
                        <input autocomplete="off" name="email" v-model="email" v-validate data-vv-rules="required|email" class="form-control" type="text" id="email" :placeholder="$t('register.email')" :class="{ 'has-error' : errors.has('email') }">
                        <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-4" for="password" v-html="$t('register.password')"></label>
                    <div class="col-md-8" :class="{ 'has-error' : errors.has('password') }">
                        <input autocomplete="off" name="password" v-model="password" v-validate data-vv-rules="required|min:6" class="form-control" type="password" id="password" :placeholder="$t('register.password')" :class="{ 'has-error' : errors.has('password') }">
                        <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-md-4" for="password_confirmation" v-html="$t('register.password_confirmation')"></label>
                    <div class="col-md-8" :class="{ 'has-error' : errors.has('password_confirmation') }">
                        <input autocomplete="off" name="password_confirmation" v-model="password_confirmation" v-validate data-vv-rules="required|confirmed:password" class="form-control" type="password" id="password_confirmation" :placeholder="$t('register.password_confirmation')" :class="{ 'has-error' : errors.has('password_confirmation') }">
                        <span v-show="errors.has('password_confirmation')" class="text-danger">{{ errors.first('password_confirmation') }}</span>
                    </div>
                </div>

                <button type="submit" class="btn btn-success btn-block" v-html="$t('register.title')"></button>
            </form>
        </div>
    </div>
</template>

<script>
    import authTypes from '@/types/auth';
    import {mapActions} from 'vuex';
    export default {
        name: 'register',
        data() {
            return {
                email: '',
                password: '',
                password_confirmation: '',
                error: null
            }
        },
        methods: {
            ...mapActions({
                register: authTypes.actions.register
            }),
            validateBeforeSubmit() {
                this.$validator.validateAll().then(result => {
                    if (!result) {
                    //hay errores. fallan las validaciones
                    } else {
                        this.register({
                            email: this.email,
                            password: this.password,
                            username: ''
                        })
                        .then(res => {
                            this.$router.push('/login');
                        },
                        error => {
                            this.error = true;
                        })

                    }
                })
                .catch(error => {
                    console.log(error);
                    this.error = true;
                })
            }
        }
    }
</script>