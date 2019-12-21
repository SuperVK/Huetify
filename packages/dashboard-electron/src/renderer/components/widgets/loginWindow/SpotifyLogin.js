import { manager } from '../../../'
import { remote } from 'electron'

// https://auth0.com/blog/securing-electron-applications-with-openid-connect-and-oauth-2/

const redirectUri = `file://callback`;

let win = null;

export default class spotifyLogin {
    static getAccessToken() {
        fetch(`${window.WORKER_URL}/accesstoken`, {
            headers: {
                'Authorization': window.localStorage.getItem('spotifyRefreshToken')
            }
        }).then(res => {
            if(res.ok) {
                res.text().then(body => {
                    manager.setSpotifyToken(body)
                })
            }
        })
    }


    static openSpotifyLogin() {
        spotifyLogin.destroyAuthWin();

        // Create the browser window.
        win = new remote.BrowserWindow({
            width: 1000,
            height: 600,
        });

        win.loadURL(`${WORKER_URL}/spotifylogin`);

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
            spotifyLogin.parseURL(url)
            spotifyLogin.destroyAuthWin();
        });

        win.on('authenticated', () => {
            destroyAuthWin();
        });

        win.on('closed', () => {
            win = null;
        });
        
    }

    static parseURL(rawUrl) {
        const url = new URL(rawUrl)
        let code = url.searchParams.get('code')
        fetch(`${WORKER_URL}/refreshtoken`, {
            method: 'POST',
            headers: {
                'Authorization': code
            }
        }).then(body => body.text()).then(res => {
            localStorage.setItem('spotifyRefreshToken', res)
            spotifyLogin.getAccessToken()
        })
    }

    static destroyAuthWin() {
        if (!win) return;
        win.close();
        win = null;
    }

}