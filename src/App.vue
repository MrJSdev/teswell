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
  .el-dialog__wrapper.camera-dialog .el-dialog{
    min-width: 600px;
  }
.el-dialog__wrapper.camera-dialog .el-dialog__body{
  padding:5px;
}
.camera-dialog .el-dialog__header{
  padding:8px;
  background-color: #f4f4f4;
  border-bottom: solid thin rgba(0, 0, 0, 0.07);
  text-transform: uppercase;
  border-radius: 3px;
}
  .camera-dialog  .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
  }
#app {

}
  .p10{
    padding: 10px;
  }
  .video-js .vjs-big-play-button {
    font-size: 1.7em;
    top: 45%;
    left: 50%;
    margin-left: -15px;
  }
</style>
