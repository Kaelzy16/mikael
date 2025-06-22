<script>
  // Pastikan pengguna login
  const currentUser = localStorage.getItem("currentUser");
  if (!localStorage.getItem("loggedIn") || !currentUser) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
  }

  const usernameDisplay = document.getElementById("usernameDisplay");
  const usernameInput = document.getElementById("usernameInput");
  const profileImage = document.getElementById("profileImage");

  // Ambil profil dari users.txt
  fetch("users.txt")
    .then(res => res.text())
    .then(text => {
      const lines = text.trim().split("\n");
      const user = lines.map(line => {
        const [username, password, name, photo] = line.trim().split("|");
        return { username, password, name, photo };
      }).find(u => u.username === currentUser);

      if (!user) {
        alert("Akun tidak ditemukan di users.txt");
        window.location.href = "login.html";
        return;
      }

      usernameDisplay.textContent = user.name;
      usernameInput.value = user.name;
      profileImage.src = user.photo || "https://via.placeholder.com/100?text=Foto";
    })
    .catch(err => {
      console.error("Gagal membaca users.txt", err);
      alert("Gagal memuat data akun.");
    });

  function enableEdit() {
    usernameDisplay.style.display = "none";
    usernameInput.style.display = "inline-block";
    document.getElementById("photoLabel").style.display = "block";
    document.getElementById("editButton").style.display = "none";
    document.getElementById("saveButton").style.display = "inline-block";
  }

  function saveProfile() {
    alert("Data profil diambil dari users.txt dan tidak bisa disimpan lokal.");
    // Jika ingin edit dan simpan ke localStorage, harus ubah strategi (atau kirim ke server)
  }

  function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
</script>