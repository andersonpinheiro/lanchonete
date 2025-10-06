// ========================
// Controle do carrinho
// ========================

// Array para armazenar os itens do carrinho
let carrinho = [];

/**
 * Adiciona um item ao carrinho e atualiza o resumo
 * @param {string} item - Nome do produto
 * @param {number} preco - Preço do produto
 */
function adicionarAoCarrinho(item, preco) {
  carrinho.push({ item, preco }); // Adiciona o produto ao array
  atualizarResumo(); // Atualiza o resumo do carrinho na tela
  mostrarNotificacao(`✅ ${item} adicionado ao carrinho!`); // Mostra uma notificação
}

/**
 * Atualiza o resumo do pedido na tela
 */
function atualizarResumo() {
  const resumo = document.getElementById('resumo'); // Seleciona o elemento do resumo
  resumo.innerHTML = ''; // Limpa o conteúdo anterior
  let total = 0; // Inicializa o total

  // Para cada produto no carrinho, adiciona ao resumo e soma o total
carrinho.forEach(produto => {
    resumo.innerHTML += `<p>${produto.item} - R$ ${produto.preco.toFixed(2)}</p>`;
    total += produto.preco;
});

  // Atualiza o total no elemento do resumo e no valor fixo
resumo.innerHTML += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
const valorTotal = document.getElementById('valor-total');
if (valorTotal) valorTotal.textContent = `R$ ${total.toFixed(2)}`;

  // Atualiza o contador de itens do carrinho
document.getElementById('contador').textContent = carrinho.length;
}

/**
 * Mostra uma notificação temporária na tela
 * @param {string} msg - Mensagem da notificação
 */
function mostrarNotificacao(msg) {
  const aviso = document.createElement('div'); // Cria um novo elemento div
  aviso.className = 'notificacao'; // Adiciona a classe para estilização
  aviso.textContent = msg; // Define o texto da notificação
  document.body.appendChild(aviso); // Adiciona ao corpo da página
  setTimeout(() => aviso.remove(), 2000); // Remove após 2 segundos
}

/**
 * Envia o pedido via WhatsApp
 */
function enviarPedido() {
  // Verifica se há itens no carrinho
    if (carrinho.length === 0) {
    mostrarNotificacao('🛒 Seu carrinho está vazio!');
    return;
}

  // Obtém forma de pagamento (inputs do tipo radio)
const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked');
const pagamento = pagamentoSelecionado ? pagamentoSelecionado.value : 'Não informado';
const obs = document.getElementById('obs').value.trim() || 'Nenhuma observação.';

  // Monta o texto do pedido com os itens
let pedidoTexto = carrinho.map(p => `• ${p.item} (R$ ${p.preco})`).join('\n');
  // Calcula o total do pedido
let total = carrinho.reduce((sum, p) => sum + p.preco, 0);

  // Monta a mensagem para o WhatsApp
  let mensagem = `\u{1F4CB} *Novo Pedido:*\n\n${pedidoTexto}\n\n\u{1F4B0} *Total:* R$ ${total.toFixed(2)}\n\u{1F4B3} *Pagamento:* ${pagamento}\n\u{1F4DD} *Obs:* ${obs}`;

  // Cria a URL do WhatsApp com a mensagem
let url = `https://wa.me/5519991941073?text=${encodeURIComponent(mensagem)}`;

  // Feedback visual antes de enviar
mostrarNotificacao('📨 Pedido sendo enviado...');
setTimeout(() => window.open(url, '_blank'), 600);
}

// ========================
// Comportamento do carrinho
// ========================

// Seleciona o ícone do carrinho e a seção do pedido
const iconeCarrinho = document.getElementById('icone-carrinho');
const secaoPedido = document.getElementById('pedido');

// Adiciona evento para rolar até o resumo do pedido ao clicar no ícone do carrinho
iconeCarrinho.addEventListener('click', () => {
secaoPedido.scrollIntoView({ behavior: 'smooth' });
});
