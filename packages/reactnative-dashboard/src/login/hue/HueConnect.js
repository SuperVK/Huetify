import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import manager from '../../manager'
import styles from '../LoginWindowStyles'

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
            text = <TouchableHighlight
                onPress={() => {

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
            {text}
        </View>
        return button
    }

    logOut() {

        // TODO remove from storage

        manager.setHueToken(null)
        this.setState({
            action: 'loading'
        })
    }    
}