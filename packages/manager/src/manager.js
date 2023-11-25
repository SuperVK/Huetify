import { EventEmitter } from 'events';
import Song from './song';
import Hue from './lights';
import Zengge from './lights';
import Spotify from './spotify';

export default class Manager extends EventEmitter {
    constructor() {
        super();
        this.song = new Song();
        this.hue = new Hue(this)
        this.zengge = new Zengge(this);
        this.spotify = new Spotify(this);
        this.isPaused = true;
        this.brightness = 254;
    }

    start() {
        this.isPaused = false;
        this.zengge.turnOn();
        this.hue.turnOn();
    }

    stop() {
        this.isPaused = true;
        this.zengge.turnOff();
        this.hue.turnOff();
    }

    switchLight(id) {
        this.hue.selectedLight = id;
    }

    setSpotifyRefreshToken(token) {
        if (token == null) {
            this.spotify.stopPolling();
            this.spotify.refreshToken = null;
            this.spotify.accessToken = {
                token: null,
                expiry: null,
            };
            this.spotify.isReady = false;
            this.stop();
            this.emit('update');
        } else {
            this.spotify.refreshToken = token;
            this.spotify.getAccessToken();
            this.spotify.isReady = true;
            this.spotify.startPolling();
            this.emit('update');
        }
    }

    setHueToken(token) {
        if (token == null) {
            this.hue.token = null;
            this.hue.isReady = false;
            this.stop();
            this.emit('update');
        } else {
            this.hue.token = token;
            this.hue.isReady = true;
            this.emit('update');
        }
    }

    setLightIdentifier(identifier) {
        this.zengge.identifier = identifier;
        this.hue.ip = identifier;
    }

    setBrightness(brightness) {
        this.brightness = brightness;
    }
}
