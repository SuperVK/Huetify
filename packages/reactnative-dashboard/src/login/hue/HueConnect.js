import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Modal, Picker } from 'react-native'
import BridgeSelection from './BridgeSelection'
import manager from '../../manager'
import styles from '../LoginWindowStyles'

export default class HueConnect extends Component {
    constructor(props) {
        super(props)
    }
   
    render() {
        let button = <TouchableHighlight 
            style={[styles.signInButton]}
            onPress={console.log('doop')}
        >
            <Text style={styles.signInText}>Select Hue Bridge</Text>
        </TouchableHighlight>
        return button
    }   
}