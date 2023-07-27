//
// Run build tasks. This is designed to be used as a package.json script.
const child_proccess = require('child_process')
const fs = require('fs')

// Some ANSI color codes
const ansiReset = '\x1B[0m'
const ansiFgBlue = '\x1B[34m'
const ansiFgGrey = '\x1B[90m'
exports.info = (txt)  => console.log(ansiFgBlue + '>' + ansiReset + ' ' + txt)

// Helper to run a process and output it's text only if it fails
exports.run = (cmd) => {

    // Run it
    console.log(ansiFgBlue + '  > ' + ansiFgGrey + cmd + ansiReset)
    let result = child_proccess.spawnSync(cmd, { shell: true, stdio: 'inherit' })

    // Check if failed
    if (result.status || result.error) {
        console.error("Process failed")
        if (result.error) console.log(result.error)
        process.exit(1)
    }

}

// Helper to replace all instances of a string in all files within a folder recursively
exports.replaceInFiles = (folder, replacements) => {

    // Extensions to use when searching for files
    let extensions = [ '.js', '.html', '.css', '.json', '.php', '.md', '.txt', '.xml', '.yml', '.yaml' ]

    // Get all files in the folder
    let files = fs.readdirSync(folder)

    // Loop through each file
    for (let file of files) {

        // Get the full path to the file
        let filePath = folder + '/' + file

        // Check if it's a file we should search
        if (!extensions.find(e => filePath.toLowerCase().endsWith(e))) 
            continue

        // Check if it's a directory
        if (fs.statSync(filePath).isDirectory()) {

            // Recurse into the directory
            replaceInFiles(filePath, find, replace)

        } else {

            // Read the file
            let contents = fs.readFileSync(filePath, 'utf8')

            // Replace the text
            for (let key in replacements) {
                let value = replacements[key]
                contents = contents.replaceAll(key, value)
            }

            // Write the file
            fs.writeFileSync(filePath, contents, 'utf8')

        }

    }

}