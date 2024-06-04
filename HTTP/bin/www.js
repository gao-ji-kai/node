#! /usr/bin/env node

import { program } from 'commander';
// const { program } = require('commander');
// const Server = require('../src/index.js');
import Server from '../src/index.js';

const commands = {
    'port': {
        option: '-p, --port <v>',
        default: 3000,
        discription: 'set server port',
        usage: 'gaoter-server --port 3000'

    },
    'directory': {
        option: '-d, --directory <v>',
        default: process.cwd(),
        discription: 'set server directory',
        usage: 'gaoter-server --directory '
    }
}
const usages = []
Object.entries(commands).forEach(([key, value]) => {
    program.option(value.option, value.discription, value.default);
    usages.push(value.usage);
})

program.on('--help', function () {
    console.log('\nExamples:');
    usages.map(item => console.log('' + item))
});


program.parse(process.argv);

// console.log('program', program.opts());

new Server(program.opts()).start();
