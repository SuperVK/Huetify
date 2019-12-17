export default class Spotify {
    constructor(manager) {
        this.manager = manager
        this.token = null
        this.isReady = false;
        this.pollingTime = 1000
    }

    startPolling() {
        this.pollingInterval = setInterval(() => {
            this.pollCurrentlyPlaying()
            this.manager.emit('update')
        }, this.pollingTime)
    }

    pollCurrentlyPlaying() {
        let requestSend = new Date()-0
        this.request('me/player/currently-playing')
            .then(newCurrentlyPlaying => {
                if(newCurrentlyPlaying.item === null) return


                if(this.manager.song.name !== newCurrentlyPlaying.item.name) this.updateSong(newCurrentlyPlaying, requestSend)
                else this.updateTiming(newCurrentlyPlaying, requestSend)

                if(!newCurrentlyPlaying.is_playing && this.manager.song.isPlaying) this.songPause()            
                if(!this.currentlyPlaying.isPlaying && currentlyPlaying.is_playing) this.songStart()
            })
    }

    songPause() {
        clearInterval(this.manager.song.timingInterval)
        if(!this.manager.isPaused) this.manager.hue.turnOff()
        this.manager.song.isPlaying = false
    }

    songStart() {
        this.manager.song.startInterval()
        if(!this.manager.isPaused) this.manager.hue.turnOn()
        this.manager.song.isPlaying = true
    }

    updateSong(newCurrentlyPlaying, requestSend) {
        clearInterval(this.manager.currentlyPlaying.timingInterval)

        this.manager.song = new Song(
            newCurrentlyPlaying.item,
            newCurrentlyPlaying.progress_ms, 
            {
                requestReceived: new Date()-0,
                requestSend: requestSend
            },
            this
        )
    }

    updateTiming(newCurrentlyPlaying, requestSend) {
        this.manager.song.progressTime = newCurrentlyPlaying.progress_ms
        this.manager.song.originalProgressTime = newCurrentlyPlaying.progress_ms
        this.manager.song.timing = {
            requestSend: requestSend,
            requestReceived: new Date()-0
        }
    }

    async getAccessToken(workerURL) {
        let res = await fetch(`${workerURL}/accesstoken`) //this sets the cookie spotifyAccessToken, no it doesn't lol
        if(res.status === 401) return 'NO_REFRESH_TOKEN'
            
        return await res.text()
    }

    async request(endpoint, method, body) {
        let res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
            method: method,
            headers: {
                Authorization: `Bearer ${this.token}`
            },
            body: body
        })
        if(res.status == 204) return {item: null}
        return res.json()
    }
}