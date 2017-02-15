'use strict';

const execa = require('execa');
const chalk = require('chalk');
const checkout = require('./checkout');

function init(opts) {
    execa('git', ['ls-files', '-m']).then(result => {
        const modifiedFiles = result.stdout.split('\n');

        if (modifiedFiles.join('') === '') {
            console.log('Nothing modified.');
        } else {
            checkout(modifiedFiles, opts).then(result => {
                const files = result.files;
                if (!files.length) {
                    console.log(chalk.green(`No files has been chosen.`));
                } else {
                    execa('git', ['checkout', '--'].concat(files)).then(result => {
                        console.log(chalk.blue(`\nFollowing file(s) has been restored:\n`), files.join('\n '), '\n');
                    });
                }
            });
        }
    });
}

module.exports = init;
