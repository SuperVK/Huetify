import React, { Component } from 'react'
import { manager } from '../../../'
import './Player.css'

export default class Player extends Component {
    render() {
        return (
            <div className="player" id="player">
                <div className="playerWidget">
                    <img className="thumbnail" alt="Album Cover" src={manager.currentlyPlaying.imgurl}></img>
                    <div className="details">
                        <div className="songTitle">{manager.currentlyPlaying.name}</div> 
                        <div className="artists">{manager.currentlyPlaying.artists.join(', ')}</div>
                    </div>
                </div>
                <div className="playerProgress" style={{
                        backgroundPosition: 100-manager.currentlyPlaying.progressTime/manager.currentlyPlaying.fullLength*100 + '%'
                }}></div>
            </div>
        )
    }
}
