import api from "../api/api.js";
import { Product } from "../model/product.js";
import { ativaBotao } from "./botaoAdicionar.js";
import geraListaDeCards from "./geraListaDeCards.js";
import { validaCampos } from "./validaCampos.js";
let listaDeProdutos = [];
const camposDoFormulario = document.querySelectorAll(".form__input[required]");
const previaDaImagem = document.querySelector(".form__img");
const formulario = document.querySelector('.form__product');
const botaoEnviarFormulario = document.querySelector('.form_button__submit');
const botaoReset = document.querySelector("button[type=reset]");
const campoID = document.getElementById("identificator");
const tituloDoFormulario = document.querySelector(".form__title");
let imageEmBase64;
let mensagem = "";
let naoHaCamposVazios = [false, false, false, false]; // inicia a pagina com botão desativado

// coloca o campo de ID oculto
escondeCampoID();

// coloca o botão adicionar no modo desativado
ativaBotao(botaoEnviarFormulario, naoHaCamposVazios[0]);

// Pega os itens da API REST
listaDeProdutos = await api.pegaOsProdutos();

// Gera a lista de cards de produtos
geraListaDeCards(listaDeProdutos, naoHaCamposVazios, mensagem);

// atribui um escutador de evento para cada input
camposDoFormulario.forEach(campo => {
    // escutador de evento blur para validar os campos
    campo.addEventListener("blur", () => validaCampos(campo, naoHaCamposVazios, mensagem, botaoEnviarFormulario));

    // escutador de evento para desativar mensagens de erro padrão
    campo.addEventListener("invalid", evento => evento.preventDefault());

    // escutador de evento change
    if (campo.getAttribute("type") == "file") {
        campo.addEventListener("change", campoArquivo => {
            leEAtualizaPreviaDeImagem(campoArquivo);
            validaCampos(campo, naoHaCamposVazios, mensagem, botaoEnviarFormulario);
        });
    }
});

// atribui um escutador de evento para o botao de enviar
formulario.addEventListener("submit",  (eventoSubmit) => enviaFormulario(eventoSubmit));

// atribui um escutador de evento para o botão reset
botaoReset.addEventListener("click", limpaCampos);

// esconde o campo de ID
function escondeCampoID() {
    campoID.style.display = "none";
    campoID.setAttribute("disabled", true);
}

// cadasta ou altera um produto
async function enviaFormulario(evento) {
    evento.preventDefault();

    if (listaDeProdutos) {
        listaDeProdutos.forEach(itemProduto => {
            if (campoID.value == itemProduto.id) {
                imageEmBase64 = itemProduto.image;
            }
        });
    }
    
    const produto = new Product({
        id: campoID.value,
        name: camposDoFormulario[0].value,
        kg: parseFloat(camposDoFormulario[2].value),
        price: parseFloat(camposDoFormulario[1].value),
        image: previaDaImagem.getAttribute("src") ?? imageEmBase64
    });
    
    if (campoID.value.trim() != "") {
        // PUT
        camposDoFormulario.forEach(campo => campo.setAttribute("required", "true")); // torna campos obrigatórios
        botaoEnviarFormulario.textContent = "Adicionar";
        tituloDoFormulario.textContent = "Adicionar produto";
        geraListaDeCards(listaDeProdutos, naoHaCamposVazios, mensagem);
        await api.atualizaUmProduto(produto) ? window.location.reload(true) : null; // Location.reload recarrega a página
        return await api.atualizaUmProduto(produto);
    } else {
        // POST
        if (produto.indice != "" && produto.nome != "" && produto.preco != 0 && produto.quilo != 0 && produto.image != "") {
            geraListaDeCards(listaDeProdutos, naoHaCamposVazios, mensagem);
            await api.criaUmProduto(produto) ? window.location.reload(true) : null;
            return await api.criaUmProduto(produto);
        }
    }
}

// atualiza imagem de previsualização
function leEAtualizaPreviaDeImagem(campoArquivo){
    const leitorDeArquivos = new FileReader();

    // verifica se o campo está preenchido
    if (campoArquivo.target.valueOf != "") {
        // verifica se o campo tem uma imagem
        if (campoArquivo.target.files && campoArquivo.target.files[0]) {
            //Usa a função do objeto leitor de arquivos, que lê o arquivo, e consegue reaproveita-lo para usar o arquivo como uma URL
            leitorDeArquivos.readAsDataURL(campoArquivo.target.files[0]);
            //Após leitura da imagem (evento load), a função de callback define o valor do src da imagem de prévia com o valor do resultado da leitura do leitor de arquivos
            leitorDeArquivos.addEventListener('loadend', function(load){
                //define o caminho da imagem com o caminho criado pelo leitor de arquivos
                previaDaImagem.setAttribute("src", load.target.result);    
                previaDaImagem.classList.add("active");
                // coloca o valor da imagem convertida na variavel
                imageEmBase64 = previaDaImagem.getAttribute("src");
            });
        } else {
            //desativa a imagem de previa
            previaDaImagem.setAttribute("src", campoArquivo.target.value);    
            previaDaImagem.classList.remove("active");
            // limpa a variavel
            imageEmBase64 = previaDaImagem.getAttribute("src");
        }
    }
}

// limpa campos e imagem de previsualização
function limpaCampos() {
    // limpa os campos
    camposDoFormulario.forEach(campo => campo.value = "");
    imageEmBase64 = "";
    mensagem = "";
    naoHaCamposVazios = [false, false, false, false];
    ativaBotao(botaoEnviarFormulario, naoHaCamposVazios[0]);

    // retorna o valor padrão do titulo e botão do formulário
    botaoEnviarFormulario.textContent = "Adicionar";
    tituloDoFormulario.textContent = "Adicionar produto";

    //desativa a imagem de previa
    previaDaImagem.setAttribute("src", "");    
    previaDaImagem.classList.remove("active");
}