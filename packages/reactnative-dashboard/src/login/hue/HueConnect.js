import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Modal, Picker } from 'react-native'
import BridgeSelection from './BridgeSelection'
import manager from '../../manager'
import styles from '../LoginWindowStyles'

export default class HueConnect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            action: 'loading',
            modalVisible: false
        }
        this.bridges = []
        this.loadBridges().then(() => {this.setState({})})
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }
    async loadBridges() {
        manager.hue.getBridges().then(bridges => {
            this.bridges = bridges
            this.setState({
                action: 'choosing'
            })            
        })
    }
    
    render() {
        let text = <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Loading brigdes..</Text>

        let loggedIn = !!manager.hue.token

        if(loggedIn) {
            text = <TouchableHighlight
                onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 16
                    }}>Connected to Hue</Text>
                </TouchableHighlight>
        } else {
            text = <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Connect to Hue</Text>
        }
        let button = <View style={[styles.signInButton, loggedIn && styles.signInButtonConnected]}>
            
        </View>
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

    logOut() {

        // TODO remove from storage

        manager.setHueToken(null)
        this.setState({
            action: 'loading'
        })
    }    
}