import React from 'react';
import { render } from 'react-dom';
import LoginWindow from './components/loginWindow/LoginWindow'
import SettingWindow from './components/settingsWindow/SettingsWindow'
import BaseWindow from './components/BaseWindow'
import Manager from 'huetify-manager'
import * as serviceWorker from './serviceWorker';

window.WORKER_URL = 'https://huetifydev.supervk.workers.dev'
export const manager = new Manager()

export function loadLoginWindow() {
    render(
        <BaseWindow subWindow={<LoginWindow></LoginWindow>}></BaseWindow>,
        document.getElementById('root')
    );
}
loadLoginWindow()


manager.on('update', () => {
    render(
        <BaseWindow subWindow={<SettingWindow></SettingWindow>}></BaseWindow>,
        document.getElementById('root')
    );
})

// making an audiocontext removes throttling for firefox
window.audiohack = new AudioContext()


serviceWorker.register();
