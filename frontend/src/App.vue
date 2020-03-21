<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>

<style>
  /* #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

  }
  body{
    margin: 0px;
    padding: 0px;
  } */
  .el-button:focus, .el-button:hover {
    background: #2e48a0;
    border-color: #2e48a0;
    color: #FFF;
  }
</style>
