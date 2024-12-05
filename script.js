let randomNumber = Math.floor(Math.random() * 100) + 1; // Angka acak antara 1-100
let points = 0;
let attempts = 0;

const playerNameInput = document.getElementById('playerName');
const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startScreen');
const levelScreen = document.getElementById('levelScreen'); // Layar level
const gameScreen = document.getElementById('gameScreen');
const welcomeMessage = document.getElementById('welcomeMessage');
const guessInput = document.getElementById('guess');
const checkButton = document.getElementById('checkButton');
const message = document.getElementById('message');
const pointsDisplay = document.getElementById('points');
const restartButton = document.getElementById('restartButton');
const levelButtons = document.querySelectorAll('.levelButton'); // Tombol level

// Fungsi untuk memulai permainan
startButton.addEventListener('click', () => {
  const playerName = playerNameInput.value.trim();
  if (playerName === '') {
    alert('Masukkan nama Anda terlebih dahulu!');
    return;
  }

  // Tampilkan layar pemilihan level
  startScreen.classList.add('hidden');
  levelScreen.classList.remove('hidden');
});

// Fungsi untuk memilih level
levelButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const level = button.getAttribute('data-level');
    if (level === 'sulit') {
      points = 5; // Poin untuk level Sulit
    } else if (level === 'sedang') {
      points = 10; // Poin untuk level Sedang
    }

    // Tampilkan layar permainan
    levelScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    welcomeMessage.textContent = `Halo ${playerNameInput.value}! Anda memilih level ${level}. Selamat bermain!`;
    resetGame();
  });
});

// Fungsi untuk mengecek tebakan
checkButton.addEventListener('click', () => {
  const userGuess = Number(guessInput.value);

  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    message.textContent = 'Masukkan angka antara 1 dan 100!';
    triggerShakeEffect(); // Tambahkan efek getar
    message.style.color = 'red';
    return;
  }

  attempts++;
  points--;

  if (userGuess < randomNumber) {
    message.textContent = 'Terlalu rendah! Coba lagi.';
    triggerShakeEffect(); // Tambahkan efek getar
    message.style.color = 'red';
  } else if (userGuess > randomNumber) {
    message.textContent = 'Terlalu tinggi! Coba lagi.';
    triggerShakeEffect(); // Tambahkan efek getar
    message.style.color = 'red';
  } else {
    message.textContent = `Selamat! Anda berhasil menebak angka ${randomNumber} dengan benar dalam ${attempts}x percobaan`;
    message.style.color = 'green';
    checkButton.disabled = true;
    restartButton.classList.remove('hidden');
  }

  pointsDisplay.textContent = points;

  // Periksa apakah poin habis
  if (points <= 0) {
    message.textContent = 'Sayang sekali, poin Anda habis! Permainan berakhir.';
    message.style.color = 'red';
    checkButton.disabled = true;
    restartButton.classList.remove('hidden');
  }

  guessInput.value = ''; // Reset input
});

// Fungsi untuk memulai ulang permainan
restartButton.addEventListener('click', resetGame);

// Fungsi untuk mereset permainan
function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  pointsDisplay.textContent = points;
  message.textContent = '';
  guessInput.value = '';
  checkButton.disabled = false;
  restartButton.classList.add('hidden');
}

// Fungsi untuk menambahkan efek getar
function triggerShakeEffect() {
  message.classList.add('shake');
  setTimeout(() => {
    message.classList.remove('shake');
  }, 300);
}
