    let carrinho = [];

    function adicionarAoCarrinho(item, preco) {
        carrinho.push({ item, preco });
        atualizarResumo();
        mostrarNotificacao(`${item} adicionado ao carrinho!`);
    }

    function atualizarResumo() {
        const resumo = document.getElementById('resumo');
        resumo.innerHTML = '';
        let total = 0;
        carrinho.forEach(produto => {
        resumo.innerHTML += `<p>${produto.item} - R$ ${produto.preco}</p>`;
        total += produto.preco;
    });
        resumo.innerHTML += `<p><strong>Total: R$ ${total}</strong></p>`;
        document.getElementById('contador').textContent = carrinho.length;
    }

    function mostrarNotificacao(msg) {
        const aviso = document.createElement('div');
        aviso.className = 'notificacao';
        aviso.textContent = msg;
        document.body.appendChild(aviso);
        setTimeout(() => aviso.remove(), 2000);
    }

    function enviarPedido() {
        const pagamento = document.getElementById('pagamento').value;
        const obs = document.getElementById('obs').value;
        let pedidoTexto = carrinho.map(p => `• ${p.item} (R$ ${p.preco})`).join('\n');
        let total = carrinho.reduce((sum, p) => sum + p.preco, 0);
        let mensagem = `\u{1F4CB} *Novo Pedido:*\n\n${pedidoTexto}\n\n\u{1F4B0} *Total:* R$ ${total}\n\u{1F4B3} *Pagamento:* ${pagamento}\n\u{1F4DD} *Obs:* ${obs}`;
        let url = `https://wa.me/5519991941073?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    }

    // Rolar até o resumo do pedido ao clicar no ícone do carrinho
const iconeCarrinho = document.getElementById('icone-carrinho');
const secaoPedido = document.getElementById('pedido');

iconeCarrinho.addEventListener('click', () => {
    secaoPedido.scrollIntoView({ behavior: 'smooth' });
});

