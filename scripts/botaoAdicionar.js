export function ativaBotao(botao, campoNaoVazio) {
    if (campoNaoVazio && botao) {
        botao.removeAttribute("disabled");
        botao.classList.remove("desativado");
    } else {
        botao.setAttribute("disabled", "disabled");
        botao.classList.add("desativado");
    }
}