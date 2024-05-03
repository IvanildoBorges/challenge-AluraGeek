export function valorEhString(value) {
    // o método isNaN verifica se o valor do campo é string (TRUE) ou não (FALSE)
    // e método trim verifica se o campo está somente com espaços em branco
    if (isNaN(value) && value.trim()) {
        return true;
    } else {
        return false;
    }
}

export function valorEhNumero(value) {
    // o método parseFloat converte o valor do campo string para decimal
    if (parseFloat(value) > 0) {
        return true;
    } else {
        return false;
    }
}