const CLIENT_ID = '6caaf5d0a58e47868553160955e5b8e4'
const REDIRECT_URL = '/api/spotifycb'



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
        case '/spotifylogin': {
            let scopes = 'user-read-currently-playing'
            let url = 'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + CLIENT_ID +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent('https://' + requestURL.host + REDIRECT_URL)
            console.log(url)
            return Response.redirect(url, 301)
        }
    }
    return new Response('404 Not found', {
        status: 404
    })
}


