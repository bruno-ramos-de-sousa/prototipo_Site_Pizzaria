// ? Chamada dos itens nas paginas pelos IDs

const inputNome = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#password");
const inputConfirmSenha = document.querySelector("#confirm-password");
const textoAvisoNome = document.querySelector("#jump-text-name");
const textoAvisoEmail = document.querySelector("#jump-text-email");
const textoAvisoSenha = document.querySelector("#jump-text-senha");
const formularioCadastro = document.querySelector("#cadastrar");
const formularioLogin = document.querySelector("#login");
const campos = document.querySelectorAll('.campo');

// ? Funcoes de validacao de campos

function validarNome(evento) {
    const nome = inputNome.value;
    const nomelimpo = nome.trim();
    const palavras = nomelimpo.split(/\s+/);

    if (palavras.length < 2) {
        inputNome.style.border = "4px solid #800000";
        textoAvisoNome.textContent = "Digite nome e sobrenome!!!";
        textoAvisoNome.style.color = "#FFD700";
        textoAvisoNome.style.display = "flex";
        return false;
    } else {
        inputNome.style.border = "4px solid #000000";
        textoAvisoNome.textContent = "";
        textoAvisoNome.style.display = "none";
        return true;
    }
}

function validarEmail(evento) {
    const email = inputEmail.value;
    const provedoresValidos = ['gmail', 'hotmail', 'outlook'];
    const emailValido = provedoresValidos.some(provedor => email.includes(provedor));

    if (emailValido) {
        inputEmail.style.border = "4px solid #000000";
        textoAvisoEmail.textContent = "";
        textoAvisoEmail.style.display = "none";
        return true;
    } else {
        inputEmail.style.border = "4px solid #800000";
        textoAvisoEmail.textContent = "Digite um email valido!!!";
        textoAvisoEmail.style.color = "#FFD700";
        textoAvisoEmail.style.display = "flex";
        return false;
    }
}

function validarSenha(evento) {
    const senha = inputSenha.value;
    const confirmarSenha = inputConfirmSenha.value;

    if (senha !== confirmarSenha) {
        inputSenha.style.border = "4px solid #800000";
        inputConfirmSenha.style.border = "4px solid #800000";
        textoAvisoSenha.textContent =   "Senhas diferentes digitadas!!!";
        textoAvisoSenha.style.color = "#FFD700";
        textoAvisoSenha.style.display = "flex";
        return false;
    } else {
        inputSenha.style.border = "4px solid #000000";
        inputConfirmSenha.style.border = "4px solid #000000";
        textoAvisoSenha.textContent = "";
        textoAvisoSenha.style.display = "none";
        return true;
    }
}

function validarFormularioCadastro(evento) {
    if (!validarSenha() || !validarEmail() || !validarNome()) {
        evento.preventDefault();
    }
}

function validarFormularioLogin(evento) {
    const senha = inputSenha.value;
    if (!validarEmail() || senha == "") {
        evento.preventDefault();
    }
}

// ? Separacao dos scripts por arquivo

if (formularioCadastro) {
    inputNome.addEventListener('input', validarNome);
    inputEmail.addEventListener('input', validarEmail);
    inputSenha.addEventListener('input', validarSenha);
    inputConfirmSenha.addEventListener('input', validarSenha);
    formularioCadastro.addEventListener('submit', validarFormularioCadastro)
}

if (formularioLogin) {
    inputEmail.addEventListener('input', validarEmail);
    formularioLogin.addEventListener('submit', validarFormularioLogin)
}

// ? Funcao para renderizar as imagens apenas quando visiveis

document.addEventListener("DOMContentLoaded", () => {
    const imagens = document.querySelectorAll(".pizza-img");

    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {
                const img = entrada.target;

                img.src = img.getAttribute("data-src");

                img.classList.add("fade-in");

                observador.unobserve(img);
            }
        });
    }, {

        rootMargin: "0px 0px 200px 0px"
    });

    imagens.forEach(img => observador.observe(img));
});