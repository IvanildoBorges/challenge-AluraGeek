export class Product {
    #id;        // atributo privado
    #name;      // atributo privado
    #kg;        // atributo privado
    #price;     // atributo privado
    #image;     // atributo privado

    constructor({name, kg, price, image}) {
        this.#id = self.crypto.randomUUID();
        this.#name = name;
        this.#kg = kg;
        this.#price = price;
        this.#image = image;
    }

    //Getter
    get indice() {
        return this.#id;
    }

    get nome() {
        return this.#name;
    }

    get quilo() {
        return this.#kg;
    }

    get preco() {
        return this.#price;
    }

    get imagem() {
        return this.#image;
    }

    //Setter
    set indice(id) {
        this.#id = id;
    }

    set nome(name) {
        this.#name = name;
    }

    set quilo(kg) {
        this.#kg = kg;
    }

    set preco(price) {
        this.#price = price;
    }

    set imagem(image) {
        this.#image = image;
    }
}