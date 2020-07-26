<template>
  <div>
    <q-card flat bordered class="my-card">
      <q-card-section class="row">
         <q-btn flat round color="primary" icon="ion-ios-arrow-back" :to="{name: 'dashboard'}" />
          <q-space />
          <div class="text-h6 text-capitalize">{{$route.params.item+' History'}}</div>
      </q-card-section>
    </q-card>

     <q-table
     flat
      v-if="Array.isArray(transact)"
      :data="transact"
      :columns="columns"
      row-key="name"
    >
    </q-table>

    <div v-else class="text-center text-h5 text-grey q-py-md">{{transact}}</div>
  </div>
</template>

<script>

export default {
  // name: 'ComponentName',
  data () {
    return {
      columns: [
        { name: 'phone', align: 'center', label: 'Phone', field: 'phone', sortable: true },
        { name: 'amount', label: 'Amount(‎₦)', field: 'amount', sortable: true },
        { name: 'reciever', label: 'Recievers Phone', field: 'reciever' },
        { name: 'recv_name', label: 'Recievers Name', field: 'recv_name' },
        { name: 'tx_ref', label: 'Transaction Reference', field: 'tx_ref' },
        { name: 'createdAt', label: 'Date', field: 'createdAt', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],

    }
  },
  computed:{
    transact(){
      return this.$store.getters["Auth/transaction"]
     },
  },
}
</script>
