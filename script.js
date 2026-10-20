const salario = document.getElementById('salario')
const dinheiroExtra = document.getElementById('dinheiroExtra')
const dinheiroTotal = document.getElementById('dinheiroTotal')
const aluguel = document.getElementById('aluguel')
const condominio = document.getElementById('condominio')
const agua = document.getElementById('agua')
const luz = document.getElementById('luz')
const internet = document.getElementById('internet')
const combustivel = document.getElementById('combustivel')
const transportePublico = document.getElementById('transportePublico')
const manutencao = document.getElementById('manutencao')
const supermercado = document.getElementById('supermercado')
const restaurantes = document.getElementById('restaurantes')
const streaming = document.getElementById('streaming')
const passeios = document.getElementById('passeios')

function limparValor(valorInput) {
    if (!valorInput) return 0;
    const apenasNumeros = valorInput.toString().replace(/\D/g, "");
    return Number(apenasNumeros) / 100;
}

function formatarInputMoeda(e) {
    const input = e.target;
    let valor = input.value.replace(/\D/g, "");

    if (valor === "") {
        input.value = "";
        return;
    }

    valor = (Number(valor) / 100).toFixed(2);

    const formatado = Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    input.value = formatado;
}

function formatarMoeda(valor) {
    const numero = Number(valor) || 0;
    return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function pegandoTotal() {
    const valorSalario = limparValor(salario.value);
    const valorExtra = limparValor(dinheiroExtra.value);

    const total = valorSalario + valorExtra;
    dinheiroTotal.value = formatarMoeda(total);
}

salario.addEventListener('input', formatarInputMoeda);
salario.addEventListener('input', pegandoTotal);
salario.addEventListener('input', () => {
    const resultado = somarDespesas();
    ExibirStatus(resultado.totalDespesas);
});

dinheiroExtra.addEventListener('input', formatarInputMoeda);
dinheiroExtra.addEventListener('input', pegandoTotal);
dinheiroExtra.addEventListener('input', () => {
    const resultado = somarDespesas();
    ExibirStatus(resultado.totalDespesas);
});

function somarDespesas() {
    // ALTERAÇÃO: Usando limparValor em vez de Number() para conseguir somar os valores formatados com R$ e pontos nas despesas
    const totalDespesas = limparValor(aluguel.value) + limparValor(condominio.value) + limparValor(agua.value) + limparValor(luz.value)
        + limparValor(internet.value) + limparValor(combustivel.value) + limparValor(transportePublico.value) + limparValor(manutencao.value)
        + limparValor(supermercado.value) + limparValor(restaurantes.value) + limparValor(streaming.value) + limparValor(passeios.value)

    return { totalDespesas }
}

const inputsDespesas = [
    aluguel, condominio, agua, luz, internet,
    combustivel, transportePublico, manutencao,
    supermercado, restaurantes, streaming, passeios
];

inputsDespesas.forEach(input => {
    if (input) {
        // ALTERAÇÃO: Adicionado o formatarInputMoeda aqui para as despesas também formatarem enquanto digita
        input.addEventListener('input', formatarInputMoeda);
        input.addEventListener('input', () => {
            const resultado = somarDespesas();
            ExibirStatus(resultado.totalDespesas)
        });
    }
});

function ExibirStatus(total) {
    const containerStatus = document.querySelector('.containerSobrou')
    const dinheiroRestado = document.getElementById('dinheiroRestado')
    const status = document.getElementById('status')
    

    const salarioNumerico = limparValor(salario.value)
    const porcentagemSalario = (salarioNumerico * 20) / 100
    const quantoSobrou = salarioNumerico - total

    dinheiroRestado.textContent = formatarMoeda(quantoSobrou)

    if (quantoSobrou >= porcentagemSalario) {
        status.textContent = 'Muito bem! Talvez seja uma ótima quebra para investir'
        containerStatus.style.backgroundColor = '#0d8809'

    } else {
        status.textContent = 'Bora maneirar nas despesas aí pô, ou tu quebra.'
        containerStatus.style.backgroundColor = '#880909'
    }
}