import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import _ from 'lodash';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    tasks:[]
  },
  mutations: {
    setLoginUser(state,user) {
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
    },
    addTask(state,{id,task}) {
      task.category = ''
      task.id = id
      state.tasks.push(task)
    },
    updateTask(state,{id,task}) {
      const index = state.tasks.findIndex(task => task.id === id)

      state.tasks[index] = task
    },
    deleteTask(state,id) {
      const index = state.tasks.findIndex(task => task.id === id)

      state.tasks.splice(index,1)
    }
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser',user)
    },
    fetchTasks ({getters,commit}) {
      firebase.firestore().collection(`users/${getters.uid}/tasks`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addTask',{id:doc.id, task: doc.data()}))
      })
    },
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    logout() {
      firebase.auth().signOut()
    },
    addTask({getters, commit},task) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/tasks`).add(task).then(doc => {
          commit('addTask',{ id: doc.id, task})
        })
      }
    },
    updateTask({getters,commit},{task,id}) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/tasks`).doc(id).update(task).then(() => {
          commit('updateTask',{ id, task})
        })
      }
    },
    deleteTask({getters,commit},id) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/tasks`).doc(id).delete().then(() => {
          commit('deleteTask',{ id })
        })
      }
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoUrl: state => state.login_user ? state.login_user.photoUrl : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getTaskById: state => id => state.tasks.find(task => task.id === id),
    groupTasksByCategory: state => _.groupBy(state.tasks,'category')
  }
})
