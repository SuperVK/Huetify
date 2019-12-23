import React, { Component } from 'react'
import { manager } from '../../../'
import './Player.css'

export default class Player extends Component {
    render() {
        return (
            <div className="player" id="player">
                <div className="playerWidget">
                    <img className="thumbnail" alt="Album Cover" src={manager.song.imgurl}></img>
                    <div className="details">
                        <div className="songTitle">{manager.song.name}</div> 
                        <div className="artists">{manager.song.artists.join(', ')}</div>
                    </div>
                </div>
                <div className="playerProgress" style={{
                        backgroundPosition: 100-manager.song.progressTime/manager.song.fullLength*100 + '%'
                }}></div>
            </div>
        )
    }
}
