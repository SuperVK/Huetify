const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
require('dotenv').config()

router.get('/spotifylogin', (req, res) => {
    let clientID = process.env.CLIENT_ID
    let redirectURL = process.env.REDIRECT_URL
    let scopes = 'user-read-currently-playing'
    let url = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + clientID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirectURL)
    res.redirect(url);
})

router.get('/spotifycb', (req, res) => {
    let code = req.query.code
    if(code == undefined) return res.sendStatus(400)
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64') //clientID:clientSecret in base64
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URL)}`
    }).then((spotiRes) => spotiRes.json())
    .then(body => {
        if(body.error) {
            console.error(body)
            return res.sendStatus(502)
        }
        res.cookie('spotifyRefreshToken', body.refresh_token, {
            httpOnly: true,
            expires: new Date(Date.now()+(1000*60*60*24*30)) // a month from now
        })
        res.cookie('spotifyAccessToken', body.access_token, {
            maxAge: body.expires_in*1000
        })
        res.redirect('/')
    })
    
})

router.get('/accesstoken', (req, res) => {
    let code = req.cookies.spotifyRefreshToken
    if(!code) {
        res.sendStatus(401)
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
})

module.exports = router
