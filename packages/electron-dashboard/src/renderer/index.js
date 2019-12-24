'use strict';
import React from 'react';
import {
    render
} from 'react-dom';
import App from './components/App'
import Manager from 'huetify-manager'
import * as url from 'url'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'
window.WORKER_URL = 'https://huetify.supervk.workers.dev'
export const manager = new Manager()

export function getStatic(val) {
    if (isDevelopment) {
        return url.resolve(window.location.origin, val)
    }
    return path.resolve(__static, val)
}

render(<App></App>,
    document.getElementById('app')
);

manager.on('update', () => {
    render(<App></App>,
        document.getElementById('app')
    );
})