<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
    <v-bottom-navigation
    :value="activeBtn"
    app
    grow v-show="$store.state.login_user"
    >
      <v-btn to='/tasks' icon>
        <span>タスク</span>
        <v-icon>assignment</v-icon>
      </v-btn>

      <v-btn to='/taskbox' icon>
        <span>タスクBox</span>
        <v-icon>all_inbox</v-icon>
      </v-btn>

      <v-btn to='/account' icon>
        <span>アカウント</span>
        <v-icon>account_box</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import firebase from 'firebase'

export default {
  name: 'App',
  components: {
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user)
        this.fetchTasks()
        if (this.$router.currentRoute.name === 'home') this.$router.push({name:'taskbox'})
      } else {
        this.deleteLoginUser()
        this.$router.push({ name: 'home'})
      }
    })
  }, 
  data() {
    return {
      activeBtn: 1
    //
    }
  },
  methods: {
    ...mapActions(['setLoginUser','deleteLoginUser','deleteLoginUser','fetchTasks'])
  }
};
</script>

<style>
</style>
