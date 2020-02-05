import React from 'react';
import { View } from 'react-native';
import manager from './src/manager'
import Widgets from './src/Widgets/Widgets'
import styles from './src/Widgets/WidgetsStyles'

export default function App() {    
    return (
        <View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            background: '#212121'
        }}>
            <Widgets></Widgets>
        
            {/* <Text style={styles.footer}>
                © 2019 Victor Klomp | Built using Spotify API, Hue API and ReactJS
            </Text> */}
        </View>
    );
    
}


