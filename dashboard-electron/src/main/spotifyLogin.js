const redirectUri = 'file://callback'
const WORKER_URL = 'https://huetify.supervk.workers.dev'
const { session } = require('electron')
const fetch = require('node-fetch')

export default function handleSpotifyLogin(win) {
    const {
        session: {
            webRequest
        }
    } = win.webContents;
  
    const filter = {
        urls: [
            `${redirectUri}/*`
        ]
    };
  
    webRequest.onBeforeRequest(filter, async ({
        url
    }) => {
        parseURL(url, win)
    });
}

function parseURL(url, win) {
    let searchParams = (new URL(url)).searchParams
    let spotifyCode = searchParams.get('code')
    let state = searchParams.get('state')
    fetch(`${WORKER_URL}/refreshtoken`, {
        headers: {
            'Authorization': spotifyCode
        }
    }).then(res => res.text())
    .then(refreshtoken => {
        let newurl = new URL(state)
        newurl.searchParams.set('code', refreshtoken)
        win.loadURL(newurl.href)
    }).catch(e => {
        console.log(e)
    })
}