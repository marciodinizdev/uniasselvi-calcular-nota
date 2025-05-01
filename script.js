// Selecionar elementos do modal
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close-modal');

// Função para abrir o modal
function openModal(content) {
    modalContent.innerHTML = content;
    modalOverlay.classList.add('active');
}

// Função para fechar o modal
function closeModalFunc() {
    modalOverlay.classList.remove('active');
}

// Event listeners para fechar o modal
closeModal.addEventListener('click', closeModalFunc);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModalFunc();
    }
});

// Fechar com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModalFunc();
    }
});

// Cálculo da nota
document.querySelector('.calcular').addEventListener('click', function() {
    const nota1 = parseFloat(document.getElementById('nota1').value) || 0;
    const nota2 = parseFloat(document.getElementById('nota2').value) || 0;
    const nota3 = parseFloat(document.getElementById('nota3').value) || 0;
    const mediaDesejada = parseFloat(document.querySelector('.nota-desejada input').value) || 7.0;
    const fezAtividade = document.querySelector('.switch input').checked;
    
    const pontosNecessarios = (mediaDesejada - (fezAtividade ? 0.5 : 0)) * 10;
    const somaNotasAtuais = (nota1 * 2) + (nota2 * 2) + (nota3 * 2);
    const nota4Necessaria = (pontosNecessarios - somaNotasAtuais) / 4;
    
    let modalHTML;
    
    if (nota4Necessaria <= 10) {
        modalHTML = `
            <h3>Resultado:</h3>
            <p>Para atingir a média <strong>${mediaDesejada.toFixed(2)}</strong>:</p>
            <p>Você precisa de <strong>${nota4Necessaria.toFixed(2)}</strong> na <u>prova presencial</u></p>
            <p>${fezAtividade ? '✅ Com bônus de 0.5 da atividade' : '❌ Sem bônus da atividade'}</p>
        `;
    } else {
        const mediaMaxima = ((nota1*2 + nota2*2 + nota3*2 + 10*4) / 10 + (fezAtividade ? 0.5 : 0)).toFixed(2);
        modalHTML = `
            <h3>Resultado:</h3>
            <p class="error">😬 <strong>Impossível atingir ${mediaDesejada.toFixed(2)}</strong></p>
            <p>Mesmo tirando 10 na <u>prova presencial</u>, sua média seria ${mediaMaxima}</p>
        `;
    }
    
    openModal(modalHTML);
});