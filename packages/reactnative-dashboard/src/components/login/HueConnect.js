import React, { Component } from 'react'
import { Text, View } from 'react-native'
import manager from '../../helpers/manager'
import styles from '../../styles/LoginWindowStyles'

export default class HueConnect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            action: 'loading'
        }
        this.bridges = []
    }
    render() {
        let text = <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Failure loading</Text>

        let loggedIn = !!manager.hue.token

        if(loggedIn) {
            text = <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Connected to Hue</Text>
        } else {
            text = <Text style={{
                    color: 'white',
                    fontSize: 16
                }}>Connect to Hue</Text>
        }
        let button = <View style={[styles.signInButton, loggedIn && styles.signInButtonConnected]}>
            {text}
        </View>
        return button
    }

    // render() {
    //     let button = 
    //     <View styles={[styles.signInButtonFlex, styles.hueLogin]}>
    //         <Text style={styles.signInText}>woop</Text>
    //     </View>
    //     let loggedIn = manager.hue.token
    //     if(loggedIn) button = 
    //         <View style={[styles.signInButtonFlex, styles.hueLogin]}>
    //             <Text style={[styles.signInButton, styles.signInText]}>Connected to Hue</Text>
    //         </View>
    //     else {
    //         if(this.state.action === 'loading') this.loadBridges()
    //         if(this.state.action === 'loading') button = 
    //             <View styles={[styles.signInButtonFlex, styles.hueLogin]}>
    //                 <Text connected="false" style={[styles.signInButton, styles.signInText]}>Searching hue bridges...</Text>
    //             </View>
    //         else if(this.state.action === 'choosing') {
                
    //             button = 
    //             <View style={[styles.signInButton, styles.hueLogin]}>
    //                 <Text style={[{color: 'white'}, styles.signInText]}>Hue bridges found:</Text>
    //                 {this.bridges.map(bridge => {
    //                     return <Text key={bridge.id} onClick={this.connectBridge.bind(this, bridge.id)} style={styles.bridge}>
    //                     {bridge.internalipaddress}
    //                     </Text>
    //                 })}
                    
    //             </View>
                
    //         } else if(this.state.action === 'pressing') {
    //             button = 
    //             <Text style={styles.bridge}>
    //                 Press the button on the hue bridge
    //             </Text>
    //         }
    //     }

    //     return button
    // }
    

    logOut() {

        // TODO remove from storage

        manager.setHueToken(null)
        this.setState({
            action: 'loading'
        })
    }    
}