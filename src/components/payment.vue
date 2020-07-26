<template>
  <div class="column flex-center q-gutter-xs">
    <q-card class="row full-width">
      <q-card-section>
        Balance: <span class="text-bold">‎₦{{thedata}}</span>
      </q-card-section>
      <q-space />
      <q-card-section>
        Account No: <span class="text-bold">{{$route.params.item.balance.account_nr}}</span>
      </q-card-section>
    </q-card>

    <q-tabs v-model="tab" class="">
      <q-tab name="send" icon="send" label="Send Money" />
      <q-tab name="load" icon="ion-card" label="Load Wallet" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
      <q-tab-panel name="send">
        <q-card flat >
          <div class="column flex-center">
            <q-btn class="text-h4" to="/" flat dense stack no-caps label="Send Money"/>
          </div>
          <q-card-section class="q-gutter-sm">
            <q-input square outlined v-model="form.account_nr" label="Account" />
            <q-input square outlined v-model="form.amount" label="Amount" />
          </q-card-section>

          <q-card-section>
            <q-btn rounded color="primary" no-caps label="Send" class="full-width" @click="push_amount()" />
          </q-card-section>
        </q-card>
      </q-tab-panel>
      <q-tab-panel name="load">
      <q-card flat >
        <div class="column flex-center">
          <q-btn class="text-h4" to="/" flat dense stack no-caps label="Load Money"/>
        </div>
        <q-card-section class="q-gutter-sm">
          <q-input square outlined v-model="form.account_nr" label="Account" />
        </q-card-section>

        <q-card-section>
          <q-btn rounded color="primary" no-caps label="Send" class="full-width" @click="push_amount()" />
        </q-card-section>
      </q-card>
      </q-tab-panel>
    </q-tab-panels>

      <!-- {{$route.params.item.balance.amount}} -->


  </div>
</template>

<script>


export default {
  // name: 'ComponentName',
  data () {
    return {
      thedata:null,
      tab: 'send',
      form:{
        id: this.$route.params.item.id,
        account_nr: '',
        amount: '',
      }
    }
  },

  methods: {
    async push_amount(){
      this.$axios.post('http://localhost:8000/api/transaction', this.form)
      .then(response => {
        console.log('response: ', response.data.balance)
        this.thedata = response.data.balance.amount
        // thedata = response.data

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
  mounted() {
    this.thedata = this.$route.params.item.balance.amount
  },
}
</script>
