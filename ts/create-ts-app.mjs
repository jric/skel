#!node

import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { mkdir, copyFile, constants } from 'node:fs';
import * as path from 'path';
// import docopt from '@eyalsh/docopt'; see https://github.com/Eyal-Shalev/docopt.js/issues/13
// import { default as docopt } from '@eyalsh/docopt';  see https://github.com/Eyal-Shalev/docopt.js/issues/12

const TSC_OUTPUT_DIR = 'build'
const TSC_SOURCE_DIR = 'src'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const doc = `
Goal: Make it easy and consistent to start a new typescript project
Tenet #1: Start with most basic
Tenet #2: Add functionality as desired
Tenet #3: Select from pre-canned, or create a new configuration

Usage: ${__filename} <path> [<config>]
 - <path>: where to create the project; final element of path will be project directory
 - <config>: special configuration to use; none currently supported

Run this script to create a new barebones typescript node project as described here:
https://www.typescripttutorial.net/typescript-tutorial/nodejs-typescript/

With this basic setup, your typescript will automatically be recompiled and run as Javascript
as you make changes.  Following the doc, we use npm and supporting modules, but should provide
other configurations as desired.

`;

// implementing a stand-in for now
function docopt(doc) {
    const path = process.argv[2];
    if (path == undefined)
        throw new Error("Missing path." + doc);
    return {
        '<path>': path
    }
}

let options = docopt(doc);
let newPath = options['<path>'];
let config = options['<config>'];

// Writes usage, along with optional error
// @Returns 1 if error, else 0
function usage(msg) {
    if (msg) console.error(msg);
    console.log(doc);
    return msg ? 1 : 0;
}

if (!newPath) usage("<path> not specified");

// BASE setup

// into path, copy README.md, update name of project (not doing that for now)

mkdir(newPath + path.sep + TSC_OUTPUT_DIR, { recursive: true }, (err) => {
    if (err) throw err;
    copyFile(__dirname + path.sep + 'README.md', newPath + path.sep + 'README.md',
        constants.COPYFILE_EXCL /* don't overwrite */, (err) => {
        if (err) {
            console.error(err);
        }
    });
    mkdir(newPath + path.sep + TSC_SOURCE_DIR, { recursive: false }, (err => {
        if (err) throw err;
    }));
});

// create path/build and path/src
// change to path current directory
// run tsc --init; try with --rootDir ./src and --outDir ./build (check tsconfig.json)
// create file src/app.ts
// run 'tsc'
// run 'node ./build/app.js to verify working
// run 'npm init --yes' to set up the node directory
// npm install --g nodemon concurrently
// add these to "scripts" in package.json:
//          "start:build": "tsc -w",
//          "start:run": "nodemon build/app.js",
//          "start": "concurrently npm:start:*"
// change "main" to "app.js" in package.json

