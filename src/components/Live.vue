<template>
<div>
  <div id="liveMap">
    <GmapMap
      :center="mapCenter"
      :zoom="12"
      ref="mapRef"
      :options="{ styles: mapStyles }"
      style="width: 100%; height:100vh;"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="onMarkerClick"
      />
    </GmapMap>

      <el-col :span="12" :offset="6" class="alerts-box">
        <div class="collapse-table">
          <el-button type="text" @click="alertBox = !alertBox">
            <transition name="slide-down">
              <i class="el-icon el-icon-arrow-down" v-show="alertBox"></i>
            </transition>
            <transition name="fade-it">
              <i class="el-icon el-icon-arrow-up" v-show="!alertBox"></i>
            </transition>
          </el-button>
        </div>
        <transition name="slide-down">
          <div class="alerts-table" v-show="alertBox">
            <el-table
              :data="alerts"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="Date"
                width="180">
              </el-table-column>
              <el-table-column
                prop="location"
                label="Name"
                width="180">
              </el-table-column>
              <el-table-column
                prop="type"
                label="Type">
              </el-table-column>
            </el-table>
          </div>
        </transition>
      </el-col>
    <el-dialog
      title="Camera"
      class="camera-dialog"
      :modal-append-to-body="true"
      :visible.sync="showCamera"
      @open="setCameraVideo"
      width="50%"
    >
      <div class="right-side-cameras">
        <div class="camera-box">
          <div class="rotate-camera">
            <div class="rotate-box">
              <el-button type="text" class="rotate-btn up" @click="onCamRotate('Up')">
                <i class="el-icon el-icon-caret-top"></i>
              </el-button>
              <el-button type="text" class="rotate-btn down" @click="onCamRotate('Down')">
                <i class="el-icon el-icon-caret-bottom"></i>
              </el-button>
              <el-button type="text" class="rotate-btn left" @click="onCamRotate('Left')">
                <i class="el-icon el-icon-caret-left"></i>
              </el-button>
              <el-button type="text" class="rotate-btn right" @click="onCamRotate('Right')">
                <i class="el-icon el-icon-caret-right"></i>
              </el-button>
            </div>
          </div>
          <video class="vjs-matrix video-js vjs-default-skin my-video" id="camera-player"
                 style="width:100%; height:498px;">
          </video>
        </div>
      </div>
      <div class="p10 download-section"><el-button type="primary" class="download-btn">Download</el-button></div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import mapStylesMixin from './mixins/mapStyles.js'
import videojs from 'video.js'
require('videojs-flash')
export default {
  name: 'Live',
  mixins: [mapStylesMixin],
  data () {
    return {
      mapCenter: { lat: 25.154412, lng: 55.390568 },
      showCamera: false,
      player: null,
      alertBox: false,
      map: {},
      alerts: [
        {
          date: '27-12-2018',
          location: { lat: 25.154000, lng: 55.390000 },
          type: 'Hood Open'
        },
        {
          date: '27-12-2018',
          location: { lat: 25.154000, lng: 55.390000 },
          type: 'Hood Open'
        },
        {
          date: '27-12-2018',
          location: { lat: 25.154000, lng: 55.390000 },
          type: 'Hood Open'
        },
        {
          date: '27-12-2018',
          location: { lat: 25.154000, lng: 55.390000 },
          type: 'Hood Open'
        },
        {
          date: '27-12-2018',
          location: { lat: 25.154000, lng: 55.390000 },
          type: 'Hood Open'
        }
      ],
      markers: [
        {
          position: { lat: 25.154412, lng: 55.390568 }
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.loadMap()
      this.openNotification()
    })
  },
  methods: {
    openNotification () {
      this.$notify({
        title: 'Hood Open',
        type: 'warning',
        message: 'Driver forget to close the hood',
        duration: 0
      })
    },
    loadMap () {
      let self = this
      this.$refs.mapRef.$mapPromise.then((map) => {
        self.map = map
      })
    },
    onMarkerClick () {
      this.showCamera = true
    },
    setCameraVideo () {
      let options = {
        controls: true,
        autoplay: false,
        techOrder: ['flash', 'html5'],
        // poster: require('../assets/img/loading.gif'),
        sources: [{
          src: 'rtmp://13.233.215.80:1935/live/'
        }]
      }
      this.$nextTick(function () {
        let playerId = document.getElementById('camera-player')
        if (this.player !== null) return
        this.player = videojs(playerId, options, function onPlayerReady () {
          console.log('its ready to play')
        })
        let loadingDiv = document.getElementsByClassName('vjs-loading-spinner')
        this.player.on('waiting', function () {
        })
        this.player.on('ready', function () {
          console.log('ready')
          loadingDiv[0].style.visibility = 'hidden'
          loadingDiv[0].style.display = 'none'
          // playerId.classList.add('loading')
          // console.log(playerId.classList)
        })
      })
    }
  }
}
</script>

<style scoped>
#liveMap{
  width: 100%;
  position: relative;
  overflow: hidden;
  height:100%;
}
.alerts-box{
  position: absolute;
  bottom: 0;
}
.alerts-box .el-table{
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0 0px 5px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0px 5px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 5px 1px rgba(0, 0, 0, 0.1);
}
.my-video {
  position: relative;
}

.vjx-custom-waiting .vjx-loading-spinner {
  display: block;
}

.video-js.vjx-custom-waiting .vjx-loading-spinner:before,
.video-js.vjx-custom-waiting .vjx-loading-spinner:after {
  /* I just copied the same animation as in the default css file */
  -webkit-animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, vjs-spinner-fade 1.1s linear infinite;
  animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, vjs-spinner-fade 1.1s linear infinite;
}

@keyframes loading-spinner {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}

.rotate-camera {
  position: absolute;
  right: 10px;
  top: 0px;
  z-index: 99;
}

.rotate-camera .up, .rotate-camera .down, .rotate-camera .left, .rotate-camera .right {
  position: absolute;
  font-size: 16px;
  border: none;
  color: rgba(255, 255, 255, 0.6);
}

.rotate-camera .up {
  top: -15px;
  left: 16px;
}

.rotate-camera .down {
  top: 15px;
  left: 16px;
}

.rotate-camera .left {
  top: 0px;
  left: 0;
}

.rotate-camera .right {
  top: 0px;
  right: 0;
}

.rotate-box {
  position: absolute;
  width: 40px;
  padding: 5px;
  top: 50px;
  /* background-color:rgba(255, 255, 255, 0.6); */
  border-radius: 50%;
  margin-top: 10px;
  right:10px;
  height: 40px;
}
.download-section{
  padding: 0;
  margin-top: 5px;
  text-align: right;
}
.rotate-box .el-button + .el-button {
  margin: 0;
}
  .download-btn{
    padding:10px 20px;
    background-color: #f5c93c;
    border-color:#f5c93c;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .collapse-table{
    text-align: center;
  }
.collapse-table .el-icon{
  font-size: 24px;
  padding: 4px;
  position: absolute;
  left: 50%;
  top: -10px;
  margin-left: -16px;
  background-color: #fff;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  -webkit-box-shadow: 0 0px 5px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0px 5px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 5px 1px rgba(0, 0, 0, 0.1);
}

.slide-down-enter-active {
  transition: all 1s ease-in-out;
}
.slide-down-leave-active {
  transition: all 1s ease-in-out;
}
.slide-down-enter, .slide-down-leave-to {
  transform: translateY(300px);
  opacity: 0;
}
.fade-it-enter-active {
  transition: all 0s ease-in-out;
  opacity: 0;
}
.fade-it-leave-active {
  transition: all 0s ease-in-out;
  opacity: 0;
}
.fade-it-enter, .fade-it-leave-to{
  opacity: 0;
  transform: translateY(-300px);
}
</style>
