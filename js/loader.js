import packageJson from '../package.json'

// Register the plugin to load asynchronously
window.metapressPluginLoaders = window.metapressPluginLoaders || []
window.metapressPluginLoaders.push(async function() {

    // Load the plugin asynchronously
    window.metapress.plugins.register(import('./start.js'), {
        name: packageJson.metapress?.name || packageJson.name,
    })

})