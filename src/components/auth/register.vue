<template>
  <div class="flex flex-center">
      <!-- {{thedata}} <br /><br />
      {{thedata.config.data}} -->
    <q-card flat >
      <div class="column flex-center">
        <q-btn class="text-h4" to="/" flat dense stack no-caps label="Billisimo"/>
      </div>
        <q-card-section class="q-gutter-sm">
        <!-- <div v-if="error" class="text-red">PIN Issues</div> -->
        <q-input outlined dense rounded type="email" v-model="form.name" label="Enter Your Name" >
          <template v-slot:prepend >
            <div class="row flex-center">
              <q-icon name="ion-ios-contact" />
              <div class="q-px-sm">|</div>
            </div>
          </template>
        </q-input>

        <q-input outlined dense rounded v-model="form.email" label="Enter Email" type="email" >
          <template v-slot:prepend >
            <div class="row flex-center">
              <q-icon name="ion-ios-at" />
              <div class="q-px-sm">|</div>
            </div>
          </template>
        </q-input>
        <q-input outlined dense rounded v-model="form.phone" label="Enter Phone Number" maxlength="11" type="text" oninput="value=value.replace(/[^\d]/g,'')">
          <template v-slot:prepend >
            <div class="text-green row flex-center">
              <q-icon name="ion-call" />
              <div class="q-px-sm">|</div>
            </div>
          </template>
        </q-input>
        <q-input outlined dense rounded type="password" v-model="form.password" label="Create Your 6 Digit PIN" maxlength="6" >
          <template v-slot:prepend>
            <q-icon name="ion-lock" />
            <div class="q-px-sm">|</div>
          </template>
        </q-input>
        <q-input outlined dense rounded type="password" v-model="form.confirm_password" label="Confirm PIN" maxlength="6" >
          <template v-slot:prepend>
            <q-icon name="ion-unlock" />
            <div class="q-px-sm">|</div>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-btn rounded color="primary" no-caps label="Sign Up" class="full-width" @click="signup()" />
      </q-card-section>
      <q-card-actions align="center" class="text-grey">
        <q-btn no-caps flat :to="{name : 'login'}" label="Already Have an Account? Login" />
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
        name: '',
        email: '',
        phone: '',
        password: '',
      }
    }
  },

  methods: {
    async signup(){
      if (this.form.pin == this.form.confirm_pin) {
        this.error = false
        this.$axios.post('http://localhost:8000/api/register', this.form)

      .then(response => {
        console.log('response: ', response)
        this.$router.push({name: 'login'});
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
    }
  },


  },
}
</script>
