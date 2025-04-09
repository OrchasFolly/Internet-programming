
const formCadastro = document.getElementById("formCandidato");
const endpoint = "http://localhost:3400/clientes";

function manipularForm(evento){
    if (!formCadastro.checkValidity()){
        formCadastro.classList.add('was-validated');
    }
    else{
        cadastrando();
        atualizando();
        formCadastro.reset();
        exibindoTabela();
    }
    evento.preventDefault();
    evento.stopPropagation();
}

function pegandoDados(){
    const numero = document.getElementById("numRegister").value;
    const nomeCandidato = document.getElementById("nameRegister").value;
    const titulo = document.getElementById("tituloRegister").value;
    const partido = document.getElementById("partRegister").value;
    const uf = document.getElementById("ufRegister").value;
    const cidade = document.getElementById("cidadeRegister").value;
    const endereco = document.getElementById("endRegister").value;

    return {
        "numero": numero,
        "nomeCandidato": nomeCandidato,
        "titulo": titulo,
        "partido": partido,
        "uf": uf,
        "cidade": cidade,
        "endereco": endereco,
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
    document.getElementById("numRegister").disabled = false;
    document.getElementById("atualizar").disabled = true;
    document.getElementById("cadastrar").disabled = false;
    document.getElementById("excluir").disabled = true;
}

function excluindo(){
    fetch(endpoint, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            numero: document.getElementById("numRegister").value
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
    document.getElementById("numRegister").disabled = false;
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

function exibindoTabela(numeroGET = ""){
    fetch(`http://localhost:3400/clientes/${numeroGET}`, {
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
                        <th>Titulo</th>
                        <th>Partido</th>
                        <th>UF</th>
                        <th>Cidade</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                `;
                table.appendChild(header);
                for (let i = 0; i < clientes.length; i++){
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td style="background-color: aliceblue;">${clientes[i].numero}</td>
                        <td style="background-color: aliceblue;">${clientes[i].nomeCandidato}</td>
                        <td style="background-color: aliceblue;">${clientes[i].titulo}</td>
                        <td style="background-color: aliceblue;">${clientes[i].partido}</td>
                        <td style="background-color: aliceblue;">${clientes[i].uf}</td>
                        <td style="background-color: aliceblue;">${clientes[i].cidade}</td>
                        <td style="background-color: aliceblue;">${clientes[i].endereco}</td>
                        <td>
                            <button style="width:60px;" class="btn btn-sm btn-warning" onclick="btnPegarDados(
                            '${clientes[i].numero}',
                            '${clientes[i].nomeCandidato}',
                            '${clientes[i].titulo}',
                            '${clientes[i].partido}',
                            '${clientes[i].uf}',
                            '${clientes[i].cidade}',
                            '${clientes[i].endereco}','atualizar'
                            )">Editar<button>
                            <button style="width:60px" class="btn btn-sm btn-danger" onclick="btnPegarDados(
                            '${clientes[i].numero}',
                            '${clientes[i].nomeCandidato}',
                            '${clientes[i].titulo}',
                            '${clientes[i].partido}',
                            '${clientes[i].uf}',
                            '${clientes[i].cidade}',
                            '${clientes[i].endereco}','excluir'
                            )">Delete</button>
                        </td>
                    `;
                    table.appendChild(linha);
                }
                table.appendChild(body);
                divTable.appendChild(table);
            }
            else{
                mostrarMensagem("Não há candidato", "warning");
            }
        }
        else{
            mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        mostrarMensagem(erro, "warning");
    })
}

function btnPegarDados(numero, nome, titulo, partido, uf, cidade, endereco, acao="atualizar"){
    document.getElementById("numRegister").value = numero;
    document.getElementById("nameRegister").value = nome;
    document.getElementById("tituloRegister").value = titulo;
    document.getElementById("partRegister").value = partido;
    document.getElementById("ufRegister").value = uf;
    document.getElementById("cidadeRegister").value = cidade;
    document.getElementById("endRegister").value = endereco;

    if (acao == "atualizar"){
        document.getElementById("numRegister").disabled = true;
        document.getElementById("atualizar").disabled = false;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = true;
    }
    else if (acao == "excluir"){
        document.getElementById("numRegister").disabled = true;
        document.getElementById("atualizar").disabled = true;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = false;
    }
}

formCadastro.onsubmit = manipularForm;
document.getElementById("atualizar").onclick = atualizando
document.getElementById("excluir").onclick = excluindo
exibindoTabela();