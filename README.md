# MetaPress Plugin

This is a plugin for [MetaPress](https://get.metapress.dev).

## Building

- Make sure you have [Node](https://nodejs.org) installed.
- Run `npm install` to install dependencies.
- Run `npm run build` to build the plugin.
- The plugin code is at `js/start.js`.
- The build output will be saved to the `dist` folder. The ZIP file contains the WordPress plugin.

> If using the VSCode Dev Container, you can run `npm run dev` to push your plugin to the included WordPress server and watch for changes.

## Installation

- Download the ZIP file from the release page, or build it yourself.
- In WordPress, go to Plugins > Add New > Upload Plugin and select the ZIP file.