const redirectUri = 'file://callback'
const WORKER_URL = 'https://huetify.supervk.workers.dev'
const log = require('electron-log');
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
    console.log('wakka zooi')
    webRequest.onBeforeRequest(filter, async (details, cb) => {
        let searchParams = (new URL(details.url)).searchParams
        let spotifyCode = searchParams.get('code')
        let state = searchParams.get('state')
        fetch(`${WORKER_URL}/refreshtoken`, {
            headers: {
                'Authorization': spotifyCode
            }
        }).then(res => res.text())
        .then(refreshtoken => {
            console.log(state)
            let newurl = new URL(state)
            newurl.searchParams.set('code', refreshtoken)
            cb({
                redirectURL: newurl.href
            })
        }).catch(e => {
            console.log(e)
        })
    });
}
