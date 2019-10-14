<template>
  <div>
    <v-btn @click="$router.push({ name: 'taskbox' })">キャンセル</v-btn>
    <v-btn color="info" @click='submit'>保存</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    task: { type: Object, required:false}
  },
  methods: {
    submit() {
      if (this.instant === 'yes') {
        this.task.category = 'instance_task'
        this.$router.push({name:'instant'})
      } else if (this.importance === 'no') {
        this.task.category = 'someday_task'
        this.$router.push({name:'taskbox'})
      } else if (this.one_action === 'no') {
        this.$router.push({name:'project'})
      } else if (this.postpone === 'yes') {
        this.task.category = 'scheduled_task'
        this.$router.push({name:'taskbox'})
      } else {
        this.task.category = 'memo_task'
        this.$router.push({name:'taskbox'})
      }
      this.updateTask({id: this.$route.params.task_id, task: this.task})
      /*
      this.addAddress(this.address)
      this.$router.push({name:'address'})
      this.address = {}
      */
    },
    ...mapActions(['updateTask'])
  } 
}
</script>
