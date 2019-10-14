<template>
  <v-container>
    <v-card>
      <v-card-title>タスク一覧</v-card-title>
      <v-list>
        <v-list-group
            v-for="category in categories"
            :key="category.title"
            v-model="category.active"
            :prepend-icon="category.icon"
            no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="category.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="task in tasks[category.name]"
            :key="task.name"
            two-line
            >
            <v-list-item-action>
              <v-checkbox v-model="task.done"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="task.name"></v-list-item-title>
              <v-list-item-subtitle v-text="task.description"></v-list-item-subtitle>
              <v-list-item-subtitle class="text--primary" v-text="task.dueDate"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="$router.push({name: 'task_edit',params:{task_id: task.id}})">
                <v-icon color="grey lighten-1">edit</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn icon @click="deleteTaskToTaskbox(task.id)">
                <v-icon color="grey lighten-1">delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
// import {mapGetters} from 'vuex'; 
import {mapActions} from 'vuex';

export default {
  created() {
    this.tasks = this.$store.getters.groupTasksByCategory
  },
  data () {
    return {
      categories: [
        {
          name: 'scheduled_task',
          icon: 'date_range',
          title: '期限ありタスク'
        },
        {
          name: 'memo_task',
          icon: 'report_problem',
          title: '未分類タスク'
        },
        {
          name: 'instance_task',
          icon: 'timer',
          title: 'すぐ実行するタスク'
        },
        {
          name: 'someday_task',
          icon: 'beach_access',
          title: 'いつかやるタスク'
        },
      ],
      tasks: {}
    }
  },
  methods: {
    deleteTaskToTaskbox(id) {
      this.deleteTask(id)
      this.$router.push({name:'tasks'})
    },
    ...mapActions(['deleteTask']),
  }
}
</script>