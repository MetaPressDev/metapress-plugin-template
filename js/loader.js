import packageJson from '../package.json'

// Register the plugin to load asynchronously
window.metapressPluginLoaders = window.metapressPluginLoaders || []
window.metapressPluginLoaders.push(async function() {

    // If we're in development mode, run the check to load the local version instead
    if (process.env.NODE_ENV === 'development' && !window.metapressLocalPluginBuildLoading) {

        // We are running a dev build, check if we can access the local version
        try {

            // Fetch it first
            console.debug(`[MetaPress] Plugin in development mode, checking for local build...`)
            let code = await fetch(`http://localhost:11234/loader.js`).then(r => r.text())
            if (!code)
                throw new Error("No code returned from local server.")

            // Run it
            window.metapressLocalPluginBuildLoading = true
            let script = document.createElement('script')
            script.src = `http://localhost:11234/loader.js`
            document.body.appendChild(script)

            // Wait for code to load
            await new Promise((resolve, reject) => {
                script.onload = resolve
                script.onerror = () => reject(new Error("Failed to execute local plugin code."))
            })
            return

        } catch (err) {

            // Local version not available, load the production version
           console.warn(`[MetaPress] Local plugin build not available, loading stored version. (${err.message})`)

        }

    }

    // Load the plugin asynchronously
    window.metapress.plugins.register(import('./start.js'), {
        name: packageJson.metapress?.name || packageJson.name,
    })

})