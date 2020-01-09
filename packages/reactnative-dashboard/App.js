import React from 'react';
import { View } from 'react-native';
import manager from './src/helpers/manager'
import Widgets from './src/components/Widgets'

export default function App() {
  return (
    <View>
        <Widgets></Widgets>
            
            {/* <Text style={styles.footer}>
                © 2019 Victor Klomp | Built using Spotify API, Hue API and ReactJS
            </Text> */}
    </View>
  );
}


