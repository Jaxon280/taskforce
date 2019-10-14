<template>
  <v-card>
    <v-card-actions>
      <v-btn @click="logout">
        ログアウト
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout'])
  }
};
</script>