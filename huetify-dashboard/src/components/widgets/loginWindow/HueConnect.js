import React, { Component } from 'react'
import { manager } from '../../../'
import Cookies from 'js-cookie'

export default class HueConnect extends Component {
    bridges
    constructor(props) {
        super(props)
        this.state = {
            action: 'loading'
        }
        this.bridges = []
    }
    render() {
        
        let button = <div className="signInButton hueLogin">woop</div>
        let loggedIn = manager.hue.token
        if(loggedIn) button = <div connected="true" className="signInButton hueLogin">Connected to Hue</div>
        else {
            if(this.state.action === 'loading') this.loadBridges()
            if(this.state.action === 'loading') button = <div connected="false" className="signInButton hueLogin">Searching hue bridges...</div>
            else if(this.state.action === 'choosing') {
                
                button = 
                <div className="signInButton hueLogin"><div>Hue bridges found:</div>
                    {this.bridges.map(bridge => {
                        return <div key={bridge.id} onClick={this.connectBridge.bind(this, bridge.id)} className="bridge">
                        {bridge.internalipaddress}
                        </div>
                    })}
                </div>
                
            } else if(this.state.action === 'pressing') {
                button = <div className="signInButton pressing" style={{
                    backgroundPosition: 100-((this.state.timing/60)*100)+'%'
                }}>
                Press the button on the hue bridge
                </div>
            }
        }

        return button
    }
    connectBridge(id) {
        let bridge = this.bridges.find(b => b.id === id)
        this.setState({
            action: 'pressing',
            timing: 0,
            bridge: bridge.internalipaddress
        })
        manager.hue.ip = bridge.internalipaddress
        this.interval = setInterval(async () => {
            if(this.state.timing === 59) {
                this.setState({
                    action: 'choosing'
                })
                clearInterval(this.interval)
                return
            }
            
            let username = await manager.hue.createUsername()
            .catch(() => {
                return
            })
            
            if(username !== undefined) {
                manager.setHueToken(username)
                Cookies.set('hueIP', manager.hue.ip, {expires: 356*5})
                Cookies.set('hueToken', manager.hue.token, {expires: 356*5})
                this.setState({
                    action: 'done'
                })
                clearInterval(this.interval)
                return
            }

            this.setState({
                action: 'pressing',
                timing: this.state.timing+1
            })
        }, 1000);
    }
    async loadBridges() {
        manager.hue.getBridges().then(bridges => {
            this.bridges = bridges
            this.setState({
                action: 'choosing'
            })            
        })
    }
}
