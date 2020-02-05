import React, { Component } from 'react'
import { Text, View } from 'react-native'
import manager from '../../../helpers/manager'
import styles from '../LoginWindowStyles'


class Bridge extends Component {
    constructor(props) {
        super(props)
        console.log(props.selected, props.ip)
    }
    render() {
        return <View style={style.bridge}>
            <Text style={style.bridgeIP}>{this.props.ip}</Text>
        </View>
    }
}