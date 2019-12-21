import { EventEmitter } from 'events';
import Song from './song';
import Hue from './hue';
import Spotify from './spotify';

export default class Manager extends EventEmitter {
    constructor() {
        super()
        this.song = new Song()
        this.hue = new Hue(this)
        this.spotify = new Spotify(this)
        this.isPaused = true
        this.brightness = 254
        this.isLaunched = false
        console.log('nuuuuu')
    }

    start() {
        this.isPaused = false
        this.hue.turnOn()
    }

    stop() {
        this.isPaused = true
        this.hue.turnOff()
    }

    switchLight(id) {
        this.hue.selectedLight = id
    }

    setSpotifyToken(token) {
        console.log('im sorry what')
        console.log(token)
        if(token == null) {
            console.log(token)
            this.spotify.token = null
            this.spotify.isReady = false;
            this.spotify.stopPolling()
            this.emit('update')
        } else {
            this.spotify.token = token
            this.spotify.isReady = true;
            this.spotify.startPolling()
            this.emit('update')
        }
    }

    setHueToken(token) {
        this.hue.token = token
        this.hue.isReady = true
        this.emit('update')
    }

    setHueIP(IP) {
        this.hue.ip = IP
    }

    setBrightness(brightness) {
        this.brightness = brightness
    }
}