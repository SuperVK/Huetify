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
    }
    launch() {
        this.spotifySyncInterval = setInterval(() => {
            this.updateSong()
            this.emit('update')
        }, 1000)
    }
    start() {
        this.isPaused = false
        this.hue.setLampState({
            on: true,
            transitiontime: 0
        })
    }
    stop() {
        this.isPaused = true
        this.hue.setLampState({
            on: false,
            transitiontime: 0
        })
    }
    switchLight(id) {
        this.hue.selectedLight = id
        
    }
    setSpotifyToken(token) {
        this.spotify.token = token
        this.spotify.isReady = true;
        this.launch()
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
    updateSong() {
        return new Promise((resolve, reject) => {
            let requestSend = new Date()-0  
            this.spotify.request('me/player/currently-playing')
                .then(currentlyPlaying => {
                    if(currentlyPlaying.item === null) return
                    if(this.currentlyPlaying.name !== currentlyPlaying.item.name) {
                        clearInterval(this.currentlyPlaying.timingInterval)
                        this.currentlyPlaying = new Song(currentlyPlaying.item,
                            currentlyPlaying.progress_ms, {
                                requestReceived: new Date()-0,
                                requestSend: requestSend
                            },
                            this
                        )
                        if(!this.isPaused) {
                            this.hue.setLampState({
                                on: true,
                                transitiontime: 0
                            })
                        }
                    } else {
                        this.currentlyPlaying.progressTime = currentlyPlaying.progress_ms
                        this.currentlyPlaying.originalProgressTime = currentlyPlaying.progress_ms
                        this.currentlyPlaying.timing = {
                            requestSend: requestSend,
                            requestReceived: new Date()-0
                        }
                    }
                    if(!currentlyPlaying.is_playing && this.currentlyPlaying.isPlaying) {
                        clearInterval(this.currentlyPlaying.timingInterval)
                        if(!this.isPaused) {
                            this.hue.setLampState({
                                on: false,
                                transitiontime: 0
                            })
                        }
                        this.currentlyPlaying.isPlaying = false
                        return
                    }
                    if(!this.currentlyPlaying.isPlaying && currentlyPlaying.is_playing) {
                        this.currentlyPlaying.startInterval()
                        if(!this.isPaused) {
                            this.hue.setLampState({
                                on: true,
                                transitiontime: 0
                            })
                        }
                        this.currentlyPlaying.isPlaying = true
                    }
                    
                    resolve()
                })
        })
        
    }
    
    
}