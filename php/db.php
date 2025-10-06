<?php
$host = "caboose.proxy.rlwy.net";
$port = 51651;
$user = "root";
$pass = "kbDJQxMxtwxLUGugVyAzFHponcEmVYEY";
$db   = "railway";

$conn = mysqli_connect($host, $user, $pass, $db, $port);

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
} else {
    // echo "Koneksi berhasil";
}
?>
