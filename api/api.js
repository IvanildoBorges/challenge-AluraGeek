import { Product } from "../model/product.js";

const port = 3000;
const url = `http://localhost:${port}/products`;
const headers = new Headers({
    "Content-Type": "application/json"
});

// CRUD PRODUTOS
export default {
    // CREATE
    criaUmProduto: async (produto) => {
        try {
            const response = await fetch(url, {
                    method: "POST",
                    mode: "cors",
                    headers: headers,
                    body: JSON.stringify(produto)
                });

            console.log("Sucesso: ", response.json());
            return response.ok;
        } catch (error) {
            console.error("Error:", error.message);
        }
    },
    // READ
    pegaOsProdutos: async (_page = 1, _per_page = 100) => {
        return await fetch(`${url}?_page=${_page}&_per_page=${_per_page}`, {
                method: "GET",
                headers: headers,
                mode: "cors",
                cache: "default"
            })
            .then(response => {
                // verifica se a requisição foi concluida e retorna os dados json
                if (response.ok) {
                    console.log(`${response.status} - ${response.statusText}`);
                    return response.json();
                } else {
                    console.error(`Resposta do rede: ${response.status} - ${response.statusText}`);
                    return [];
                }
            })
            .then(dadosJSON => dadosJSON.data) // retorna os dados sem o cabeçalho da requisição
            .then(produtosJSON => produtosJSON.map(produto => new Product(produto))) // converte em instancias de Produto
            .then(produtos => produtos.reverse())  // inverte ordem array para mostrar do ultimo adicionado em diante
            .catch(error => console.error(error.message));
    },
    // UPDATE
    atualizaUmProduto: async (produto) => {
        try {
            const response = await fetch(`${url}/${produto.id}`, {
                    method: "PUT",
                    mode: "cors",
                    headers: headers,
                    body: JSON.stringify(produto)
                });

            console.log("Sucesso ao atualizar: ", response.json());
            return response.ok;
        } catch (error) {
            console.error("Error:", error.message);
        }
    },
    // DELETE
    excluiUmProduto: async (produto) => {
        try {
            const response = await fetch(`${url}/${produto.id}`, {
                    method: "DELETE",
                    mode: "cors",
                    headers: headers
                });

            console.log("Sucesso ao excluir: ", response.json());
            return response.ok;
        } catch (error) {
            console.error("Error:", error.message);
        }
    },
}