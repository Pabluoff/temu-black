const roleta = document.getElementById("roleta");
const botaoParar = document.getElementById("botaoParar");
const circuloParar = document.getElementById("circuloParar");
const premioImagem = document.getElementById("premioImagem");

let anguloAtual = 0;
let girando = true;
let velocidade = 10; // Velocidade inicial mais baixa
let desacelerando = false;
let alvoFinal = 0;

function girarRoleta() {
    if (girando) {
        anguloAtual += velocidade;
        roleta.style.transform = `rotate(${anguloAtual}deg)`;

        if (desacelerando) {
            // Desaceleração suave e lenta
            velocidade -= 0.05; // Reduz a velocidade de forma ainda mais gradual

            if (velocidade <= 0.1) {
                velocidade = 0.1; // Limite de velocidade mínima para um efeito suave
            }

            // Verifica se a roleta deve parar no alvo
            if (anguloAtual >= alvoFinal) {
                girando = false;
                roleta.style.transform = `rotate(${alvoFinal}deg)`;
                setTimeout(ganharPremio, 1000); // Exibe o prêmio com um pequeno atraso
            }
        }

        requestAnimationFrame(girarRoleta);
    }
}

function pararRoleta() {
    desacelerando = true;
    botaoParar.disabled = true;
    circuloParar.removeEventListener("click", pararRoleta);

    // Calcula o alvo final baseado na seção desejada
    const secaoDesejada = 150; // Ângulo da seção "secaoMais1"
    const voltasExtras = 1080; // Mais voltas extras (1440° = 4 voltas) para desaceleração mais longa
    const ajusteFinal = (secaoDesejada - (anguloAtual % 360)) % 360;
    alvoFinal = anguloAtual + ajusteFinal + voltasExtras;
}

function ganharPremio() {
    // Lógica para exibir o prêmio
    premioImagem.style.display = "block";
}

// Inicializa o giro contínuo
requestAnimationFrame(girarRoleta);

// Evento de clique para parar a roleta
circuloParar.addEventListener("click", pararRoleta);
function criarConfetti() {
    const confettiContainer = document.getElementById("confetti");
    const cores = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500"];
    const quantidade = 60;

    for (let i = 0; i < quantidade; i++) {
        const confettiPiece = document.createElement("div");
        confettiPiece.classList.add("confetti-piece");
        confettiPiece.style.left = `${Math.random() * 100}vw`;
        confettiPiece.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confettiPiece.style.animationDelay = `${Math.random() * 3}s`;
        confettiContainer.appendChild(confettiPiece);
    }
}

function ganharPremio() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block"; // Mostrar o overlay
    premioImagem.style.display = "block";
    premioImagem.classList.add("animacao-premio");

    const melhorPremioTexto = document.getElementById("melhorPremioTexto");
    melhorPremioTexto.style.display = "block"; // Exibir o texto "Obteve o melhor prêmio!"

    const btnResgatar = document.getElementById("btnResgatar");
    btnResgatar.style.display = "block"; // Exibir o botão de resgatar prêmios

    const maoImagem = document.getElementById("maoImagem");
    maoImagem.style.display = "block"; // Exibir a imagem da mão

    criarConfetti(); // Adicionar confetes quando o prêmio for mostrado
}

botaoParar.addEventListener("click", pararRoleta);
circuloParar.addEventListener("click", pararRoleta);

girarRoleta();

document.body.classList.add('loading');

window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
    document.body.classList.remove('loading');
});

