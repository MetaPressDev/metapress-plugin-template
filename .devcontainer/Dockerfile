#
# Dockerfile to set up a LAMP environment to run a local WordPress

# Base is Ubuntu with VSCode extras
FROM mcr.microsoft.com/devcontainers/base:ubuntu
USER vscode

#  Install PHP 7.4
RUN export DEBIAN_FRONTEND=noninteractive && \
    sudo apt update && \
    sudo apt upgrade -y && \
    sudo apt install -y software-properties-common ca-certificates lsb-release apt-transport-https && \
    LC_ALL=C.UTF-8 sudo add-apt-repository ppa:ondrej/php && \
    sudo apt update && \
    sudo apt install -y php7.4 php7.4-mysql php7.4-gd php7.4-sqlite3

# Install Apache
RUN sudo apt update
RUN export DEBIAN_FRONTEND=noninteractive && sudo apt install -y apache2 libapache2-mod-php7.4

# Make Apache run as vscode user so we don't have to worry about PHP access permissions
RUN sudo chown -R vscode /var/www
RUN echo "\n\n# Dev Container\nexport APACHE_RUN_USER=vscode\nexport APACHE_RUN_GROUP=vscode" | sudo tee --append /etc/apache2/envvars > /dev/null

# Set HTTP listen port
RUN echo "Listen 8011\nServerName localhost" | sudo tee /etc/apache2/ports.conf > /dev/null

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && sudo apt update \
    && sudo apt install gh -y

# Install latest WordPress to /var/www/html
RUN cd /tmp && \
    wget https://wordpress.org/latest.tar.gz && \
    tar -xzvf latest.tar.gz && \
    rm -r /var/www/html && \
    mv /tmp/wordpress /var/www/html
COPY /wp-config.php /var/www/html/wp-config.php

# Increase PHP max file upload size
USER root
RUN echo "upload_max_filesize = 128M"   >> /etc/php/7.4/apache2/php.ini && \
    echo "post_max_size = 128M"         >> /etc/php/7.4/apache2/php.ini
USER vscode

# Install WordPress CLI
RUN cd /tmp && \
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    sudo mv wp-cli.phar /usr/local/bin/wp

# Setup CLI paths
RUN mkdir -p /home/vscode/.wp-cli && \
    echo "path: /var/www/html" | sudo tee /home/vscode/.wp-cli/config.yml > /dev/null

# Install WordPress CLI bash autocomplete
RUN cd /tmp && \
    curl -O https://github.com/wp-cli/wp-cli/raw/main/utils/wp-completion.bash && \
    mv wp-completion.bash /home/vscode/wp-completion.bash && \
    echo "\nsource /home/vscode/wp-completion.bash\n" >> /home/vscode/.profile

# Install Node 20 ... see https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions
RUN export NODE_MAJOR=20 \
    && export DEBIAN_FRONTEND=noninteractive \
    && sudo apt-get install -y ca-certificates curl gnupg \
    && sudo mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list \
    && sudo apt-get update \
    && sudo apt-get install nodejs -y

# Install MariaDB
RUN export DEBIAN_FRONTEND=noninteractive && sudo apt install -y mariadb-server

# Install latest MetaPress to /var/www/html/wp-content/plugins
RUN cd /tmp && \
    wget https://get.metapress.dev/metapress-wordpress-latest.zip && \
    mkdir -p /var/www/html/wp-content/plugins && \
    unzip metapress-wordpress-latest.zip -d /var/www/html/wp-content/plugins

# Copy start script
COPY /start.sh /start.sh
RUN sudo chmod 0777 /start.sh
