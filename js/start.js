//
// My MetaPress Plugin

import packageJson from '../package.json'

export default class MyMetaPressPlugin {

    // Plugin information
    id              = packageJson.metapress?.id || packageJson.name
    name            = packageJson.metapress?.name || packageJson.name
    description     = packageJson.metapress?.description || packageJson.description
    version         = packageJson.version
    provides        = [ ]
    requires        = [ ]

    /** Called on load */
    onLoad() {

        console.log(`Hello from ${this.name}!`)

    }

}