import React from 'react';
import { render } from 'react-dom';
import App from './components/App'
import Manager from 'huetify-manager'
import * as serviceWorker from './serviceWorker';

window.WORKER_URL = 'https://huetifydev.supervk.workers.dev'
export const manager = new Manager()

render(
    <App></App>,
    document.getElementById('root')
);

manager.on('update', () => {
    render(
        <App></App>,
        document.getElementById('root')
    );
})

// making an audiocontext removes throttling for firefox
window.audiohack = new AudioContext()


serviceWorker.register();
