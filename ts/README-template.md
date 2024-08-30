# About

What is this project for?

More steps required to set this up for typescript:

    // run tsc --init; try with --rootDir ./src and --outDir ./build (check tsconfig.json)
    // run 'tsc'
    // run 'node ./build/app.js to verify working
    // run 'npm init --yes' to set up the node directory
    // npm install --g nodemon concurrently
    // add these to "scripts" in package.json:
    //          "start:build": "tsc -w",
    //          "start:run": "nodemon build/app.js",
    //          "start": "concurrently npm:start:*"
    // change "main" to "app.js" in package.json

===

CHANGELOG:

1.0.0:  Initial version.

Created from https://github.com/jric/skel/tree/main/ts
