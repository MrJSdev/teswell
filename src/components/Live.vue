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
      <div class="p10 download-section"><el-button type="primary" >Download</el-button></div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import mapStylesMixin from './mixins/mapStyles.js'
import videojs from 'video.js'
import videojsFlash from 'videojs-flash'
export default {
  name: 'Live',
  mixins: [mapStylesMixin],
  data () {
    return {
      mapCenter: { lat: 25.154412, lng: 55.390568 },
      showCamera: false,
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
      console.log(console.log(this.$pusher))
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
      this.$channel.bind('my-event', (data) => {
        console.log(data)
      })
      let self = this
      this.$refs.mapRef.$mapPromise.then((map) => {
        self.map = map
      })
    },
    onMarkerClick () {
      this.showCamera = true
    },
    setCameraVideo () {
      console.log(videojsFlash, 'its')
      let options = {
        controls: true,
        autoplay: false,
        // poster: require('../assets/img/loading.gif'),
        techOrder: ['flash', 'html5'],
        sources: [{
          src: 'rtmp://13.233.215.80:1935/live/'
        }]
      }
      this.$nextTick(function () {
        let playerId = document.getElementById('camera-player')
        let player = videojs(playerId, options, function onPlayerReady () {
          console.log('its ready to play')
        })
        let loadingDiv = document.getElementsByClassName('vjs-loading-spinner')
        player.on('waiting', function () {
          console.log('Waiting')
          // loadingDiv[0].style.visibility = 'visible'
          // loadingDiv[0].style.display = 'block'
          // loadingDiv[0].style.animation = 'loading-spinner 1s ease infinite'
          console.log(loadingDiv[0].style)
          // playerId.classList.add('loading')
          // console.log(playerId.classList)
        })
        player.on('ready', function () {
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
  height:100%;
}
.alerts-box{
  -webkit-box-shadow: 0 0px 3px 4px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0px 3px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 3px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
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
  text-align: right;
}
.rotate-box .el-button + .el-button {
  margin: 0;
}
</style>
