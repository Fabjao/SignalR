
var connection = new signalR.HubConnectionBuilder().withUrl("/PromoHub").build();
//caso estive-se em outro end point deveria colocar o https://api.......


start();

connection.onclosed(async () => { await status() });


connection.on("CadastradoSucesso", function () {
    var mensagem = document.getElementById("Mensagem");
    mensagem.innerHTML = "Promoçõ realizada com sucesso";
});

connection.on("ReceberPromocao", function (promocao) {
    var containerLogin = document.getElementById("container-login");

    var containerPromo = document.createElement("div");
    containerPromo.setAttribute("class", "container-promo");

    var containerChamada = document.createElement("div");
    containerChamada.setAttribute("class", "container-chamada");

    var h1titulo = document.createElement("h1");
    h1titulo.innerText = promocao.empresa;

    var p1 = document.createElement("p");
    p1.innerText = promocao.chamada;

    var p2 = document.createElement("p");
    p2.innerText = promocao.regras;

    var containerBotao = document.createElement("div");
    containerBotao.setAttribute("class", "container-botao")

    var link = document.createElement("a");
    link.setAttribute("href", promocao.enderecoURL);
    link.setAttribute("target", "_blank");
    link.innerText = "Pegar";

    containerChamada.appendChild(h1titulo);
    containerChamada.appendChild(p1);
    containerChamada.appendChild(p2);

    containerBotao.appendChild(link);

    containerPromo.appendChild(containerChamada);
    containerPromo.appendChild(containerBotao);

    containerLogin.appendChild(containerPromo);
});


var btnCadastrar = document.getElementById("BtnCadastrar");

if (btnCadastrar != null) {
    btnCadastrar.addEventListener("click", function () {

        var empresa = document.getElementById("Empresa").value;
        var chamada = document.getElementById("Chamada").value;
        var regras = document.getElementById("Regras").value;
        var enderecoUrl = document.getElementById("EnderecoURL").value;

        var promocao = { Empresa: empresa, Chamada: chamada, Regras: regras, EnderecoURL: enderecoUrl };

        connection.invoke("CadastrarPromocao", promocao).then(function () {
            console.info("Cadastrado com sucesso");
        }).catch(function (err) {
            console.error(err.toString());
        });
    });
}

function start() {
    connection.start().then(function () {
        console.info("Conectado!");
    }).catch(function (err) {
        console.error(err.toString());
        setTimeout(() => { start() }, 5000);
    });
}