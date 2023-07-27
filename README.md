# MetaPress Plugin

This is a plugin for [MetaPress](https://get.metapress.dev).

## Building

- Make sure you have [Node](https://nodejs.org) installed.
- Run `npm install` to install dependencies.
- Run `npm run build` to build the plugin.
- The plugin code is at `js/start.js`.
- The build output will be saved to the `dist` folder. The ZIP file contains the WordPress plugin.

> You can run `npm run dev` to start a local server. Once it's running, upload the plugin ZIP file in the `dist` folder to WordPress once, and then on subsequent changes you can just refresh the page to see the changes.

## Installation

- Download the ZIP file from the release page, or build it yourself.
- In WordPress, go to Plugins > Add New > Upload Plugin and select the ZIP file.