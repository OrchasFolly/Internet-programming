
const formCadastro = document.getElementById("formPartido");
const endpoint = "http://localhost:3400/partido";

function manipularForm(evento){
    if (!formCadastro.checkValidity()){
        formCadastro.classList.add('was-validated');
    }
    else{
        cadastrando();
        formCadastro.reset();
        exibindoTabela();
    }
    evento.preventDefault();
    evento.stopPropagation();
}

function pegandoDados(){
    const numeroP = document.getElementById("numpRegister").value;
    const nomePartido = document.getElementById("nameRegister").value;
    const sigla = document.getElementById("siglaRegister").value;

    return {
        "numeroP": numeroP,
        "nomePartido": nomePartido,
        "sigla": sigla,
    }
}

function cadastrando(){
    const dadosEnviados = pegandoDados();
    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosEnviados)
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            mostrarMensagem(dadosRecebidos.mensagem, "success");
        }
        else{
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        mostrarMensagem(erro, "warning");
    });
}

function atualizando(){
    const dadosEnviados = pegandoDados();
    fetch(endpoint, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dadosEnviados)
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            mostrarMensagem(dadosRecebidos.mensagem, "success");
        }
        else{
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        mostrarMensagem(erro, "warning");
    });

    formCadastro.reset();
    document.getElementById("numpRegister").disabled = false;
    document.getElementById("atualizar").disabled = true;
    document.getElementById("cadastrar").disabled = false;
    document.getElementById("excluir").disabled = true;
}

function excluindo(){
    fetch(endpoint, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            numeroP: document.getElementById("numpRegister").value
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            mostrarMensagem(dadosRecebidos.mensagem, "success");
        }
        else{
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        mostrarMensagem(erro, "warning");
    });
    
    formCadastro.reset();
    document.getElementById("numpRegister").disabled = false;
    document.getElementById("atualizar").disabled = true;
    document.getElementById("cadastrar").disabled = false;
    document.getElementById("excluir").disabled = true;
}

function mostrarMensagem(mensagem, tipo="success"){
    const aviso = document.getElementById("alert-message");
    aviso.innerHTML = `<div class="alert alert-${tipo}" role="alert">Mensagem: ${mensagem}</div>`
    setInterval(() => {
        aviso.innerHTML = "";
    }, 5000);
}

function exibindoTabela(numeroPGET = ""){
    fetch(`http://localhost:3400/partido/${numeroPGET}`, {
        method: "GET"
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            const clientes = dadosRecebidos.clientes;
            if (clientes.length > 0){
                const divTable = document.getElementById("get-tab");
                divTable.innerHTML = "";
                const table = document.createElement("table");
                table.className = "table table-striped table-hover";
                const header = document.createElement("thead");
                const body = document.createElement("tbody");
                header.innerHTML = `
                    <tr>
                        <th>Numero</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th>Ações</th>
                    </tr>
                `;
                table.appendChild(header);
                for (let i = 0; i < clientes.length; i++){
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td>${clientes[i].numeroP}</td>
                        <td>${clientes[i].nomePartido}</td>
                        <td>${clientes[i].sigla}</td>
                        <td>
                            <button style="width:60px" class="btn btn-sm btn-warning" onclick="btnPegarDados(
                            '${clientes[i].numeroP}',
                            '${clientes[i].nomePartido}',
                            '${clientes[i].sigla}','atualizar'
                            )">Editar<button>
                            <button style="width:60px" class="btn btn-sm btn-danger" onclick="btnPegarDados(
                            '${clientes[i].numeroP}',
                            '${clientes[i].nomePartido}',
                            '${clientes[i].sigla}','excluir'
                            )">Delete</button>
                        </td>
                    `;
                    table.appendChild(linha);
                }
                table.appendChild(body);
                divTable.appendChild(table);
            }
            else{
                mostrarMensagem("Não há partido", "warning");
            }
        }
        else{
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        mostrarMensagem(erro, "warning");
    })
}

function btnPegarDados(numeroP, nome, sigla, acao="atualizar"){
    document.getElementById("numpRegister").value = numeroP;
    document.getElementById("nameRegister").value = nome;
    document.getElementById("siglaRegister").value = sigla;

    if (acao == "atualizar"){
        document.getElementById("numpRegister").disabled = true;
        document.getElementById("atualizar").disabled = false;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = true;
    }
    else if (acao == "excluir"){
        document.getElementById("numpRegister").disabled = true;
        document.getElementById("atualizar").disabled = true;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = false;
    }
}

formCadastro.onsubmit = manipularForm;
document.getElementById("atualizar").onclick = atualizando
document.getElementById("excluir").onclick = excluindo
exibindoTabela();