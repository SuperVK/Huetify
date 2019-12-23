import React, { Component } from 'react'
import { manager } from '../../../'
import { remote } from 'electron'
const redirectUri = `file://callback`;
let win = null

export default class SpotifyConnect extends Component {
    render() {
        let button;
        let loggedIn = manager.spotify.refreshToken !== null
        if(loggedIn) button = <div connected="true" onClick={this.logOut} className="signInButton spotifyLogin">Connected to Spotify</div>
        else button = <div connected="false" onClick={this.openSpotifyLogin.bind(this)} className="signInButton spotifyLogin">Connect to Spotify</div>         
        return button
    }
    logOut() {
        localStorage.removeItem('spotifyRefreshToken')
        manager.setSpotifyRefreshToken(null)
    }
    openSpotifyLogin() {
        this.destroyAuthWin();

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
            this.parseURL(url)
            this.destroyAuthWin();
        });

        win.on('authenticated', () => {
            this.destroyAuthWin();
        });

        win.on('closed', () => {
            win = null;
        });
        
    }

    parseURL(rawUrl) {
        const url = new URL(rawUrl)
        let code = url.searchParams.get('code')
        fetch(`${WORKER_URL}/refreshtoken`, {
            method: 'POST',
            headers: {
                'Authorization': code
            }
        }).then(body => body.text()).then(res => {
            localStorage.setItem('spotifyRefreshToken', res)
            manager.setSpotifyRefreshToken(res)
        })
    }

    destroyAuthWin() {
        if (!win) return;
        win.close();
        win = null;
    }
}


