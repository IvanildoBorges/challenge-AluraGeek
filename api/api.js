import { Product } from "../model/product.js";

const port = 3000;
const url = `http://localhost:${port}/products`;
const headers = new Headers({
    "Content-Type": "application/json"
});

export default {
    getProducts: async () => {
        return await fetch(url, {
                method: "GET",
                headers: headers,
                mode: "cors",
                cache: "default"
            })
            .then(response => {
                if (response.ok) {
                    console.log(`${response.status} - ${response.statusText}`);
                    return response.json();
                } else {
                    console.error(`Resposta do rede: ${response.status} - ${response.statusText}`);
                    return [];
                }
            })
            .then(produtosJSON => produtosJSON.map(produto => new Product(produto)))
            .catch(error => console.error(error.message));
    },
    setProduct: async (produto) => {
        try {
            const response = await fetch(url, {
                    method: "POST",
                    mode: "cors",
                    headers: headers,
                    body: JSON.stringify(produto)
                })
                .then(response => response.json());

            console.log("Sucesso: ", response);
            return response;
        } catch (error) {
            console.error("Error:", error);
        }
    },
}