<template>
  <v-container>
    <v-card>
      <v-card-title>フォームに入力</v-card-title>
      <v-text-field
        v-model="task.name"
        :counter="12"
        label="タスク名"
        required
      ></v-text-field>
      <v-btn color='info' class="mr-4">保存</v-btn>
      <v-btn @click="$router.push({ name: 'tasks' })">キャンセル</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  created() {
    const task = this.$store.getters.getTaskById(this.$route.params.task_id)
    if (task) {
      this.task = task
    } else {
      this.$router.push({ name: 'taskbox'})
    }
  },
  data() {
    return {
      task: {}
    }
  },
  methods: {
    submit () {
      this.updateTask({id: this.$route.params.task_id, task: this.task})
      this.$router.push({name:'tasks'})
      this.task = {}
    },
    ...mapActions(['updateTask'])
  },
}
</script>