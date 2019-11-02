import React from 'react';
import { render } from 'react-dom';
import LoginWindow from './components/loginWindow/LoginWindow'
import Manager from 'huetify-manager'
import SettingWindow from './components/settingsWindow/SettingsWindow'
import * as serviceWorker from './serviceWorker';
// import Player from './components/settingsWindow/Player';

export const manager = new Manager()

render(
    <LoginWindow></LoginWindow>,
    document.getElementById('root')
);



manager.on('start', () => {
    render(
        <SettingWindow></SettingWindow>,
        document.getElementById('root')
    );
})

manager.on('update', () => {
    render(
        <SettingWindow></SettingWindow>,
        document.getElementById('root')
    );
})

// making an audiocontext removes throttling for firefox
window.audiohack = new AudioContext()


serviceWorker.register();
