import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginWindow from './src/components/loginWindow/LoginWindow'
import manager from './src/helpers/manager'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    color: 'white'
  }
});

export default function App() {
  return (
    <View style={styles.container}>
        <View className="app">
            <View className="widgets">
            <LoginWindow></LoginWindow>
            <View>
                <Player></Player>
            </View>

            <View className="divider"></View>
            <View className={`hue ${manager.hue.isReady ? '' : 'disabled'}`}>
                <LightSelection></LightSelection>
                <BrightnessSlider></BrightnessSlider>
                </View>
                <View className={(manager.hue.isReady&&manager.spotify.isReady) ? '' : 'disabled'}>
                <ToggleSwitch></ToggleSwitch>
            </View>

            </View>
            <Text className="footer">
                © 2019 Victor Klomp | Built using <a href="https://developer.spotify.com/">Spotify API</a>, <a href="https://developers.meethue.com/">Hue API</a> and <a href="https://reactjs.org/">ReactJS</a>
            </Text>
        </View>
    </View>
  );
}


