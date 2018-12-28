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
  @import "./assets/styles/video-js.min.css";
  @import "https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700"
* {
  box-sizing: border-box;
}
body{
  padding:0;
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
.el-dialog__wrapper.camera-dialog .el-dialog__body{
  padding:0;
}
.camera-dialog .el-dialog__header{
  padding:10px;
  border-radius: 3px;
}
#app {

}
  .p10{
    padding: 10px;
  }
</style>
