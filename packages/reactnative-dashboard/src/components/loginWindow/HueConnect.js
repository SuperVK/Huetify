import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { manager } from '../../helpers/manager'

export default class HueConnect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            action: 'loading'
        }
        this.bridges = []
    }
    render() {
        let button = <Text className="signInButton hueLogin">woop</Text>
        let loggedIn = manager.hue.token
        if(loggedIn) button = <Text connected="true" onClick={this.logOut.bind(this)} className="signInButton hueLogin">Connected to Hue</Text>
        else {
            if(this.state.action === 'loading') this.loadBridges()
            if(this.state.action === 'loading') button = <Text connected="false" className="signInButton hueLogin">Searching hue bridges...</Text>
            else if(this.state.action === 'choosing') {
                
                button = 
                <View className="signInButton hueLogin"><Text>Hue bridges found:</Text>
                    {this.bridges.map(bridge => {
                        return <Text key={bridge.id} onClick={this.connectBridge.bind(this, bridge.id)} className="bridge">
                        {bridge.internalipaddress}
                        </Text>
                    })}
                </View>
                
            } else if(this.state.action === 'pressing') {
                button = <Text className="signInButton pressing" style={{
                    backgroundPosition: 100-((this.state.timing/60)*100)+'%'
                }}>
                Press the button on the hue bridge
                </Text>
            }
        }

        return button
    }
    logOut() {

        // TODO remove from storage

        manager.setHueToken(null)
        this.setState({
            action: 'loading'
        })
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
                // window.localStorage.setItem('hueIP', manager.hue.ip)
                // window.localStorage.setItem('hueToken', manager.hue.token)
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