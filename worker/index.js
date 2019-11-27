const CLIENT_ID = '6caaf5d0a58e47868553160955e5b8e4'
const CLIENT_SECRET = '66c3c9105c2147fb89a49abe33c7aafd'
const REDIRECT_URL = '/spotifycb'
const WORKER_URL = 'https://huetifydev.supervk.workers.dev'
const PROJECT_URL = 'http://localhost:3000'

const refreshtokensMap = new Map()

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
    let requestURL = new URL(request.url)
    switch(requestURL.pathname) {
        case '/spotifycb': {
            let code = requestURL.searchParams.get('code')
            console.log(code)
            let resp = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`) //clientID:clientSecret in base64
                },
                body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(WORKER_URL + REDIRECT_URL)}`
            }).then((spotiRes) => spotiRes.json())
            .then(body => {
                if(body.error) {
                    console.error(body)
                    return new Response('Bad gateway', {status: 502})
                }

                let resheaders = new Headers()
                // resheaders.append(`Set-Cookie`, `spotifyAccessToken=${body.access_token}; maxAge=${body.expires_in*1000}`)
                // resheaders.append(`Set-Cookie`, `spotifyRefreshToken=${body.refresh_token}; maxAge=${1000*60*60*24*30}`)
                let redirectURL = new URL(PROJECT_URL)
                redirectURL.searchParams.append('code', body.refresh_token)
                resheaders.append(`location`, redirectURL)
                return new Response('something', {
                    status: 302,
                    headers: resheaders
                })
            }).catch(e => {
                return new Response(e, {status: 502})
            })
            return resp;
        }
        
        case '/spotifylogin': {
            let scopes = 'user-read-currently-playing'
            let url = 'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + CLIENT_ID +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(PROJECT_URL + REDIRECT_URL)
            return new Response(null, {
                status: 302,
                headers: {
                    'location': url
                }
            })
        }
        case '/refreshtoken': {
            let code = request.headers.get('Authorization')
            if(request.method == 'OPTIONS') {
                return new Response(null, {
                    status: 204,
                    headers: {
                        'Access-Control-Allow-Origin': PROJECT_URL,
                        'Access-Control-Allow-Methods': 'GET',
                        'Access-Control-Allow-Headers': 'Authorization',
                        'Vary': 'Origin'
                    }
                })
            }
            let resp = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`) //clientID:clientSecret in base64
                },
                body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(PROJECT_URL + REDIRECT_URL)}`
            }).then((spotiRes) => spotiRes.json())
            .then(body => {
                if(body.error) {
                    return new Response(JSON.stringify(body), {
                        status: 502,
                        headers: {
                            'Access-Control-Allow-Origin': PROJECT_URL,
                            'Vary': 'Origin'
                        }
                    })
                }
                return new Response(body.refresh_token, {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': PROJECT_URL,
                        'Vary': 'Origin'
                    }
                })
            }).catch(e => {
                console.log(e)
                return new Response(e, {
                    status: 502,
                    headers: {
                        'Access-Control-Allow-Origin': PROJECT_URL,
                        'Vary': 'Origin'
                    }
                })
            })
            return resp;
        }
        case '/accesstoken': {
            let authCode = request.headers.get('Authorization')
            if(request.method == 'OPTIONS') {
                return new Response(null, {
                    status: 204,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
            }
            if(!authCode) {
                return new Response('woop', {
                    status: 401,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
            } else {
                let resp = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`) //clientID:clientSecret in base64
                    },
                    body: `grant_type=refresh_token&refresh_token=${authCode}`
                }).then((res) => res.json())
                .then(body => {
                    if(body.error) {
                        console.error(body)   
                        return new Response('wowzers', { 
                            status: 500,
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                            }
                        })
                    }
                    return new Response(body.access_token, {
                        status: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                }).catch(e => {
                    return new Response(e, { 
                        status: 500,
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                })
                return resp
            }
            break;
        }
    }
    return new Response('404 Not found', {
        status: 404,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
}


