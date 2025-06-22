<?php
// File: save-profile.php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $oldUsername = $_POST["oldUsername"]; // username lama (digunakan sebagai identifikasi)
  $newUsername = $_POST["username"];
  $newPassword = $_POST["password"];
  $newName     = $_POST["name"];
  $newPhoto    = $_POST["photo"];

  $file = "users.txt";

  // Baca semua baris
  $lines = file($file, FILE_IGNORE_NEW_LINES);
  $updated = [];

  foreach ($lines as $line) {
    list($u, $p, $n, $ph) = explode("|", $line);
    if ($u === $oldUsername) {
      // Ganti dengan data baru
      $updated[] = "$newUsername|$newPassword|$newName|$newPhoto";
    } else {
      $updated[] = $line;
    }
  }

  // Tulis ulang file
  file_put_contents($file, implode(PHP_EOL, $updated));
  echo "success";
} else {
  echo "invalid request";
}
?>