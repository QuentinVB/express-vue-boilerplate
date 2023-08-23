<script  lang="ts">
//setup
import DebugApiServices from '../services/debug'
import { type Ping } from '../services/debug'

export default {
  name: 'PingView',

  data: function () {
    return {
      ping: {
        status: "None",
        salt: "None",
        timestamp: 0
      },
    }
  },
  methods: {
    RequestPing: function () {
      DebugApiServices.getPingAsync()
        .then(res => {
          //console.log(res);
          this.ping = res.data;
          //ping.value =data;
        })
        .catch(err => {
          console.error(err);
        })
    }
  }
}
</script>

<template>
  <div class="ping">
    <h1>This is a page to ping the server</h1>
    <button type="button" @click="RequestPing">Ping server</button>
    <h2>Ping response</h2>
    <ul>
      <li>Status is {{ ping.status }}</li>
      <li>UUID is {{ ping.salt }}</li>
      <li>Timestamp is {{ ping.timestamp }}</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .ping {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
