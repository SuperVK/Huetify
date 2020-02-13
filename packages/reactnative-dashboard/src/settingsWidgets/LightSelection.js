import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './SettingsWidgets'

export default class LightSelection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lightsLoaded: false,
            selectedLight: 'Select',
            lights: [{
                name: 'loading...',
                type: 'Extended color light',
                id: '1'
            }]
        }
        
    }
    render() {
        return (
            <View styles={styles.lightSelection}>
                <Text>Light selection:</Text>
                <Text styles={styles.subtext}>Currently limited to one.</Text> 
                <View styles={styles.lights}>
                {
                this.state.lights.map(light => {
                    if(light.type !== 'Extended color light') return ''
                    if(this.state.selectedLight === light.id) return <Text key={light.id} /*onClick={this.selectLight.bind(this, light)}*/ styles={[styles.selected, styles.light]}>{light.name}</Text>
                    return <Text key={light.id} /*onClick={this.selectLight.bind(this, light)}*/ styles={styles.light}>{light.name}</Text>
                })
                }
                </View>
            </View>
        )
    }
}