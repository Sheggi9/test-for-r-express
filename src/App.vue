<template>
  <div id="app">
    <t-list/>
  </div>
</template>

<script>
import tList from './components/t-list'

export default {
  name: 'App',
  components: {
    tList
  }
}
</script>

<style lang="scss">
  #app{
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
