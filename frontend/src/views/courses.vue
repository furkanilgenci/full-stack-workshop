<script>
import { mapActions, mapState } from 'vuex'

export default {
  async created() {
    await this.fetchCourses()
  },
  computed: {
    ...mapState(['courses']),
  },
  methods: {
    ...mapActions(['fetchCourses', 'attendToCourse']),
  },
}
</script>

<template lang="pug">
div(v-if="courses")
  h4 There are {{ courses.length }} course(s)
  ul
    li.course-card(v-for="course in courses")
      h3 Name: {{ course.name }}
      h4 Price: {{ course.price }}
      h4 Participants:
      ul(v-for="participant in course.participants")
        li
          h5 Name: {{ participant.name }}
      button(@click="attendToCourse(course._id)") Attend
</template>

<style>
.course-card {
  border: 1px solid black;
}
</style>
