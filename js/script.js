const roleta = document.getElementById("roleta");
const botaoParar = document.getElementById("botaoParar");
const circuloParar = document.getElementById("circuloParar");
const premioImagem = document.getElementById("premioImagem");

let anguloAtual = 0;
let girando = true;
let velocidade = 10; // Velocidade inicial alta
let desacelerando = false;

function girarRoleta() {
    if (girando) {
        anguloAtual += velocidade;
        roleta.style.transform = `rotate(${anguloAtual}deg)`;

        if (desacelerando) {
            // Desaceleração exponencial
            velocidade *= 0.97; // Reduz a velocidade exponencialmente

            // Verifica se a roleta está suficientemente desacelerada para parar
            if (velocidade < 0.2) {
                girando = false;
                pararNaSecao();
            }
        }

        requestAnimationFrame(girarRoleta);
    }
}

function pararRoleta() {
    desacelerando = true;
    botaoParar.disabled = true;
    circuloParar.removeEventListener("click", pararRoleta);
}

function pararNaSecao() {
    const grausPorSecao = 90;
    const secaoMais1Angulo = 230; // Posição da seção "secaoMais1"
    
    // Calcular a quantidade de rotação necessária para parar exatamente na seção desejada
    let ajuste = (secaoMais1Angulo - (anguloAtual % 360)) % 360;
    if (ajuste < 0) ajuste += 360;

    // Adicionar rotação para suavizar o ajuste final
    const anguloFinal = anguloAtual + ajuste + grausPorSecao * 3; // Três voltas para garantir desaceleração
    roleta.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
    roleta.style.transform = `rotate(${anguloFinal}deg)`;
    
    // Após a transição, exibir o prêmio
    setTimeout(ganharPremio, 4000);
}
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

