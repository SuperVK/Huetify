import React, { Component } from 'react'
import './BaseWindow.css'

export default class BaseWindow extends Component {
    render() {
        return (
            <div>
                {this.props.subWindow}
                <footer>© 2019 Victor Klomp | Built using <a href="https://developer.spotify.com/">Spotify API</a>, <a href="https://developers.meethue.com/">Hue API</a> and <a href="https://reactjs.org/">ReactJS</a></footer>
            </div>
        )
    }
}
