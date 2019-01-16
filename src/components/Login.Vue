<template>
    <div>
    
        <div class="row">
            <div class="col s2 m2 l3"></div>
            <div class="col s12 m8 l6 login">
                <div class="card z-depth-1" style="padding: 50px;">
                    <h3 class="center">Login</h3>
                    <div class="row">
                        
                        <div class="col m8">
                            <input type="text" v-model="email" placeholder="Email">
                            <input type="password" v-model="password" placeholder="Password">
                        </div>
                       
                       
                            
                                       
                    </div>
                    <a class="button is-rounded blue lighten-3 wave-light wave-effect" v-on:click="login">login</a>
                </div>
            </div>
            <div class="col s2 m2 l3">

            </div>
        </div>
        
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'Login',
        data: function () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login: function () {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        //alert('Well done! You are now connected')
                        this.$router.replace('board')
                    },
                    function (err) {
                        //alert('Oops. ' + err.message)
                    }
                )
            }
        }
    }
</script>
<style scoped>
    .login {
        background-color: white;
        margin-top: 10vh
    }
    input {
        margin: 10px 0;
        width: 20%;
        padding: 15px;
    }
    button {
        margin-top: 20px;
        width: 1%;
        cursor: pointer;
    }
</style>
