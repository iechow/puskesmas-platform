alert("ADMIN JS HIDUP")
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  alert("Login ditekan");
});

async function login() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert("Login gagal: " + error.message)
  } else {
    alert("Login berhasil")
  }
}

async function kirim() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert("Silakan login dulu")
    return
  }

  const judul = document.getElementById("judul").value
  const tanggal = document.getElementById("tanggal").value
  const lokasi = document.getElementById("lokasi").value
  const deskripsi = document.getElementById("deskripsi").value
  const foto = document.getElementById("foto").value

  const { error } = await supabase.from("kegiatan").insert([{
    judul,
    tanggal,
    lokasi,
    deskripsi,
    foto_url: foto
  }])

  if (error) {
    alert("Gagal simpan: " + error.message)
  } else {
    alert("Data berhasil masuk ke Supabase")
  }
}