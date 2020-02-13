import React, { Component } from 'react'
import { Text, View } from 'react-native'
import manager from '../../manager'
import styles from '../LoginWindowStyles'

export default class BridgeSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            action: 'choosing',
            selectedIP: null
        }
        this.bridges = []
        this.loadBridges()
    }
    render() {
        return <View>
            {this.bridges.map(bridge => {
                return <Text key={bridge.id} onClick={this.connectBridge.bind(this, bridge.id)} style={styles.bridge}>
                {bridge.internalipaddress}
                </Text>
            })}
        </View>
    }
    
    
}



