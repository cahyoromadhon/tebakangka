/* Menghasilkan Angka Acak antara 1 - 100 */
let randomNumber = Math.floor(Math.random() * 100) + 1;
//math.random() digunakan untuk mengacak angka desimal 0-1
//math.random() * 100 membuat hasil random menjadi 0-99.999
//math.floor() bertugas membulatkan kebawah misalnya: 99.8 menjadi 99
//math.floor() +1 membuat angka yang dihasilkan setelah pembulatan menjadi antara 1-100

/* Menyimpan Variabel yang nantinya akan diubah Nilainya */
let points = 0; // Variabel untuk menyimpan poin user
let attempts = 0; // Variabel untuk menyimpan jumlah percobaan yang telah dilakukan user
let selectedLevel = ''; // Variabel untuk menyimpan level yang dipilih

/* Menangkap Elemen Id dan Class pada HTML menggunakan DOM */
const playerNameInput = document.getElementById('playerName');  // Nama Player
const startButton = document.getElementById('startButton');  // Tombol Mulai
const startScreen = document.getElementById('startScreen'); // Layar Nama
const levelScreen = document.getElementById('levelScreen'); // Layar level
const gameScreen = document.getElementById('gameScreen'); // Layar Utama Game Tebak Angka
const welcomeMessage = document.getElementById('welcomeMessage'); // Kalimat Penyambut (diatas)
const guessInput = document.getElementById('guess'); // Kolom untuk Menebak
const checkButton = document.getElementById('checkButton'); // Tombol Cek
const message = document.getElementById('message'); // Pesan Apakah tebakan Tinggi or Rendah
const pointsDisplay = document.getElementById('points'); // Total Point Player
const restartButton = document.getElementById('restartButton'); // Tombol Main Lagi
const levelButtons = document.querySelectorAll('.levelButton'); // Tombol level

/* Fungsi Tombol untuk memulai permainan */
startButton.addEventListener('click', () => {
  const playerName = playerNameInput.value.trim();
  /* Validasi Nama Player */
  if (playerName === '') {
    alert('Masukkan nama Anda terlebih dahulu!');
    return;
  }
  // startButton adalah Variabel dari Tombol Mulai
  // startButton.addEventListener('click') Menambahkan Event Click pada Tombol
  // () => { ... } adalah sebuah Arrow Function yang merupakan bentuk dari Penyederhanaan function() { ... }
  // Membuat Variabel baru bernama playerName
  // playerNameInput adalah Variabel yang telah dibuat diatas untuk menyimpan data dari Nama yang telah di inputkan
  // value Berguna untuk mengambil teks yang dimasukkan Player
  // trim() Berguna untuk menghapus spasi pada teks yang awalnya mungkin " Budi " menjadi "Budi"
  // jadi playerNameInput.value.trim(); Berguna untuk mengambil Teks yang di input player dan dihapus kesalahannya apabila ada
  // if (playerName === '') {alert('Masukkan nama Anda terlebih dahulu!)}; Jika player tidak menginput nama nya maka munculkan alert
  // return; digunakan untuk menghentian eksekusi fungsi jika kondisi ini terpenuhi

  /* Tampilkan layar pemilihan level */
  startScreen.classList.add('hidden');
  levelScreen.classList.remove('hidden');
});
// classList adalah sebuah Properti pada DOM yang digunakan untuk memanipulasi class pada HTML
// classList.add dan classList.remove adalah sebuah metode yang ada pada properti tersebut
// statement diatas berfungsi untuk menyembunyikan startScreen dan menampilkan levelScreen

/* Fungsi untuk memilih level */
levelButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedLevel = button.getAttribute('data-level'); // Simpan level yang dipilih
    if (selectedLevel === 'sulit') {
      points = 5; // Poin untuk level Sulit
    } else if (selectedLevel === 'sedang') {
      points = 10; // Poin untuk level Sedang
    }
    // Variabel levelButtons adalah sekumpulan Class yang diambil menggunakan querySelectorAll diatas
    // 'for each' memiliki arti 'untuk masing-masing'
    // forEach adalah sebuah metode yang dimana kita cukup menulis logika sekali dan dapat diimplementasikan pada kedua tombol sekaligus
    // button.addEventListener('click', () => {...}); menambahkan event click pada tombol
    // selectedLevel adalah sebuah variabel yang menyimpan nilai dari level yang telah dipilih player
    // if (selectedLevel === 'sulit') jika level yang dipilih sulit maka beri poin 5
    // else if (selectedLevel === 'sedang') jika level yang dipilih sedang maka beri poin 10

    // Tampilkan layar permainan
    levelScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    welcomeMessage.textContent = `Halo ${playerNameInput.value}! Anda memilih level ${selectedLevel}. Selamat bermain!`;
    resetGame();
  });
});
// sembunyikan layar level
// tampilkan layar utama game tebak angka
// welcomeMessage adalah variabel yang telah ditangkap menggunakan getELementById
// lalu berhubung <p> dalam HTML kosong maka digantikan properti Javascript yaitu .textContent untuk menggantikan teks pada HTML
// (``) merupakan sebuah cara agar variabel/ekspresi dalam javascript menggunakan ${..} agar dapat masuk kedalam string
// ${playerNameInput.value} mengapa harus ada properti .value? karena jika hanya menggunakan playerNameInput maka yang ditampilkan adalah nilai yang disimpan oleh playerNameInput itu sendiri bukan nilai sebenarnya yang di Input
//// Misalnya: `Halo ${playerNameInput}` => Halo <input type="text" id="playerName" placeholder="Nama Anda">
//// Misalnya: `Halo ${playerNameInput.value}` => Halo Cahyo
// properti .value hanya digunakan untuk nilai input saja
// ${selectedLevel} tidak menggunakan properti .value karena string sudah disediakan sedangkan jika kasus diatas mengikuti nilai input yang dimasukkan oleh player yahh kira2 begitulahh
// fungsi resetGame() dijalankan untuk mereset permainan, function dapat dilihat dibawah

/* Fungsi untuk mengecek agar input tetap berada antara 1-100 */
checkButton.addEventListener('click', () => {
  const userGuess = Number(guessInput.value);

  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    message.textContent = 'Masukkan angka antara 1 dan 100!';
    triggerShakeEffect(); // Tambahkan efek getar
    message.style.color = 'red';
    return;
  }
  // tombol cek diberikan event click
  // variabel baru dibuat dengan menambahkan fungsi Number() agar tebakan diubah awalnya string menjadi Integer
  // guessInput.value adalah sebuah variabel menyimpan angka hasil tebakan player yang telah diambil menggunakan properti value
  // jika player menebak dibawah 1 atau diatas 1000 atau bahkan bukan angka maka tampilkan message.textContent
  // function dari triggerShakeEffect bisa dilihat dibaris paling bawah
  // message.style.color memungkinkan javascript untuk menggunakan properti CSS namun harus disertai dengan .style lalu color adalah properti dari CSS itu sendiri
  // return; berguna untuk mengehentikan fungsi apabila kondisi tersebut terpenuhi yahh singkatnya itu enter

  attempts++; // sama dengan:  attempts = attempts + 1;
  points--; // sama dengan: points = points - 1;

  if (userGuess < randomNumber) {
    message.textContent = 'Terlalu rendah! Coba lagi.';
    triggerShakeEffect(); // Tambahkan efek getar
    message.style.color = 'red';
  } else if (userGuess > randomNumber) {
    message.textContent = 'Terlalu tinggi! Coba lagi.';
    triggerShakeEffect(); // Tambahkan efek getar
    message.style.color = 'red';
  } else {
    message.textContent = `Selamat! Anda berhasil menebak angka ${randomNumber} dengan benar dalam ${attempts}x percobaan.`;
    message.style.color = 'green';
    checkButton.disabled = true;
    restartButton.classList.remove('hidden');
  }
  // jika player menebak dibawah randomNumber maka tampilkan message.textContent dan jalankan triggerShakeEffect()
  // jika player menebak diatas randomNumber maka tampilkan message.textContent dan jalankan triggerShakeEffect()
  // jika kedua kondisi diatas tidak terjadi maka tampilkan message.textContent dengan style.color green
  // checkButton.disabled adalah sebuah properti Javascript yaitu Boolean yang bernilai true atau false
  // restartButton.classList.remove('hidden') lalu munculkan tombol restart dengan melepas class hidden

  pointsDisplay.textContent = points;
  // panggil pointsDisplay lalu tampilkan points saat ini dengan menggunakan properti .textContent

  /* Periksa apakah poin habis */
  if (points <= 0) {
    message.textContent = 'Sayang sekali, poin Anda habis! Permainan berakhir.';
    message.style.color = 'red';
    checkButton.disabled = true;
    restartButton.classList.remove('hidden');
  }
  // Jika point saat ini kurang dari sama dengan 0 maka tampilkan message.textContent dengan style color lalu nonaktifkan tombol cek serta munculkan tombol restart

  guessInput.value = ''; // Reset input
  // mengosongkan nilai input dengan menggunakan properti .value dan string kosong sebagai cara untuk pengosongannya
});

/* Fungsi untuk memulai ulang permainan */
restartButton.addEventListener('click', resetGame);
// tombol restart diberikan event click dan function resetGame ditambahkan untuk mereset permainan
// Function resetGame dapat dilihat dibawah

/* Fungsi untuk mereset permainan */
function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  // Buat randomNumber baru menggunakan math.floor() dan math.random() untuk membuatnya, penjelasan dapat dilihat paling atas
  // buat attempts atau percobaan menjadi kembali 0

  /* Reset poin berdasarkan level yang dipilih */
  if (selectedLevel === 'sulit') {
    points = 5;
  } else if (selectedLevel === 'sedang') {
    points = 10;
  }
  // apabila level yang dipilih sulit maka tampilkan point 5
  // apabila level yang dipilih sedang maka tampilkan point 10

  pointsDisplay.textContent = points;
  message.textContent = '';
  guessInput.value = '';
  checkButton.disabled = false;
  restartButton.classList.add('hidden');
  // tampilkan point yang sebelumnya sudah dipilih berdasarkan levelnya
  // membersihkan pesan dengan cara mengosongi string
  // kosongkan nilai input dengan mengosongkan string
  // aktifkan tombol cek
  // sembunyikan tombol restart
}

// Fungsi untuk menambahkan efek getar
function triggerShakeEffect() {
  message.classList.add('shake');
  setTimeout(() => {
    message.classList.remove('shake');
  }, 300);
}
// buat fungsi baru bernama triggerShakeEffect() {...}
// message adalah variabel yang telah didefinisikan dengan cara mengambilnya dari HTML menggunakan DOM
// classList adalah sebuah Properti pada DOM yang digunakan untuk memanipulasi class pada HTML
// jadi class bernama shake ini telah memicu efek animasi yang telah didefinisikan di file CSS
// setTimeOut adalah sebuah fungsi pada javascript untuk menjalankan kode setelah jeda waktu yang telah ditentukan
// 300 adalah waktu yang telah ditentukan dan perhitungannya dalam satuan ms (milisecond)
// 300ms setara dengan 0.3s
// () => {...} merupakan arrow function untuk menjalankan logika apabila 300ms telah dijalankan
// jadi setTimOut diset ke 300ms ketika logika arrow function telah berhasil dijalankan
// logika yang ada didalam arrow function itu berfungsi untuk menghapus class shake dari variabel message
// dan menghasilkan animasi shake yang berjalan selama 0.3s lalu dihapus setelah waktu habis/selesai.