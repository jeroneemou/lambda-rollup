import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';

module.exports = {
    input: 'src/handler.ts',
    output: {
        file: 'dist/handler.js',
        format: 'cjs'
    },
    plugins: [
        typescript(),
        resolve({

            // the fields to scan in a package.json to determine the entry point
            // if this list contains "browser", overrides specified in "pkg.browser"
            // will be used
            mainFields: ['module', 'main'], // Default: ['module', 'main']
      
            // some package.json files have a "browser" field which specifies
            // alternative files to load for people bundling for the browser. If
            // that's you, either use this option or add "browser" to the
            // "mainfields" option, otherwise pkg.browser will be ignored
            browser: true,  // Default: false
      
            // not all files you want to resolve are .js files
            extensions: [ '.mjs', '.js', '.jsx', '.json' ],  // Default: [ '.mjs', '.js', '.json', '.node' ]
      
            // whether to prefer built-in modules (e.g. `fs`, `path`) or
            // local ones with the same names
            preferBuiltins: false,  // Default: true
      
            // Lock the module search in this path (like a chroot). Module defined
            // outside this path will be marked as external
            jail: '/my/jail/path', // Default: '/'
      
            // Set to an array of strings and/or regexps to lock the module search
            // to modules that match at least one entry. Modules not matching any
            // entry will be marked as external
            only: [ 'some_module', /^@some_scope\/.*$/ ], // Default: null
      
            // If true, inspect resolved files to check that they are
            // ES2015 modules
            modulesOnly: true, // Default: false
      
            // Force resolving for these modules to root's node_modules that helps
            // to prevent bundling the same package multiple times if package is
            // imported from dependencies.
            dedupe: [ 'react', 'react-dom' ], // Default: []
      
            // Any additional options that should be passed through
            // to node-resolve
            customResolveOptions: {
              moduleDirectory: 'js_modules'
            }
          })
    ],
    external: [
        'aws-serverless-express',
        'express',
        'aws-serverless-express/middleware'
    ],
    context: 'undefined'
};