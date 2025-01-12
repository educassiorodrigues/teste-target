
const fs = require('fs').promises;

const ESTADOS_DISTRIBUIDORA = [
    { estado: 'SP', valor: 67836.43 },
    { estado: 'RJ', valor: 36678.66 },
    { estado: 'MG', valor: 29229.88 },
    { estado: 'ES', valor: 27165.48 },
    { estado: 'Outros', valor: 19849.53 }
]

async function main() {
    console.log('1) Cálculo soma')
    console.log(calcularSoma(13));

    console.log('2) Verificar número na sequência de Fibonacci')
    console.log(verificarNumeroNaFibonacci(16));

    console.log('3) Análise de faturamento')
    await analisarFaturamento()

    console.log('4) Calcular percentual de representacao por estado')
    console.log(calculaPercentualRepresentacaoPorEstado())

    console.log('5) Inverter string')
    console.log(inverterString('Eu sou um teste'))
}



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

function calcularSoma(indice, k = 0, soma = 0) {
    if (k >= indice)
        return `A soma dos números de 1 a ${indice} é ${soma}`;

    return calcularSoma(indice, k + 1, soma + (k + 1));
}

async function lerJSON() {
    try {
        const data = await fs.readFile('dados.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('Erro ao ler o arquivo de dados json:', error);
        return undefined;
    }
}

async function diasConsideradosCalculo(dados) {
    return dados.filter(dado => dado.valor > 0);
}

async function analisarFaturamento() {
    const dados = await diasConsideradosCalculo(await lerJSON());
    if (!dados) {
        console.log('Erro ao ler o arquivo de dados json');
        return;
    }

    const diaDeMenorValorFaturado = obterDiaComMenorValorFaturamento(dados);
    const diaDeMaiorValorFaturado = obterDiaComMaiorValorFaturamento(dados);
    const diasAcimaDaMedia = obterDiasComValorAcimaDaMediaDeFaturamento(dados);

    console.log(`O menor valor de faturamento ocorrido em um dia do mês foi de R$ ${diaDeMenorValorFaturado.valor} no dia ${diaDeMenorValorFaturado.dia}`);
    console.log(`O maior valor de faturamento ocorrido em um dia do mês foi de R$ ${diaDeMaiorValorFaturado.valor} no dia ${diaDeMaiorValorFaturado.dia}`);
    console.log(`A média de faturamento dos dias considerados foi de R$ ${calcularMedia(dados)}`);
    console.log('Dias com valor de faturamento acima da média:', diasAcimaDaMedia);
}

function calcularMedia(dados) {
    const total = dados.reduce((acc, value) => acc + value.valor, 0);
    return total / dados.length;
}

function obterDiasComValorAcimaDaMediaDeFaturamento(dados) {
    const media = calcularMedia(dados);

    return dados.reduce((acc, value) => {
        if (value.valor > media)
            return [...acc, value];

        return acc;
    }, []);
}

function obterDiaComMenorValorFaturamento(dados) {
    return dados.reduce((acc, value) => {
        if (acc === null)
            return value;

        if (value.valor < acc.valor)
            return value;

        return acc;

    }, null);
}

function obterDiaComMaiorValorFaturamento(dados) {
    return dados.reduce((acc, value) => {
        if (acc === null)
            return value;

        if (value.valor > acc.valor)
            return value;

        return acc;

    }, null);
}

function calculaPercentualRepresentacaoPorEstado() {
    const total = ESTADOS_DISTRIBUIDORA.reduce((acc, value) => acc + value.valor, 0);

    return ESTADOS_DISTRIBUIDORA.map(estado => ({
        estado: estado.estado,
        percentual: (estado.valor / total) * 100
    }));
}


function inverterString(valor) {
    let resultado = '';
    for (let i = 0; i < valor.length; i++) {
        resultado = valor[i] + resultado;
    }


    return resultado
}





main()