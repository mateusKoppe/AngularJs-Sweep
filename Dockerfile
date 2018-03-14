FROM php:7.1-fpm

RUN docker-php-ext-install pdo_mysql

RUN pecl install xdebug
RUN docker-php-ext-enable xdebug

COPY composer.json /var/www/default/

RUN curl -sS https://getcomposer.org/installer | php \
        && mv composer.phar /usr/local/bin/ \
        && ln -s /usr/local/bin/composer.phar /usr/local/bin/composer

ENV PATH="~/.composer/vendor/bin:./vendor/bin:${PATH}"

COPY docker/conf/php.ini /etc/php/7.1/fpm/conf.d/40-custom.ini

RUN composer install --prefer-source --no-interaction
