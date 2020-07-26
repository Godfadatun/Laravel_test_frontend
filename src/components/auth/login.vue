<template>
  <div class="flex flex-center">
      <!-- {{thedata}} <br /><br />
      {{thedata.config.data}} -->
    <q-card flat >
      <div class="column flex-center">
        <q-btn class="text-h4" to="/" flat dense stack no-caps label="Billisimo"/>
      </div>
  <q-card-section class="q-gutter-sm">
        <q-input outlined dense rounded v-model="form.email" label="Enter Email" type="email">
          <template v-slot:prepend>
            <div class="row flex-center">
              <q-icon name="ion-ios-contact" />
              <div class="q-px-sm">|</div>
            </div>
          </template>
        </q-input>
        <q-input outlined type="password" dense rounded v-model="form.password" label="Enter Your Password" maxlength="6" >
          <template v-slot:prepend>
            <q-icon name="ion-unlock" />
            <div class="q-px-sm">|</div>
          </template>
        </q-input>

      </q-card-section>

      <q-card-section>
        <!-- <q-btn rounded color="primary" :to="{name : 'agentsub'}" no-caps label="agentsub" class="full-width" @click="login()" /> -->
        <q-btn rounded color="primary" no-caps label="Login" class="full-width" @click="login()" />
      </q-card-section>
      <q-card-actions align="center" class="text-grey">
        <q-btn no-caps flat :to="{name : 'register'}" label="Don't Have an Account?" />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">You are about to Logout, are you sure?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </div>
</template>

<script>


export default {
  // name: 'ComponentName',
  data () {
    return {
      thedata:null,
      alert:false,
      form:{
        email: '',
        password: '',
      }
    }
  },

  methods: {
    async login(){
      this.$axios.post('http://localhost:8000/api/login', this.form)
      .then(response => {
        console.log('response: ', response.data.data)
        // this.thedata = response;
        // this.$q.localStorage.set('branchless_token', response.data.token)
        // this.$q.localStorage.set('branchless_is_agent', response.data.data.agent)
        // this.$q.localStorage.set('branchless_is_subscribed', response.data.data.subscribed)
        // this.$axios.defaults.headers.common["Authorization"] = response.data.token
        // this.$q.notify({message: 'Login successful', color: 'green'})
        // this.$store.commit('Auth/login', response.data.token)
        // this.$store.commit('Auth/is_agent', response.data.data.agent)
        // this.$store.commit('Auth/is_subscribed', response.data.data.subscribed)
        // this.getUser(response.data.data)
      })
      .catch(error=>{
        if (error.response) {
          this.$q.notify({message: error.response.data.message, color: 'orange'})
          if(error.response.data.message == 'unverified'){
            this.$router.push('otp/'+this.form.phone);
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
    },

    // async getUser(agencySub){
    //   this.$axios.get('https://branchless.world/branposdev01/user/userDetails')
    //    .then(response => {
    //     this.$store.dispatch("Auth/thebanklist");
    //     this.$store.commit('Auth/user', response.data.data)
    //     if (agencySub.agent && !agencySub.subscribed) {
    //       this.$router.push({name: 'agentsub'})
    //     }else this.$router.push({name: 'dashboard'});
    //     // this.$router.push({name: 'dashboard'});
    //   })
    //   .catch(error=>{
    //     console.log('err: ', error)
    //     if (error.response) {
    //       // Request made and server responded
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log('Error', error.message);
    //     }
    //   })
    // }
  },
}
</script>
