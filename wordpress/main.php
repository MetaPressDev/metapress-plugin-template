<?php
/**
 * @package REPLACE_WP_NAME
 */
/*
Plugin Name: REPLACE_METAPRESS_NAME
Description: REPLACE_METAPRESS_DESCRIPTION
Version: REPLACE_PACKAGE_VERSION
Requires at least: 6.1
Requires PHP: 7.4
Author: REPLACE_PACKAGE_AUTHOR
Text Domain: REPLACE_WP_NAME
*/

// Register the MetaPress plugin
add_action('metapress_register_plugin', function($register) {

    // Return template info
    $register(array(
        'id' => "REPLACE_METAPRESS_ID",
        'name' => "REPLACE_METAPRESS_NAME",
        'description' => "REPLACE_METAPRESS_DESCRIPTION",
        'version' => "REPLACE_PACKAGE_VERSION",
        'author' => "REPLACE_PACKAGE_AUTHOR",
    ));

});

// Inject the plugin's code
add_action('metapress_scripts', 'metapress_REPLACE_WP_NAME_scripts');
function metapress_REPLACE_WP_NAME_scripts($config) {
    $codeLocation = plugin_dir_url(__FILE__) . 'js/loader.js';
    echo "<script src='$codeLocation'></script>";
}


// Inject any extra config options
add_filter('metapress_config', 'metapress_REPLACE_WP_NAME_config');
function metapress_REPLACE_WP_NAME_config($config) {
    // $config['test1'] = 'test1';
    return $config;
}