<template>
    <div>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3 style="margin-top:200px">
      <v-card>
         <h3 class="headline mb-0" style="text-align:center;padding-top:30px">LOGIN</h3>

      <form style="padding:40px">
        <v-text-field v-on:keyup.enter="submit"
        v-model="email"
       
        
       placeholder="Username"
       
        ></v-text-field>
        <v-text-field  v-on:keyup.enter="submit"
        :type="'password'"
        v-model="password"
        
        placeholder="Password"
       
       
        ></v-text-field>
   
        <div class="center" style="padding-left:42%; padding-right:50%">

        <v-btn @click="submit">Login</v-btn>
        </div>
   
  </form>

        
      </v-card>
    </v-flex>
  </v-layout>
       
            
          
        
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
            submit: function () {

                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        //alert('Well done! You are now connected')
                        this.$router.replace('board')
                    },
                    function (err) {
                        alert( err.message)
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
