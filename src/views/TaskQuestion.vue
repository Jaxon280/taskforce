<template>
  <v-container>
    <v-card>
      <v-card-title>{{ task.name }} を分類する</v-card-title>
      <v-text-field v-model="task.description" label="タスクについて追加のメモ（20字以内）"></v-text-field>
      <template>
        <question :question-answer='question_answer' :object-key='"importance"'>
          <div slot="question_content">そのタスクは重要ですか？</div>
        </question>
      </template>

      <template v-if="question_answer.importance === 'true'">
        <question :question-answer='question_answer' :object-key='"one_action"'>
          <div slot="question_content">1アクションで終わりますか？</div>
        </question>

        <template v-if="one_action === 'true'">
          <question :question-answer='question_answer' :object-key='"instant"'>
            <div slot="question_content">2分以内にやれるタスクですか？</div>
          </question>
          <template v-if="question_answer.instant === 'true'">
            <submit :task = 'task'></submit>
          </template>
          <template v-else>
            <question :question-answer='question_answer' :object-key='"scheduled"'>
              <div slot="question_content">そのタスクは期限が決まってますか？</div>
            </question>
            <template v-if="question_answer.scheduled === 'true'">

            </template>
            <template v-else>

            </template>
          </template>
        </template>
        <template v-else>
          <div>
            <v-btn @click="$router.push({ name: 'taskbox' })">キャンセル</v-btn>
            <v-btn color="info" @click='submit'>保存</v-btn>
          </div>
        </template>
      </template>

      <template v-else-if="question_answer.importance === 'false'">
        <question :question-answer='question_answer' :object-key='"instant"'>
          <div slot="question_content">2分以内にやれるタスクですか？</div>
        </question>
        <template v-if="question_answer.instant === 'true'">

        </template>
        <template v-else>
          
        </template>
      </template>

      <!--
      <template>
        <question v-if="question_answer.importance === 'true'" :question-answer='question_answer' :object-key='"one_action"'>
          <div slot="question_content">1アクションで終わりますか？</div>
        </question>
        <question v-else-if="question_answer.importance === 'false'" :question-answer='question_answer' :object-key='"instant"'>
          <div slot="question_content">2分以内にやれるタスクですか？</div>
        </question>
      </template>

      <template v-if="question_answer.importance === 'true'">
        <question v-if="question_answer.one_action === 'true'" :question-answer='question_answer' :object-key='"instant"'>
          <div slot="question_content">2分以内にやれるタスクですか？</div>
        </question>
        <div v-else>
          <v-btn @click="$router.push({ name: 'taskbox' })">キャンセル</v-btn>
          <v-btn color="info" @click='submit'>保存</v-btn>
        </div> 
      </template>
      <div v-else-if="question_answer.importance === 'false' && question_answer.">
        <v-btn @click="$router.push({ name: 'taskbox' })">キャンセル</v-btn>
        <v-btn color="info" @click='submit'>保存</v-btn>
      </div>

      <template v-if="importance === 'yes' && one_action === 'no'">
        <div v-if="instant === 'yes'">
          hoge
        </div>
        <v-radio-group v-else-if="instant === 'no'" v-model="postpone">
          <div>
            期限が決まってるタスクですか？
          </div>
          <v-radio value="yes">
            <template v-slot:label>
              <div>はい</div>
            </template>
          </v-radio>
          <v-radio value="no">
            <template v-slot:label>
              <div>いいえ</div>
            </template>
          </v-radio>
        </v-radio-group>
      </template>
      <template v-if="postpone === 'yes'">
        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        
      </template>
      <div v-else-if="postpone === 'no'">
        <v-btn @click="$router.push({ name: 'taskbox' })">キャンセル</v-btn>
        <v-btn color="info" @click='submit'>保存</v-btn>
      </div>
      -->
    </v-card>
  </v-container>
</template>

<script>
import Question from '@/components/Question';
import Submit from '@/components/Submit';

export default {
  components: {
    'question': Question,
    'submit': Submit
  },
  created() {
    const task = this.$store.getters.getTaskById(this.$route.params.task_id)

    if (task) {
      this.task = task
    } else {
      this.$router.push({name: 'taskbox'})
    }
  },
  data() {
    return{
      task: {},
      detail: '',
      question_answer: {
        'importance':null,
        'one_action':null,
        'instant':null,
        'scheduled':null
      }
    }
  }
}


</script>