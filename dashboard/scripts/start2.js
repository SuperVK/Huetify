'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Ensure environment variables are read.
require('../config/env');

const webpack = require('webpack');
const configFactory = require('../config/webpack.config');
const config = configFactory('development');



// Create a webpack compiler that is configured with custom messages.
const compiler = webpack(config)
const watching = compiler.watch({
    aggregateTimeout: 300,
    poll: undefined
}, (err, stats) => {
    
    console.log(`Hash: ${stats.hash}`)
    console.log(`Took ${stats.endTime-stats.startTime}ms`)
    console.log('-----------------------------------------')
})