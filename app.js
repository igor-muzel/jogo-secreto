/*Esse programa servirá para o JavaScript interagir com o HTML
utilizando um projeto do jogo no navegador como exemplo
Fora isso, queremos remover os conceitos de 'alert' e 'prompt'
para que a interação do usuário com o jogo seja mais real
e melhor visualmente*/

//let titulo = document.querySelector('h1');//(h1 esta no código do HTML na linha 22)'document' é uma palavra reservada para conseguir manipular e alterar o conteudo do HTML
//querySelector('h1') seleciona o 'h1' do HTML para conseguir alterar o conteudo
//titulo.innerHTML = 'Jogo do número secreto'; // colocando um texto no jogo, manipulando a variavel titulo com .innerHTML

//let paragrafo = document.querySelector('p'); // seleciona o paragrafo 
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';//substitui o 'alert'

let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;
console.log(numeroSecreto);

//essa função junta as duas tag h1 e p em uma só para mostrar uma boa prática de programação
function exibirTextoNaTela(tag, texto) { //a tag aqui representa o 'h1' e 'p' que são duas tag

    let campo = document.querySelector(tag, texto);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

exibirMensagemInicial();



//criando uma função: verificarChute esta na linha 27 do HTML, que vai servir para clicar no botão 'chutar' do jogo
function verificarChute() {

    let chute = document.querySelector('input').value; // aqui o input é o valor que coloco no jogo, e o value pega esse valor
    console.log(chute == numeroSecreto);

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', `Você acertou!`);
        exibirTextoNaTela('p', `Você descobriu o número secreto  com  ${tentativa} ${tentativa > 1 ? 'tentativas' : 'tentativa'} `);
        document.getElementById('reiniciar').removeAttribute('disabled');//aqui estamos pegando o id = reiniciar e removendo o atributo de desabilitar
        //onde o botao de NOVO JOGO vai ser habilitado quando acertar o número secreto
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('h1', 'Você errou!');
            exibirTextoNaTela('p', 'O número secreto é menor');

        } else {
            exibirTextoNaTela('h1', 'Você errou!');
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        limparCampo(); //chamo essa função para poder limpar o campo do jogo caso numeroSecreto seja diferente do chute
        tentativa++;
    }

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosNaLista = listaDeNumeroSorteados.length;
    if (quantidadeElementosNaLista == numeroLimite) {
        listaDeNumeroSorteados = [];

    }


    if (listaDeNumeroSorteados.includes(numeroEscolhido)) { //a função includes verifica se o elementoEscolhido ja esta na listaDeNumerosSorteados
        return gerarNumeroAleatorio(); //chamada recursiva onde se o numeroEscolhido ja estiver na listaDeNumeroSorteados ele irá chamar ela mesma para sortear novamente outro numero
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido); //.push = adiciona um numero na lista caso nao esteja nela
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector('input'); //é o numero que eu coloco no jogo que estarei colocando na variavel chute 'input' é o numero que coloco no jogo
    chute.value = ''; // o value pega o numero e apaga ele após a tentativa caso esteja errado o chute
}


function reiniciarJogo() {

    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //aqui usamos o setAttribute para adicionar um atributo disabled(desabilitar) para que ele seja habilitado = true

}

