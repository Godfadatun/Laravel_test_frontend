<template>
  <div class="flex flex-center">
    <Login v-if="theroute == 'login'" />
    <Register v-if="theroute == 'register'" />
  </div>
</template>

<script>
import Login from '../components/auth/login'
import Register from '../components/auth/register'
export default {
  // name: 'ComponentName',
  components:{
    Login, Register
  },
  data () {
    return {}
  },
  computed: {
    theroute(){return this.$route.name}
  },
}
</script>
