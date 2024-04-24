import api from "../api/api.js";

carregaProdutos();

// Pega os itens da API REST
async function carregaProdutos() {
    const listaDeProdutos = document.querySelector(".products__container");
    const produtos = await api.getProducts();

    // valida se existe produtos
    if (produtos) {
        produtos.reverse(); // inverte o array: coloca os itens recentes do final do array em primeiro lugar

        // percorre o array e cria uma lista de cards
        produtos.forEach(produto => {
            listaDeProdutos.innerHTML += `
                <li class="products__item key="${produto.indice}">
                    <div class="product__card"">
                        <img src="${produto.imagem}" alt="Imagem do produto">
                        <div class="product__card-container--info">
                            <p>${produto.nome} ${produto.quilo}Kg</p>
                            <div class="product__card-container--value">
                                <p>R$ ${produto.preco.toFixed(2)}</p>
                                <img src="./assets/trash.png" alt="Ícone de remover">
                            </div>
                        </div>
                    </div>
                </li>
            `
        });
    } else {
        // criar uma mensagem caso não tenha produtos
        listaDeProdutos.style.display = "flex";
        listaDeProdutos.innerHTML = `<li class="products__item__empty">Nenhum produto foi adicionado!</li>`;
    }
}