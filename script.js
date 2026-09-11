document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. DICA SUSTENTÁVEL DO DIA (ROTATIVA)
    // ==========================================
    const dicasSustentaveis = [
        "Utilize uma garrafa reutilizável para reduzir o uso de plástico.",
        "Desligue os aparelhos da tomada quando não estiverem em uso para evitar o consumo fantasma.",
        "Dê preferência a produtos locais e de feiras de produtores da sua região.",
        "Reduza o tempo do banho em apenas 2 minutos para economizar centenas de litros de água por mês.",
        "Substitua sacolas plásticas por ecobags reutilizáveis em suas compras.",
        "Aproveite talos e cascas de legumes em novas receitas para evitar o desperdício de alimentos."
    ];

    const dicaContainer = document.querySelector('.dica-sustentavel'); // Ajuste o seletor conforme seu HTML
    const btnNovaDica = document.querySelector('.nova-dica-btn'); // Botão "Nova dica ↻"

    if (btnNovaDica) {
        btnNovaDica.addEventListener('click', (e) => {
            e.preventDefault();
            const randomIndex = Math.floor(Math.random() * dicasSustentaveis.length);
            // Procura o texto da dica dentro do bloco ou atualiza o elemento correspondente
            const textoDica = document.querySelector('.dica-texto') || btnNovaDica.previousElementSibling;
            if (textoDica) {
                textoDica.textContent = dicasSustentaveis[randomIndex];
            }
        });
    }

    // ==========================================
    // 2. CALCULADORA / QUIZ SUSTENTÁVEL
    // ==========================================
    const quizOptions = document.querySelectorAll('.quiz-option-btn');
    let pontosUsuario = 0;
    let perguntaAtual = 1;
    const totalPerguntas = 5;

    quizOptions.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove a seleção anterior da mesma pergunta
            const parentContainer = btn.parentElement;
            parentContainer.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
            
            // Marca a atual como selecionada
            btn.classList.add('selected');
            
            // Atribui pontos baseados na escolha (exemplo de lógica interna)
            // Você pode customizar os pesos conforme o atributo/dados do botão
            const valorPontual = parseInt(btn.dataset.points) || 10;
            pontosUsuario += valorPontual;

            // Simula avanço automático de pergunta após 400ms
            setTimeout(() => {
                avancarPergunta();
            }, 400);
        });
    });

    function avancarPergunta() {
        if (perguntaAtual < totalPerguntas) {
            perguntaAtual++;
            atualizarProgressoQuiz();
        } else {
            exibirResultadoQuiz();
        }
    }

    function atualizarProgressoQuiz() {
        const barraProgresso = document.querySelector('.quiz-progress-bar');
        const tituloPergunta = document.querySelector('.quiz-title');
        
        const porcentagem = (perguntaAtual / totalPerguntas) * 100;
        if (barraProgresso) barraProgresso.style.width = `${porcentagem}%`;
        
        // Aqui você pode alternar a visibilidade das perguntas no seu HTML
        console.log(`Avançando para a pergunta ${perguntaAtual}`);
    }

    function exibirResultadoQuiz() {
        const containerQuiz = document.querySelector('.tool-container');
        if (containerQuiz) {
            containerQuiz.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h3>Sua Avaliação Concluída!</h3>
                    <p style="margin: 1rem 0; color: var(--text-muted);">Sua pontuação de sustentabilidade:</p>
                    <h2 style="font-size: 3rem; color: var(--primary-dark); margin-bottom: 1rem;">${pontosUsuario} pts</h2>
                    <p style="margin-bottom: 2rem;">Seus hábitos demonstram grande preocupação com o meio ambiente. Continue inspirando quem está ao seu redor!</p>
                    <button class="btn-primary" onclick="location.reload()">Refazer avaliação</button>
                </div>
            `;
        }
    }

    // ==========================================
    // 3. DESAFIO ECOVIDA (CHECKLIST INTERATIVA)
    // ==========================================
    const checklistItems = document.querySelectorAll('.checklist li, .desafio-item');
    const barraProgressoDesafio = document.querySelector('.progress-bar-fill');
    
    let itensConcluidos = 0;
    const totalDesafios = checklistItems.length > 0 ? checklistItems.length : 7;

    checklistItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            item.classList.toggle('completed');
            
            if (item.classList.contains('completed')) {
                item.style.backgroundColor = '#e8f1ec';
                item.style.borderColor = 'var(--primary)';
                itensConcluidos++;
            } else {
                item.style.backgroundColor = 'var(--bg-card)';
                item.style.borderColor = 'var(--border-color)';
                itensConcluidos = Math.max(0, itensConcluidos - 1);
            }

            // Atualiza barra de progresso visual
            const progressoPercent = (itensConcluidos / totalDesafios) * 100;
            if (barraProgressoDesafio) {
                barraProgressoDesafio.style.width = `${progressoPercent}%`;
            }

            // Verifica se completou todos
            if (itensConcluidos === totalDesafios) {
                mostrarNotificacaoSucesso("Parabéns! Você completou o desafio de 7 dias! 🎉");
            }
        });
    });

    // ==========================================
    // 4. SISTEMA DE NOTIFICAÇÕES (TOAST DE SUCESSO)
    // ==========================================
    window.mostrarNotificacaoSucesso = function(mensagem = "Ação realizada com sucesso!") {
        // Cria o elemento toast dinamicamente caso não exista
        let toast = document.querySelector('.toast-success');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-success';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.right = '20px';
            toast.style.zIndex = '9999';
            toast.style.animation = 'fadeIn 0.3s ease';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `✓ ${mensagem}`;
        toast.style.display = 'inline-flex';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 4000);
    };

    // Vincula o clique nos botões de inscrição/newsletter
    const btnNewsletter = document.querySelector('.newsletter-btn, button[type="submit"]');
    if (btnNewsletter) {
        btnNewsletter.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarNotificacaoSucesso("E-mail cadastrado com sucesso! Bem-vindo ao EcoVida.");
        });
    }
});