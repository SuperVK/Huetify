import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { View } from 'react-native';
import manager from './src/manager'
import Widgets from './src/Widgets/Widgets'
import BridgeSelection from './src/login/hue/BridgeSelection'
import styles from './src/Widgets/WidgetsStyles'

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Homepage"
                    component={Widgets}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
    
}


