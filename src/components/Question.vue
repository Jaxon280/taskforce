<template>
  <v-radio-group @input="updateQuestionAnswer($event.target.value)">
    <div>
      <slot name="question_content">Title</slot>
    </div>
    <v-radio value="true">
      <template v-slot:label>
        <div>はい</div>
      </template>
    </v-radio>
    <v-radio value="false">
      <template v-slot:label>
        <div>いいえ</div>
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script>
export default {
  props: {
    questionAnswer: { type: Object, required:false},
    objectKey: { type: String, required:true }
  },
  data() {
    return {
      question_answer: this.questionAnswer,
      object_key: this.objectKey
    }
  },
  methods: {
    updateQuestionAnswer(objectValue) {
      const newValue = {...this.question_answer, [this.object_key]: objectValue}
      this.$emit('input', newValue)
    }
  }

}
</script>