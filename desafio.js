function gerarSequenciaFibonacci(limite, sequencia = [0, 1]) {
    const proximo = sequencia[sequencia.length - 1] + sequencia[sequencia.length - 2];

    if (proximo > limite)
        return sequencia;

    sequencia.push(proximo);

    return gerarSequenciaFibonacci(limite, sequencia);
}

function verificarNumeroNaFibonacci(numero) {
    if (numero < 0)
        return "O número não pode ser negativo.";

    const sequencia = gerarSequenciaFibonacci(numero);

    if (sequencia.includes(numero))
        return `O número ${numero} pertence à sequência de Fibonacci.`;

    return `O número ${numero} NÃO pertence à sequência de Fibonacci.`;
}

console.log(verificarNumeroNaFibonacci(16));

function calcularSoma(indice, k = 0, soma = 0) {
    if (k >= indice) {
        console.log(`A soma dos números de 1 a ${indice} é ${soma}`);
        return
    }

    return calcularSoma(indice, k + 1, soma + (k + 1));
}

calcularSoma(13); // 91


const fs = require('fs').promises;

async function lerJSON() {
    try {
        const data = await fs.readFile('dados.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('Erro ao ler o arquivo de dados json:', error);
        return undefined;
    }
}


async function analisarFaturamento() {
    const dados = await lerJSON();
    if (!dados) {
        console.log('Erro ao ler o arquivo de dados json');
        return;
    }

    const diaDeMenorValorFaturado = obterDiaComMenorValorFaturamento(dados);
    const diaDeMaiorValorFaturado = obterDiaComMaiorValorFaturamento(dados);

    console.log(`O menor valor de faturamento ocorrido em um dia do mês foi de R$ ${diaDeMenorValorFaturado.valor} no dia ${diaDeMenorValorFaturado.dia}`);
    console.log(`O maior valor de faturamento ocorrido em um dia do mês foi de R$ ${diaDeMaiorValorFaturado.valor} no dia ${diaDeMaiorValorFaturado.dia}`);
}

analisarFaturamento()

function obterDiaComMenorValorFaturamento(dados) { 
    return dados.reduce((acc, value) => {
        if(acc === null)
            return value;

        if(value.valor === 0)
            return acc;

        if (value.valor < acc.valor )
            return value;

        return acc;

    }, null);
}


function obterDiaComMaiorValorFaturamento(dados) { 
    return dados.reduce((acc, value) => {
        if(acc === null)
            return value;

        if(value.valor === 0)
            return acc;

        if (value.valor > acc.valor )
            return value;

        return acc;

    }, null);
}