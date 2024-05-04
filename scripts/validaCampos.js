import { ativaBotao } from "./botaoAdicionar.js";
import { valorEhNumero, valorEhString } from "./ehUmaString.js";

export function validaCampos(campo, naoHaCamposVazios, mensagem, botaoAdicionar) {
    const spanDeErro = campo.parentNode.querySelector(".mensagem-erro");
    let validadorDeInput = campo.checkValidity();
    const tiposDeErro = [
        "valueMissing",     // erro quando não há nada no campo
        "typeMismatch",     // erro quando o tipo de dado que você está colocando não combina com o do campo
        "tooShort",         // erro quando o dado é muito curto ao tamanho minimo do campo
        "customError"       // mensagem de erro customizada
    ];
    const mensagens = {
        nome: {
            valueMissing: "O campo de nome não pode ficar vazio!",
            typeMismatch: "Por favor, preencha um nome válido!",
            tooShort: "Este campo aceita nomes de 3 a 50 letras!"
        },
        preco: {
            valueMissing: "O campo de preço não pode ficar vazio!",
            typeMismatch: "Por favor, preencha um preço válido!",
            tooShort: "Este campo aceita números de 0,1 a 100.000.000"
        },
        quilo: {
            valueMissing: "O campo de peso não pode ficar vazio!",
            typeMismatch: "Por favor, preencha um peso válido!",
            tooShort: "Este campo aceita números de 0,1 a 10.000"
        },
        imagem: {
            valueMissing: "O campo de imagem não pode ficar vazio!",
            typeMismatch: "Por favor, preencha uma imagem válida!",
            tooShort: "Este campo aceita uma imagem!"
        }
    };

    if (campo.name == "nome") {
        naoHaCamposVazios[0] = ehUmNome(campo, spanDeErro);
    } else if (campo.name == "preco") {
        naoHaCamposVazios[1] = ehUmNumero(campo, spanDeErro);
    } else if (campo.name == "quilo") {
        naoHaCamposVazios[2] = ehUmNumero(campo, spanDeErro);
    } else if (campo.name == "imagem") {
        naoHaCamposVazios[3] = ehUmaImagem(campo, spanDeErro);
    }

    // verifica qual campo está selecionado e coloca um texto na tag span de erro
    if (!validadorDeInput) {
        // verifica se o retorno do preço ou peso é falso e salva erro na mensagem
        if (!naoHaCamposVazios[1] || !naoHaCamposVazios[2]) {
            mensagem = "Digite um número válido!";
        }
        // salva o erro do campo na variável mensagem, caso o campo tenha um erro
        tiposDeErro.forEach(erro => {
            if (campo.validity[erro]) {
                mensagem = mensagens[campo.name][erro];
            }
        });
        // coloca a mensagem de erro na tag span de erro
        spanDeErro.textContent = mensagem;
    }

    // ativa o botão de enviar se os campos não forem vazios
    if (naoHaCamposVazios[0] && naoHaCamposVazios[1] && naoHaCamposVazios[2] && naoHaCamposVazios[3]) {
        ativaBotao(botaoAdicionar, true);
    } else {
        ativaBotao(botaoAdicionar, false);
    }
}

function ehUmNome(campo, mensagemErro) {
    // verifica se o campo é uma string e coloca um texto na tag span de erro
    if (valorEhString(campo.value) && campo.value.length <= 50 && campo.value.length >= 3) {
        mensagemErro.textContent = "";
        return true;
    } else {
        mensagemErro.textContent = "Digite um nome válido!";
        return false;
    }
}

function ehUmNumero(campo, mensagemErro) {
    // verifica se o valor existe e se é um número
    let numeroConvertido = valorEhNumero(campo.value) ? parseFloat(campo.value) : campo.value;

    // verifica se o campo não é uma string e coloca um texto na tag span de erro
    if (campo.name === "preco" && numeroConvertido <= 100000000 && numeroConvertido >= 0.1) {
        campo.value = numeroConvertido;
        mensagemErro.textContent = "";
        return true;
    } else if (campo.name === "quilo" && numeroConvertido <= 10000 && numeroConvertido >= 0.1) {
        mensagemErro.textContent = "";
        campo.value = numeroConvertido;
        return true;
    } else {
        return false;
    }
}

function ehUmaImagem(campo, mensagemErro) {
    const imagemDePrevia = document.querySelector(".form__img").getAttribute("src");

    // verifica se o campo tem uma imagem e coloca um texto na tag span de erro
    if (campo.getAttribute("accept") === "image/png, image/jpeg" && campo.files.length === 1) {
        mensagemErro.textContent = "";
        return true;
    } else if (imagemDePrevia && campo.files.length === 0) {
        mensagemErro.textContent = "";
        return true;
    } else {
        mensagemErro.textContent = "Envie uma imagem!";
        return false;
    }
}