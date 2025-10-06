# Gunakan image PHP 8.2 dengan Apache
FROM php:8.2-apache

# Install ekstensi mysqli agar PHP bisa konek ke MySQL
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Salin semua file project ke folder web server
COPY . /var/www/html/

# Buka port 80 untuk web server
EXPOSE 80
