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
      {{thedata}}

      <q-card-section>
        <!-- <q-btn rounded color="primary" :to="{name : 'agentsub'}" no-caps label="agentsub" class="full-width" @click="login()" /> -->
        <q-btn rounded color="primary" no-caps label="Login" class="full-width" @click="login()" />
      </q-card-section>
      <q-card-actions align="center" class="text-grey">
        <q-btn no-caps flat :to="{name : 'register'}" label="Don't Have an Account?" />
      </q-card-actions>
    </q-card>

  </div>
</template>

<script>


export default {
  // name: 'ComponentName',
  data () {
    return {
      thedata:null,
      form:{
        email: '',
        password: '',
      }
    }
  },

  methods: {
    async login(){
      this.$axios.post('http://localhost:8000/api/login', this.form).then(response => {
        console.log('response: ', response.data)
        // console.log('response: ', 'response')
        this.$router.push({name: 'home', params:{item: response.data.user}});
      })
      .catch(error=>{
        if (error.response) {
          // this.$q.notify({message: error.response.data.message, color: 'orange'})
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
    },


  },
}
</script>
