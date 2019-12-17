import { EventEmitter } from 'events';
import Song from './song';
import Hue from './hue';
import Spotify from './spotify';

export default class Manager extends EventEmitter {
    constructor() {
        super()
        this.currentlyPlaying = new Song()
        this.hue = new Hue(this)
        this.spotify = new Spotify(this)
        this.isPaused = true
        this.brightness = 254
        this.isLaunched = false
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
        this.spotify.token = token
        this.spotify.isReady = true;
        this.spotify.startPolling()
        this.emit('update')
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