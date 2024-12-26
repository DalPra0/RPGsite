const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');
const emailIcon = document.querySelector('.desktop-icon');
const emailWindow = document.getElementById('email-window');
const closeButton = emailWindow.querySelector('.close-button');
const datetimeDisplay = document.getElementById('time');
const audioPlayer = document.getElementById('audio-player');
const receivedAudioTab = document.querySelector('.sub-tab[data-sub-tab="4"]'); // "Recebido com áudio"
const receivedAudioContent = document.getElementById('received-4');

let isDragging = false;
let offsetX, offsetY;

function updateDatetime() {
    const now = new Date();
    datetimeDisplay.textContent = now.toLocaleTimeString();
}
setInterval(updateDatetime, 1000);
updateDatetime();

startButton.addEventListener('click', () => {
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
});

emailIcon.addEventListener('click', () => {
    emailWindow.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    emailWindow.style.display = 'none';
});

const mainTabs = document.querySelectorAll('.main-tab');
const subTabs = document.querySelectorAll('.sub-tab');

mainTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        mainTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

subTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const parent = tab.closest('.tab-content');
        parent.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        parent.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        parent.querySelector(`#${parent.id}-${tab.dataset.subTab}`).classList.add('active');
    });
});

// Solicitar senha ao abrir "Recebido com áudio"
receivedAudioTab.addEventListener('click', () => {
    const password = prompt("Digite a senha para acessar este email:");
    
    if (password === "06934") {
        receivedAudioContent.style.display = 'block';
    } else if (password === null) {
        alert("Senha incorreta ou cancelada! Fechando a página.");
        // Fecha a janela (funciona apenas se for aberta via script)
        window.open('', '_self'); // Necessário para navegadores modernos
        window.close();
    }
});

// Função para permitir arrastar a janela
emailWindow.querySelector('.window-header').addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - emailWindow.offsetLeft;
    offsetY = e.clientY - emailWindow.offsetTop;
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        emailWindow.style.left = `${e.clientX - offsetX}px`;
        emailWindow.style.top = `${e.clientY - offsetY}px`;
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// Reproduzir vídeo ao finalizar o áudio
audioPlayer.addEventListener('ended', () => {
    const video = document.createElement('video');
    video.src = 'jumpscare.mp4';
    video.style.position = 'fixed';
    video.style.top = 0;
    video.style.left = 0;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.zIndex = 9999; // Garantir que o vídeo esteja acima de tudo
    video.autoplay = true;
    video.controls = false;
    video.addEventListener('ended', () => {
        video.remove();
    });
    document.body.appendChild(video);
});

// Reproduzir vídeo ao pausar o áudio
audioPlayer.addEventListener('pause', () => {
    if (!audioPlayer.ended) {
        const video = document.createElement('video');
        video.src = 'jumpscare.mp4';
        video.style.position = 'fixed';
        video.style.top = 0;
        video.style.left = 0;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.zIndex = 9999; // Garantir que o vídeo esteja acima de tudo
        video.autoplay = true;
        video.controls = false;
        video.addEventListener('ended', () => {
            video.remove();
        });
        document.body.appendChild(video);
    }
});
