import Vue from 'vue'
import Router from 'vue-router'
import Taskbox from './views/Taskbox.vue'
import Tasks from './views/Tasks.vue'
import Account from './views/Account.vue'
import Home from './views/Home.vue'
import TaskboxForm from './views/TaskboxForm.vue';
import TaskQuestion from './views/TaskQuestion.vue';
import Project from './views/Project.vue';
import TaskEditForm from './views/TaskEditForm.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/taskbox',
      name: 'taskbox',
      component: Taskbox
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/taskbox/:task_id?/edit',
      name: 'taskbox_edit',
      component: TaskboxForm
    },
    {
      path: '/taskbox/:task_id/question', 
      name: 'task_question',
      component: TaskQuestion
    },
    {
      path: '/project',
      name: 'project',
      component: Project
    },
    {
      path: '/tasks/:task_id/edit',
      name: 'task_edit',
      component: TaskEditForm
    }
  ]
})
