<?php
$servername = 'caboose.proxy.rlwy.net';
$port       = 51651;
$username   = 'root';
$password   = 'kbDJQxMxtwxLUGugVyAzFHponcEmVYEY';
$dbname     = 'railway';

$conn = mysqli_connect($servername, $username, $password, $dbname, $port);

if (!$conn) {
    die('Koneksi gagal: ' . mysqli_connect_error());
}

echo "Koneksi sukses!";
?>
