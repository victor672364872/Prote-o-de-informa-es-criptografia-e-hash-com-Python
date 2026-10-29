// --- FUNDO ANIMADO (MATRIX DIGITAL RAIN) ---
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZdefhashcryptpython#_$%&*';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(13, 17, 23, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff66';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 40);

// --- DEMONSTRADOR DE HASH (SHA-256) ---
async function calculateHash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const hashInput = document.getElementById('hashInput');
const hashOutput = document.getElementById('hashOutput');

async function updateHash() {
  const text = hashInput.value;
  if (!text) {
    hashOutput.innerText = '-- AGUARDANDO ENTRADA --';
    return;
  }
  const hash = await calculateHash(text);
  hashOutput.innerText = hash;
}

hashInput.addEventListener('input', updateHash);
updateHash();

// --- DEMONSTRADOR DE CRIPTOGRAFIA ---
const cryptoInput = document.getElementById('cryptoInput');
const cryptoEncrypted = document.getElementById('cryptoEncrypted');
const cryptoDecrypted = document.getElementById('cryptoDecrypted');

function updateCrypto() {
  const text = cryptoInput.value;
  if (!text) {
    cryptoEncrypted.innerText = '-- AGUARDANDO ENTRADA --';
    cryptoDecrypted.innerText = '-- AGUARDANDO ENTRADA --';
    return;
  }

  const encoded = btoa(unescape(encodeURIComponent(text)));
  const fakeFernetToken = `gAAAAABk${encoded}==`;

  cryptoEncrypted.innerText = fakeFernetToken;
  cryptoDecrypted.innerText = text;
}

cryptoInput.addEventListener('input', updateCrypto);
updateCrypto();