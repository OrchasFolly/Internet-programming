import Candidato from "../Model/Candidato.js"

export default class CandidatoControl{

    gravar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const numero = dados.numero;
            const nome = dados.nomeCandidato;
            const titulo = dados.titulo;
            const partido = dados.partido;
            const uf = dados.uf;
            const cidade = dados.endereco;
            const endereco = dados.endereco;

            if(numero && nome && titulo && partido && uf && cidade && endereco){
                const cliente = new Candidato(numero, nome, titulo, partido, uf, cidade, endereco);
                cliente.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Gravado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Requisição PUT
    alterar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const numero = dados.numero;
            const nome = dados.nomeCandidato;
            const titulo = dados.titulo;
            const partido = dados.partido;
            const uf = dados.uf;
            const cidade = dados.endereco;
            const endereco = dados.endereco;

            if(numero && nome && titulo && partido && uf && cidade && endereco){
                const cliente = new Candidato(numero, nome, titulo, partido, uf, cidade, endereco);
                cliente.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Atualizado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Excluir dado
    excluir(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const numero = dados.numero;

            if(numero){
                const cliente = new Candidato(numero);
                cliente.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Deletado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Consultar todos os dados
    consultar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "GET"){
            const cliente = new Candidato();

            if (requisicao.params.numero){
                cliente.consultarPeloCPF(requisicao.params.numero).then((listaClientes) => {
                        resposta.status(200).json(
                            {
                                "status": true,
                                "clientes": listaClientes
                            }
                        );
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                cliente.consultar('').then((listaClientes) => {
                        resposta.status(200).json(
                            {
                                "status": true,
                                "clientes": listaClientes
                            }
                        );
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }
}