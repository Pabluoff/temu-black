const roleta = document.getElementById("roleta");
const botaoParar = document.getElementById("botaoParar");
const circuloParar = document.getElementById("circuloParar");
const premioImagem = document.getElementById("premioImagem");

let anguloAtual = 0;
let girando = true;
let velocidade = 6; // Velocidade inicial
let desacelerando = false;
let alvoFinal = 0;
let roletaGirando = null; // Para armazenar o requestAnimationFrame

function girarRoleta() {
    if (girando) {
        // Calcula o novo ângulo baseado na velocidade atual
        anguloAtual += velocidade;
        roleta.style.transform = `rotate(${anguloAtual}deg)`;

        // Se a roleta está desacelerando, diminuir a velocidade gradualmente
        if (desacelerando) {
            velocidade *= 0.98; // Desaceleração suave

            if (velocidade <= 0.2) { // Limite mínimo de velocidade para parar suavemente
                velocidade = 0.2;
            }

            // Verifica se a roleta deve parar no alvo final
            if (Math.abs(anguloAtual - alvoFinal) < 0.5 && velocidade <= 0.5) {
                girando = false;
                roleta.style.transform = `rotate(${alvoFinal}deg)`; // Corrige o ângulo final para evitar saltos
                setTimeout(ganharPremio, 1000); // Exibe o prêmio após a roleta parar
            }
        }

        // Continua girando se a roleta ainda estiver ativa
        roletaGirando = requestAnimationFrame(girarRoleta);
    }
}

function pararRoleta() {
    desacelerando = true;
    botaoParar.disabled = true;
    circuloParar.removeEventListener("click", pararRoleta);

    // Calcula o alvo final baseado na seção desejada
    const secaoDesejada = 150; // Ângulo da seção "secaoMais1"
    const voltasExtras = 720; // Voltas extras (720° = 2 voltas) para desaceleração prolongada
    const ajusteFinal = (secaoDesejada - (anguloAtual % 360)) % 360;

    // Define o alvo final como o ângulo atual + ajuste + voltas extras
    alvoFinal = anguloAtual + ajusteFinal + voltasExtras;
}

function ganharPremio() {
    // Lógica para exibir o prêmio
    premioImagem.style.display = "block";
    premioImagem.classList.add("animacao-premio");
}

// Evento de clique para parar a roleta
circuloParar.addEventListener("click", pararRoleta);
botaoParar.addEventListener("click", pararRoleta);

// Inicializa o giro contínuo
roletaGirando = requestAnimationFrame(girarRoleta);

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

