'use strict';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App'
import Manager from 'huetify-manager'

window.WORKER_URL = 'https://huetify.supervk.workers.dev'
export const manager = new Manager()

render(
    <App></App>,
    document.getElementById('app')
);

manager.on('update', () => {
    render(
        <App></App>,
        document.getElementById('app')
    );
})


