const CLIENT_ID = '6caaf5d0a58e47868553160955e5b8e4'
const CLIENT_SECRET = '66c3c9105c2147fb89a49abe33c7aafd'
const REDIRECT_URL = '/api/spotifycb'
const WORKER_URL = 'https://huetify.supervk.workers.dev'
const PROJECT_URL = 'http://localhost:3000'


/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
    let requestURL = new URL(request.url)
    console.log(requestURL.pathname)
    switch(requestURL.pathname) {
        case '/spotifycb': {
            let resp = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64') //clientID:clientSecret in base64
                },
                body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent('https://' + WORKER_URL + REDIRECT_URL)}`
            }).then((spotiRes) => spotiRes.json())
            .then(body => {
                if(body.error) {
                    console.error(body)
                    return new Response('Bad gateway', {status: 502})
                }
                return new Response(null, {
                    status: 301,
                    headers: {
                        'Set-Cookie': `spotifyRefreshToken=${body.refresh_token}; expires=${new Date(Date.now()+(1000*60*60*24*30)).toUTCString()}`,
                        'Set-Cookie': `spotifyAccessToken=${body.access_token}; maxAge=${body.expires_in*1000}`,
                        'location': PROJECT_URL
                    }
                })
            })
            return resp;
        }
        case '/spotifylogin': {
            let scopes = 'user-read-currently-playing'
            let url = 'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + CLIENT_ID +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent('https://' + WORKER_URL + REDIRECT_URL)
            console.log(url)
            return new Response(null, {
                status: 301,
                headers: {
                    'location': url
                }
            })
        }
        case '/accesstoken': {
            let cookies = request.headers.cookie
            if(cookies == undefined) return new Response(null, {
                status: 401,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            cookies = cookies.split('; ').map(c => c.split('='))
            console.log(cookies)
            if(!code) {
                return new Response(null, {status: 401})
            } else {
                fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64') //clientID:clientSecret in base64
                    },
                    body: `grant_type=refresh_token&refresh_token=${code}`
                }).then((res) => res.json())
                .then(body => {
                    if(body.error) {
                        console.error(body)   
                        return res.sendStatus(500)
                    }
                    res.cookie('spotifyAccessToken', body.access_token, {
                        expires: new Date(Date.now()+body.expires_in*1000)
                    }).sendStatus(200)
                })
            }
            break;
        }
    }
    return new Response('404 Not found', {
        status: 404
    })
}


