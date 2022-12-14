FROM php:7.0.30-apache

ENV COMPOSER_ALLOW_SUPERUSER=1

EXPOSE 80
WORKDIR /app

# git, unzip & zip are for composer
RUN apt-get update -qq && \
    apt-get install -qy \
    nano \
    cron \
    netcat \
    python3 \
    ftp \
    git \
    gnupg \
    unzip \
    zip && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# PHP Extensions
RUN docker-php-ext-install -j$(nproc) opcache pdo_mysql
COPY conf/php.ini /usr/local/etc/php/conf.d/app.ini

# Apache
COPY errors /errors
COPY conf/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY conf/apache.conf /etc/apache2/conf-available/z-app.conf
COPY app /app
RUN a2enmod rewrite remoteip && \
    a2enconf z-app

# Crontab
COPY scripts/cronjob.sh /etc/cron.d/clear-tmp.sh
RUN chmod 777 /etc/cron.d/clear-tmp.sh
RUN crontab -l | { cat; echo "* * * * * bash /etc/cron.d/clear-tmp.sh"; } | crontab -

# FTP Creds if no anonymous
# RUN echo "[172.18.0.3:21]\nadmin:Sup3Rs3CuReP4sS" > /root/ftp-database.txt

# Entrypoint
CMD ["/bin/sh", "-c", "cron && docker-php-entrypoint apache2-foreground"]
