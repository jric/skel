#!node

import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as p from 'path';
import { promises as fs } from 'fs'
import { command, binary, run, positional } from 'cmd-ts';
import { createLogger, format, transports } from 'winston';

const TSC_OUTPUT_DIR = 'build'
const TSC_SOURCE_DIR = 'src'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const doc = `
Goal: Make it easy and consistent to start a new typescript
project
Tenet #1: Start with most basic
Tenet #2: Add functionality as desired
Tenet #3: Select from pre-canned, or create a new configuration

Run this script to create a new barebones typescript node
project as described here:
https://www.typescripttutorial.net/typescript-tutorial/nodejs-typescript/

With this basic setup, your typescript will automatically be
recompiled and run as Javascript as you make changes.
Following the doc, we use npm and supporting modules, but
should provide other configurations as desired.
`;

const l = createLogger({
    level: 'info',
    format: format.prettyPrint(),
    defaultMeta: { service: 'create-ts-app' },
    transports: [new transports.Console({
        format: format.simple(),
      })]
});

const cmd = command({
    name: 'create-ts-app',
    description: doc,
    version: '1.0.0',
    args: {
        'path': positional({ displayName: 'path', description: 'path to the directory to set up' })
    },
    handler: (args) => {
        create(args);
    }
});

async function create(args:{path: string}): Promise<void> {
    const path = args.path;
    // BASE setup

    // into path, copy README.md, update name of project (not doing that for now)
    await mkPathIfNotExists(path)
    copyReadmeIn(path);
    // create path/build and path/src
    const p1 = mkPathIfNotExists(p.resolve(path, TSC_SOURCE_DIR));
    const p2 = mkPathIfNotExists(p.resolve(path, TSC_OUTPUT_DIR));
    await Promise.all([p1, p2]); // dirs must be created before running tsc
    // run tsc --init; try with --rootDir ./src and --outDir ./build (check tsconfig.json)
    // create file src/app.ts
    createAppTs({destPath: path});
    // run 'tsc'
    // run 'node ./build/app.js to verify working
    // run 'npm init --yes' to set up the node directory
    // npm install --g nodemon concurrently
    // add these to "scripts" in package.json:
    //          "start:build": "tsc -w",
    //          "start:run": "nodemon build/app.js",
    //          "start": "concurrently npm:start:*"
    // change "main" to "app.js" in package.json
}

const binCommand = binary(cmd); // just keep first two args
run(binCommand, process.argv);

async function mkPathIfNotExists(pathToProj: string) {
    return fs.access(pathToProj)
        .then(() => {
            // Directory already exists - no-op
        })
        .catch(() => {
            return fs.mkdir(pathToProj, { recursive: false })
        });
}

/** Don't overwrite if README already present */
async function copyReadmeIn(path: string) {
    const destPath = p.resolve(path, 'README.md');
    return fs.access(destPath, fs.constants.F_OK)
        .then(() => {
            l.warn("path already exists: ", destPath);
        })
        .catch(() => {
            return fs.copyFile(p.resolve(__dirname, '..', 'README.md'), destPath,
                fs.constants.COPYFILE_EXCL /* don't overwrite */);
        });
}

// Function to create the app.ts file
function createAppTs(args: {destPath: string}) {
    const sourceFilePath = p.resolve(__dirname, '..', 'skel-base.ts');
    const newFileName = 'app.ts';

    areThereAnyTsFiles(args.destPath).then(hasTsFiles => {
        if (!hasTsFiles) {
            copyAndRenameFile(sourceFilePath, args.destPath, newFileName).then(() => {
                console.log('Created %s', p.resolve(args.destPath, newFileName));
            }).catch(err => {
                console.error(`Error copying and renaming file: ${err}`);
            });
        } else {
            console.log('The directory already contains .ts files; app.ts not created.');
        }
    }).catch(err => {
        console.error(`Error checking directory for .ts files: ${err}`);
    });
}

// Function to check if directory has any .ts file
// @returns true iff there is at least one ts file in the directory
function areThereAnyTsFiles(dirPath: string): Promise<boolean> {
    return fs.readdir(dirPath).then(files => {
        return files.some(file => p.extname(file) === '.ts');
    });
}

// Function to copy and rename file
// @param sourcePath includes the old file name
// @param targetPath only includes the new directory path with no file name
function copyAndRenameFile(sourcePath: string, targetPath: string, newFileName: string): Promise<void> {
    return fs.copyFile(sourcePath, p.join(targetPath, newFileName));
}