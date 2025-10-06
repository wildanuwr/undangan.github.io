# Gunakan image PHP dengan Apache bawaan
FROM php:8.2-apache

# Salin semua file project ke dalam folder web server
COPY . /var/www/html/

# Buka port 80
EXPOSE 80
