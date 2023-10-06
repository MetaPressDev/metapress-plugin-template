<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'rootpwd' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

# SQLite settings
#error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
#ini_set('error_reporting', E_ERROR | E_WARNING | E_PARSE | E_NOTICE );

# Update files directly
define( 'FS_METHOD', 'direct' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'put your unique phrase here' );
define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
define( 'NONCE_KEY',        'put your unique phrase here' );
define( 'AUTH_SALT',        'put your unique phrase here' );
define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
define( 'NONCE_SALT',       'put your unique phrase here' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */

// Enable debug mode when not using the CLI only
if(!defined('_SERVER') && !defined('WP_DEBUG')) define('WP_DEBUG', false);
if(!defined('WP_DEBUG')) define('WP_DEBUG', true);

/* Add any custom values between this line and the "stop editing" line. */



/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
        define( 'ABSPATH', __DIR__ . '/' );
}



/*** Dynamic hostname ... see https://wordpress.stackexchange.com/a/222775 *****/
$hostname = "localhost:8011";
if (!empty($_SERVER['HTTP_HOST'])) $hostname = $_SERVER['HTTP_HOST'];
if (!empty($_SERVER['HTTP_X_FORWARDED_HOST'])) $hostname = $_SERVER['HTTP_X_FORWARDED_HOST'];   # <-- proxy support (is this wrong?)
if (!empty($_SERVER['HTTP_X_ORIGINAL_HOST'])) $hostname = $_SERVER['HTTP_X_ORIGINAL_HOST'];     # <-- ngrok support
$hostname = rtrim($hostname, '/');
$protocol = 'http://';
if (!empty($_SERVER['HTTPS'])) $protocol = 'https://';
if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') $protocol = 'https://';
$siteUrl = $protocol . $hostname;
define('WP_HOME', $siteUrl);
define('WP_SITEURL', $siteUrl);

// Update headers forcefully since some plugins don't use WP's API but use PHP vars directly
if ($protocol == 'https://') $_SERVER['HTTPS'] = 'on';
$_SERVER['HTTP_HOST'] = $hostname;



/* That's all, stop editing! Happy publishing. */

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';