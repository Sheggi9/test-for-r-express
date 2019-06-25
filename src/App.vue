<template>
  <div id="app">
    <Table/>
  </div>
</template>

<script>
import Table from './components/table'

export default {
  name: 'App',
  components: {
    Table
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
