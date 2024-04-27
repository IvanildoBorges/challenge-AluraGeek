export class Product {
    id;
    name;
    kg;
    price;
    image;

    constructor({id = "", name = "", kg = 0, price = 0, image = ""}) {
        this.id = id != "" ? id : self.crypto.randomUUID();
        this.name = name;
        this.kg = kg;
        this.price = price;
        this.image = image;
    }

    //Getter
    get indice() {
        return this.id;
    }

    get nome() {
        return this.name;
    }

    get quilo() {
        return this.kg;
    }

    get preco() {
        return this.price;
    }

    get imagem() {
        return this.image;
    }

    //Setter
    set indice(id) {
        this.id = id;
    }

    set nome(name) {
        this.name = name;
    }

    set quilo(kg) {
        this.kg = parseFloat(kg);
    }

    set preco(price) {
        this.price = parseFloat(price);
    }

    set imagem(image) {
        this.image = image;
    }
}

export const produtoEmpty = {
    id: "",
    name: "",
    kg: 0,
    price: 0,
    image: ""
};