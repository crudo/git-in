#!/usr/bin/env node
'use strict';

const meow = require('meow');
const updateNotifier = require('update-notifier');

const gitIn = require('./index');
const pkg = require('../package.json');

updateNotifier({pkg}).notify();

const cli = meow({
    help: `
        Usage
          $ git-in <options>

        Options
          -co    Interactive checkout.
    `},
    {
        alias: {
            c: 'co'
        },
        default: {
            co: true
        },
        boolean: [
            'co'
        ]
    });

const options = {
    co: cli.flags.co
};

gitIn(options);
