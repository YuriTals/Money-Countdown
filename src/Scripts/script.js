// Captura o evento `beforeinstallprompt`
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir o comportamento padrão
    e.preventDefault();

    // Salvar o evento para disparar o prompt mais tarde
    deferredPrompt = e;

    // Exibir o pop-up
    showInstallPrompt();
});

// Função para exibir o pop-up de instalação
function showInstallPrompt() {
    // Criar o overlay (fundo desfocado)
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fundo escuro semi-transparente
    overlay.style.backdropFilter = 'blur(5px)'; // Desfocar o fundo
    overlay.style.zIndex = '999'; // Colocar acima do conteúdo

    // Criar o pop-up
    const installPrompt = document.createElement('div');
    installPrompt.style.position = 'absolute';
    installPrompt.style.top = '50%';
    installPrompt.style.left = '50%';
    installPrompt.style.transform = 'translate(-50%, -50%)'; // Centralizar
    installPrompt.style.padding = '20px';
    installPrompt.style.backgroundColor = '#333';
    installPrompt.style.color = '#fff';
    installPrompt.style.borderRadius = '10px';
    installPrompt.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
    installPrompt.style.zIndex = '1000'; // Garantir que o pop-up esteja acima do overlay
    installPrompt.style.textAlign = 'center'; // Centralizar o texto e os botões
    installPrompt.innerHTML = `
        <p>Você deseja adicionar esse site à sua área de trabalho?</p>
        <div style="display: flex; justify-content: center; gap: 15px; margin-top: 15px;">
            <button id="installButton" style="padding: 10px 20px; background-color: #4CAF50; border: none; color: white; border-radius: 5px; cursor: pointer; font-size: 16px;">Adicionar</button>
            <button id="dismissButton" style="padding: 10px 20px; background-color: #f44336; border: none; color: white; border-radius: 5px; cursor: pointer; font-size: 16px;">Fechar</button>
        </div>
    `;

    // Adicionar o overlay e o pop-up ao corpo da página
    document.body.appendChild(overlay);
    document.body.appendChild(installPrompt);

    // Ação ao clicar em "Adicionar"
    document.getElementById('installButton').addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuário aceitou a instalação');
            } else {
                console.log('Usuário recusou a instalação');
            }
        });
        overlay.remove();  // Remover o overlay
        installPrompt.remove(); // Remover o pop-up
    });

    // Ação ao clicar em "Fechar"
    document.getElementById('dismissButton').addEventListener('click', () => {
        overlay.remove();  // Remover o overlay
        installPrompt.remove(); // Remover o pop-up
    });

    // Fechar o pop-up automaticamente após 30 segundos
    setTimeout(() => {
        overlay.remove();
        installPrompt.remove();
    }, 30000); // 30 segundos
}

// Define as datas finais para os contadores com as horas específicas
const targetDate1 = new Date('2025-05-30T07:00:00'); // 30 de maio de 2025, 07h
const targetDate2 = new Date('2025-09-30T07:00:00'); // 30 de setembro de 2025, 07h

// Função para iniciar a contagem regressiva para o contador 1
function startCountdown1() {
    const interval1 = setInterval(function() {
        const now = new Date();
        const timeRemaining = targetDate1 - now;

        if (timeRemaining <= 0) {
            clearInterval(interval1);
            document.getElementById('daysRemaining1').innerText = "00 dias";
            document.getElementById('timeRemaining1').innerText = "0000:00:00 horas";
        } else {
            // Calcular o total de horas restantes
            const totalHours = Math.floor(timeRemaining / (1000 * 60 * 60)); // Total de horas
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)); // Minutos restantes
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000); // Segundos restantes

            // Exibir no formato "0000:00:00"
            document.getElementById('daysRemaining1').innerText = `${Math.floor(totalHours / 24)} dias`; // Exibe os dias
            document.getElementById('timeRemaining1').innerText = `${String(totalHours).padStart(4, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} horas`; // Exibe "0000:00:00"
        }
    }, 1000);
}

// Função para iniciar a contagem regressiva para o contador 2
function startCountdown2() {
    const interval2 = setInterval(function() {
        const now = new Date();
        const timeRemaining = targetDate2 - now;

        if (timeRemaining <= 0) {
            clearInterval(interval2);
            document.getElementById('daysRemaining2').innerText = "00 dias";
            document.getElementById('timeRemaining2').innerText = "0000:00:00 horas";
        } else {
            // Calcular o total de horas restantes
            const totalHours = Math.floor(timeRemaining / (1000 * 60 * 60)); // Total de horas
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)); // Minutos restantes
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000); // Segundos restantes

            // Exibir no formato "0000:00:00"
            document.getElementById('daysRemaining2').innerText = `${Math.floor(totalHours / 24)} dias`; // Exibe os dias
            document.getElementById('timeRemaining2').innerText = `${String(totalHours).padStart(4, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} horas`; // Exibe "0000:00:00"
        }
    }, 1000);
}

// Definir as datas predefinidas no input (caso o usuário não altere)
document.getElementById('dateInput1').value = targetDate1.toISOString().slice(0, 16);
document.getElementById('dateInput2').value = targetDate2.toISOString().slice(0, 16);

// Iniciar as contagens imediatamente
startCountdown1();
startCountdown2();

// Ouvir mudanças nos campos de data
document.getElementById('dateInput1').addEventListener('change', function() {
    const newTargetDate1 = new Date(document.getElementById('dateInput1').value);
    targetDate1.setTime(newTargetDate1.getTime());
    startCountdown1();
});

document.getElementById('dateInput2').addEventListener('change', function() {
    const newTargetDate2 = new Date(document.getElementById('dateInput2').value);
    targetDate2.setTime(newTargetDate2.getTime());
    startCountdown2();
});

// Registrar o Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Log the full path to the manifest
        console.log('Manifest full path:', new URL('/src/Scripts/manifest.json', window.location.origin).href);
        
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('Service Worker registrado com sucesso:', registration);
                console.log('Service Worker Scope:', registration.scope);
            })
            .catch(function(error) {
                console.error('Erro ao registrar o Service Worker:', error);
            });
    });
}