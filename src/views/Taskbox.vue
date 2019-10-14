<template>
  <v-container>
    <v-card>
      <v-list>
        <v-card-title>タスクBox</v-card-title>
        <template v-for="(task, index) in tasks">
          <v-divider v-if = "index - 1 < tasks.length" :key="`top-${index}`"></v-divider>
          <v-list-item
            v-show="task.category === ''"
            :key="task.name"
            @click="$router.push({name: 'task_question',params:{task_id: task.id}})"
          >
            <v-list-item-content>
              <v-list-item-title v-html="task.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="$router.push({name: 'taskbox_edit', params: { task_id: task.id}})">
                <v-icon color="grey lighten-1">edit</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn icon @click="deleteTaskToTaskbox(task.id)">
                <v-icon color="grey lighten-1">delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if = "index === tasks.length - 1" :key="`buttom-${index}`"></v-divider>
        </template>
        <v-list-item>
          <v-btn text small color="primary" @click="$router.push({name: 'taskbox_edit'})">
            タスクを追加
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  created() {
    this.tasks = this.$store.state.tasks
  },
  components: {
    
  },
  data () {
    return {
      tasks: []
    }
  },
  methods: {
    deleteTaskToTaskbox(id) {
      this.deleteTask(id)
      this.$router.push({name:'taskbox'})
    },
    ...mapActions(['deleteTask']),
  }
};
</script>
