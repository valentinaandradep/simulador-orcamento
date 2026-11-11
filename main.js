/**
 * Retorna a taxa percentual de desconto com base na forma de pagamento.
 * @param {string} formaPagamento - A forma de pagamento escolhida.
 * @returns {number} O percentual de desconto (ex: 0.15 para 15%).
 */
function calcularDescontoPagamento(formaPagamento) {
    switch (formaPagamento) {
        case 'pix':
            return 0.15;
        case 'boleto':
            return 0.10;
        case 'cartao-vista':
            return 0.05;
        case 'cartao-parcelado':
            return 0.0;
        default:
            return 0.0;
    }
}

/**
 * Retorna o valor do frete com base no tipo de entrega.
 * @param {string} tipoEntrega - A modalidade de frete escolhida.
 * @returns {number} O valor em reais do frete.
 */
function calcularValorEntrega(tipoEntrega) {
    switch (tipoEntrega) {
        case 'retirada':
            return 0.0;
        case 'padrao':
            return 12.0;
        case 'expressa':
            return 25.0;
        case 'super-expressa':
            return 45.0;
        default:
            return 0.0;
    }
}

/**
 * Formata um número para o padrão de moeda Real brasileiro (R$).
 * @param {number} valor - O valor numérico a ser formatado.
 * @returns {string} O valor formatado como moeda.
 */
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const formOrcamento = document.getElementById('form-orcamento');

formOrcamento.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputValor = document.getElementById('valor-produto');
    
    const valorRaw = inputValor.value.replace(',', '.');
    const valorProduto = parseFloat(valorRaw);

    if (isNaN(valorProduto) || valorProduto <= 0) {
        alert('Por favor, informe um valor válido para o produto.');
        return;
    }

    const formaPagamento = document.getElementById('forma-pagamento').value;
    const tipoEntrega = document.getElementById('tipo-entrega').value;

    const percentualDesconto = calcularDescontoPagamento(formaPagamento);
    const valorDesconto = valorProduto * percentualDesconto;
    const valorFrete = calcularValorEntrega(tipoEntrega);
    const totalFinal = (valorProduto - valorDesconto) + valorFrete;

    document.getElementById('res-produto').textContent = formatarMoeda(valorProduto);
    document.getElementById('res-desconto').textContent = formatarMoeda(valorDesconto);
    document.getElementById('res-frete').textContent = formatarMoeda(valorFrete);
    document.getElementById('res-total').textContent = formatarMoeda(totalFinal);

    const painelResultado = document.getElementById('painel-resultado');
    painelResultado.classList.remove('hidden');
});