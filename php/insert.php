<?php
include_once 'db.php';

if (isset($_POST['submit'])) {
    $nama = $_POST['nama'];
    $lokasi = $_POST['lokasi'];
    $kehadiran = $_POST['kehadiran'];
    $ucapan = $_POST['ucapan'];

    // Gunakan nama tabel kirim_doa (bukan kirim-doa)
    $stmt = $conn->prepare("INSERT INTO kirim (nama, kota, kehadiran, ucapan) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nama, $lokasi, $kehadiran, $ucapan);

    if ($stmt->execute()) {
        echo "success";
        // header('Location: ../index.html'); // aktifkan kalau mau redirect
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
