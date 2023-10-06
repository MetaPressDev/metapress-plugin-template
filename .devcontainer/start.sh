#!/bin/bash

# Colors
ColorReset="\e[0m"
ColorGreen="\e[32m"
ColorBlue="\e[34m"

echo -e "$ColorGreen"
echo " +--------------------------------------+"
echo " |       WordPress Dev Container        |"
echo " +--------------------------------------+"
echo -e "$ColorReset"

# Fix permissions for volumes
echo -e "$ColorBlue-$ColorReset Fixing permissions"
sudo chown vscode /workspace/node_modules

# Start database
echo -e "$ColorBlue-$ColorReset Starting MariaDB"
sudo mysqld_safe > /dev/null &

# Check if first setup has run
if [ ! -f /first-setup-complete ] ; then

    # Do database initial setup if needed
    echo -e "$ColorBlue-$ColorReset Doing first time setup"
    echo -e "  $ColorBlue-$ColorReset Creating database"

    # Wait for DB to start
    while ! sudo mysqladmin ping --silent > /dev/null ; do 
        sleep 1 > /dev/null
    done

    # Update DB root password
    DATABASE_PASS="rootpwd"
    sudo mysqladmin -u root password "$DATABASE_PASS"

    # Create wordpress database
    mysql -u root -p"$DATABASE_PASS" -e "CREATE DATABASE wordpress"

    # Install the site
    echo -e "  $ColorBlue-$ColorReset Setting up WordPress"
    wp core install --url=http://localhost:8011 --title="Test Site" --admin_user=test --admin_password=test --admin_email=test@email.com --skip-email --quiet

    # Import test content
    # echo -e "  $ColorBlue-$ColorReset Importing test content"
    # wp plugin install wordpress-importer --activate --quiet
    # wp import /workspace/.devcontainer/themeunittestdata.wordpress.xml --authors=skip --quiet > /dev/null

    # Install MetaPress plugin
    echo -e "$ColorBlue-$ColorReset Activating MetaPress"
    wp plugin activate metapress

    # Mark complete
    echo "yes" | sudo tee /first-setup-complete > /dev/null

fi

# Start Apache server
echo -e "$ColorBlue-$ColorReset Starting web server"
sudo apache2ctl start

# Done
echo -e "$ColorBlue-$ColorReset Ready! You can now log in to ${ColorGreen}http://localhost:8011${ColorReset} with user '${ColorGreen}test${ColorReset}' and password '${ColorGreen}test${ColorReset}'."