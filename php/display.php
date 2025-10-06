<?php
include_once 'db.php';

$sql = "SELECT * FROM kirim ORDER BY id DESC"; // tampilkan data terbaru dulu
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        // Tentukan tampilan kehadiran
        switch ($row["kehadiran"]) {
            case 'hadir':
                $kehadiran = '<span class="hadir">Hadir</span>';
                break;
            case 'mungkin-hadir':
                $kehadiran = '<span class="m-hadir">Mungkin Hadir</span>';
                break;
            default:
                $kehadiran = '<span class="t-hadir">Tidak Hadir</span>';
        }

        // Tampilkan data
        echo '
        <div class="data-doa">
            <div class="name-doa mt-1">' . htmlspecialchars($row["nama"]) . '</div>
            <div class="location-and-present mt-1">
                <span class="location-name">Di ' . htmlspecialchars($row["kota"]) . ' </span>
                ' . $kehadiran . '
            </div>
            <div class="doa-value mt-1">" ' . htmlspecialchars($row["ucapan"]) . ' "</div>
        </div>';
    }
} else {
    echo "<p>Tidak ada ucapan yang masuk.</p>";
}

mysqli_close($conn);
?>
