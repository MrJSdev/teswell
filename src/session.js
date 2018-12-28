import Vue from 'vue'
import Pusher from 'pusher-js'
let self = Vue.prototype
Object.defineProperty(self, '$pusher', {
  get () {
    if (self.pusher !== undefined) return self.pusher
    console.log('INITIATING PUSHER COMMUNICATION')
    if (!Vue.PUSHER_KEY) Vue.PUSHER_KEY = process.env.VUE_APP_PUSHER_KEY
    return (self.pusher = new Pusher(Vue.PUSHER_KEY, { cluster: 'ap2', encrypted: true }))
  }
})

Object.defineProperty(self, '$channel', {
  get () {
    if (self.channel !== undefined) return self.channel
    console.log('INITIATING CHANNEL')
    return (self.channel = self.$pusher.subscribe('my-channel'))
  }
})
const Session = {}
export default Session
