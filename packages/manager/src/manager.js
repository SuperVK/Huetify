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


    setSpotifyRefreshToken(token) {
        if(token == null) {
            this.spotify.stopPolling()
            this.spotify.refreshtoken = null
            this.spotify.accessToken = {
                token: null,
                expiry: null
            }
            this.spotify.isReady = false;
            
            this.emit('update')
        } else {
            this.spotify.refreshToken = token
            this.spotify.getAccessToken()
            this.spotify.isReady = true;
            this.spotify.startPolling()
            this.emit('update')
        }
    }

    setHueToken(token) {
        if(token == null) {
            this.hue.token = null
            this.hue.isReady = false;
            this.emit('update')
        } else {
            this.hue.token = token
            this.hue.isReady = true
            this.emit('update')
        }
    }

    setHueIP(IP) {
        this.hue.ip = IP
    }

    setBrightness(brightness) {
        this.brightness = brightness
    }
}