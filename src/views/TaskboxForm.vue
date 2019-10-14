<template>
  <v-container>
    <v-card>
      <v-card-title>フォームに入力</v-card-title>
      <v-card-actions>
        <v-text-field
          v-model="task.name"
          :counter="12"
          label="タスク名"
          required
        ></v-text-field>
      </v-card-actions>
      <v-card-actions>
        <v-btn color='info' class="mr-4" @click="submit">保存</v-btn>
        <v-btn @click="$router.push({ name: 'taskbox' })">キャンセル</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  created() {
    if (!this.$route.params.task_id) return

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
      if (this.$route.params.task_id) {
        this.updateTask({id: this.$route.params.task_id, task: this.task})
      } else {
        this.addTask(this.task)
      }
      this.$router.push({name:'taskbox'})
      this.task = {}
    },
    ...mapActions(['addTask','updateTask'])
  },
}
</script>