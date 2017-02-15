'use strict';

const _ = require('lodash');
const inquirer = require('inquirer');
const chalk = require('chalk');

function unselectable(options) {
    return new inquirer.Separator(chalk.reset(options ? options.title : ' '));
}

function createChoices(files) {
    return files;
}

function checkout(files, opts) {
    const choices = createChoices(files);

    choices.push(unselectable());
    choices.push(unselectable({title: 'Space to select. Enter to restore selected files. CTRL-C to cancel.'}));

    const questions = [
        {
            name: 'files',
            message: 'Choose which files to restore.',
            type: 'checkbox',
            choices: choices.concat(unselectable()),
            pageSize: process.stdout.rows - 2
        }
    ];

    return inquirer.prompt(questions);
}

module.exports = checkout;
