<template lang="pug">
#app
  #nav
    router-link(to="/") Home
    span &nbsp;|&nbsp;
    router-link(to="/about") About
    span &nbsp;|&nbsp;
    router-link(to="/courses") Courses
  router-view
</template>

<style lang="scss">
@import '@/assets/theme.scss';
</style>
