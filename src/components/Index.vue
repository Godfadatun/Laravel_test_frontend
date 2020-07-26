<template>
  <div class="fl(ex flex-center">
    <q-card class="my-card">
      <q-card-section>
        {{balance}}
      </q-card-section>
    </q-card>

  </div>
</template>

<style>
</style>

<script>
export default {
  // name: 'HelloWorld'
  data() {
    return {
      balance:''
    }
  },
  methods: {
    thebalance(){
      this.$axios.get('http://localhost:8000/api/balance')
      .then(response => {
        console.log('response: ', response.data.data)
        this.balance =  response.data.data
        // return response.data
      })
     .catch(error=>{
        if (error.response) {
          this.$q.notify({message: error.response.data.message, color: 'orange'})
          // return error.response
        } else if (error.request) {
          console.log(error.request);
          // return error.request
        } else {
          console.log('Error', error.message);
          // return error.message
        }
      })
    }
  },
  mounted() {
    this.thebalance()
  },
}
</script>
