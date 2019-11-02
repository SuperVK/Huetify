export default class Spotify {
    constructor(manager) {
        this.manager = manager
        this.token = null
    }
    async getAccessToken() {
        let body = await fetch(`/api/accesstoken`) //this sets the cookie spotifyAccessToken
        if(body.status === 401) return 'NO_REFRESH_TOKEN'
            
        let cookies = document.cookie
        if(cookies === '') return await this.getAccessToken()
        let spotifyAccessToken = cookies.find(c => c.trim().indexOf('spotifyAccessToken') === 0)
        return spotifyAccessToken.split('=')[1]
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