export default class Spotify {
    constructor(manager) {
        this.manager = manager
        this.token = null
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