import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: {
      // Will be filled when logged in, after authentication is implemented
      _id: '605f1f2cf126e00141cafc0d',
      // ...
    },
    courses: null,
  },
  mutations: {
    SET_COURSES(state, courses) {
      state.courses = courses
    },
  },
  actions: {
    async fetchUsers() {
      return (await axios.get('/api/users')).data
    },
    async attendToCourse({ state, dispatch }, courseId) {
      await axios.post(`/api/users/${state.user._id}/attended-courses`, {
        _id: courseId,
      })

      await dispatch('fetchCourses')
    },
    async fetchCourses({ commit }) {
      const courses = (await axios.get('/api/courses')).data

      commit('SET_COURSES', courses)
    },
  },
  modules: {},
})
