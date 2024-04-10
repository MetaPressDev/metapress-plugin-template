//
// Run build tasks. This is designed to be used as a package.json script.
const { run, info, replaceInFiles } = require('./utils.js')
const fs = require('fs')

// Clean the build files from the project
exports.clean = () => {
    info('Cleaning...')
    fs.rmSync('./dist', { recursive: true, force: true })
}

// Build the JS code
exports.buildJS = (mode = 'production') => {
    info('Building JS library (' + mode + ')...')

    // Build the JS code with Webpack
    fs.mkdirSync('./dist', { recursive: true })
    run(`npx webpack build --mode ${mode}`)

    // Get WordPress plugin ID, derived from the package name
    const packageJson = require('../package.json')
    const wordpressID = packageJson.name.replaceAll(/[^0-9A-Za-z_]/g, '_')

    // If production, package the core library
    if (mode === 'production') {
        
        // Build (zip) the plugin
        run(`cd ./dist/plugin && npx bestzip ../${wordpressID}-core-v${packageJson.version}.zip ./`)

    }

}

// Copy the WordPress plugin files into the build directory, and remove unnecessary files
exports.buildWordpressPlugin = (installToDevServer) => {
    info('Building WordPress plugin...')

    // Get WordPress plugin ID, derived from the package name
    const packageJson = require('../package.json')
    const wordpressID = packageJson.name.replaceAll(/[^0-9A-Za-z_]/g, '_')

    // Copy the WordPress plugin files into the build directory
    fs.mkdirSync('./dist', { recursive: true })
    fs.cpSync('./wordpress', `./dist/${wordpressID}`, { recursive: true })

    // Rename the plugin's main PHP file
    fs.renameSync(`./dist/${wordpressID}/main.php`, `./dist/${wordpressID}/${wordpressID}.php`)

    // Replace vars in the WordPress code
    replaceInFiles(`./dist/${wordpressID}`, {
        'REPLACE_WP_NAME':                  wordpressID,
        'REPLACE_PACKAGE_NAME':             packageJson.name.replaceAll(/"/g, '\\"').replaceAll(/\n/g, ' '),
        'REPLACE_PACKAGE_VERSION':          packageJson.version || "0",
        'REPLACE_PACKAGE_AUTHOR':           packageJson.author || "No Author",
        'REPLACE_METAPRESS_ID':             (packageJson.metapress?.id || packageJson.name || "").replaceAll(/"/g, '\\"').replaceAll(/\n/g, ' '),
        'REPLACE_METAPRESS_NAME':          (packageJson.metapress?.name || packageJson.name).replaceAll(/"/g, '\\"').replaceAll(/\n/g, ' '),
        'REPLACE_METAPRESS_DESCRIPTION':    (packageJson.metapress?.description || packageJson.description || "No description.").replaceAll(/"/g, '\\"').replaceAll(/\n/g, ' '),
    })

    // Copy the JS library in
    fs.cpSync('./dist/plugin', `./dist/${wordpressID}/js`, { recursive: true })

    // Install to the dev server if needed
    if (installToDevServer) {

        // Remove old plugin
        info('Installing to the dev server...')
        fs.rmSync(`/var/www/html/wp-content/plugins/${wordpressID}`, { recursive: true, force: true })

        // Copy plugin across
        fs.cpSync(`./dist/${wordpressID}`, `/var/www/html/wp-content/plugins/${wordpressID}`, { recursive: true })

        // Activate the plugin
        run(`wp plugin activate ${wordpressID}`)

    } else {

        // Build (zip) the plugin
        run(`cd ./dist && npx bestzip ${wordpressID}-wordpress-v${packageJson.version}.zip ${wordpressID}`)

    }

    // Remove the temporary WordPress folder
    fs.rmSync(`./dist/${wordpressID}`, { recursive: true, force: true })

}

// Build the plugin
exports.build = (mode) => {
    exports.clean()
    exports.buildJS(mode)
    exports.buildWordpressPlugin()
}

// Start the dev server
exports.dev = () => {

    // Ensure we are inside the dev container
    if (!fs.existsSync("/var/www/html/wp-content"))
        throw new Error("This command requires to be running inside the VSCode Dev Container.")

    // Start the build process
    exports.clean()
    exports.buildJS('development')
    exports.buildWordpressPlugin(true)

    // Start the dev server
    info('Starting dev server...')
    run('npx webpack serve --mode development')

}

// Execute the appropriate task
let cmd = process.argv[2]
if (!exports[cmd]) throw new Error("Unknown command: " + cmd)
exports[cmd](...process.argv.slice(3))