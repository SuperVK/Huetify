import React, { Component } from 'react'
import { remote } from 'electron'
import * as path from 'path'
import './TitleBar.css'

export default class TitleBar extends Component {
    render() {
        return (
            <div className="titlebar" id="titleBar">
                <img className="logo" src={path.join(__static, 'icon-512.png')}/>
                <div className="title">Huetify</div>
                <div className="button" id="titleBarClose" onClick={this.close}><svg width="16" height="16" viewBox="0 0 12 12"><polygon fill="#ffffff" fillRule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon></svg></div>
                <div className="button" id="titleBarMinimize" onClick={this.minimize}><svg width="16" height="16" viewBox="0 0 12 12"><rect fill="#ffffff" width="10" height="1" x="1" y="6"></rect></svg></div>
            </div>
        )
    }
    minimize() {
        remote.getCurrentWindow().minimize()
    }
    close() {
        remote.getCurrentWindow().close()
    }
}
