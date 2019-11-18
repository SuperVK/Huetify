import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './BrightnessSlider.css'
import { manager } from '../../..' 

export default class BrightnessSlider extends Component {
    render() {
        return (
            <div className="widget">
                Brightness:<br/>
                {/* <input type="range" min={0} max={254} defaultValue={254} className="slider" id="brightnessSlider" onChange={this.brightnessChange}></input> */}
                <Slider min={0} max={254} defaultValue={254} className="slider" onChange={this.brightnessChange}/>
            </div>
        )
    }
    brightnessChange(value) {
        manager.setBrightness(value)
    }
}
