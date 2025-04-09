import conectar from "./conexao.js";
import Candidato from "../Model/Candidato.js";
export default class CandidatoDB{

    constructor(){
        this.init();
    }

    async init(){
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS candidato (
                numero VARCHAR(14) NOT NULL PRIMARY KEY,
                titulo INT NOT NULL,
                nomeCandidato VARCHAR(100) NOT NULL,
                partido VARCHAR(150) NOT NULL,
                uf VARCHAR(20) NOT NULL,
                cidade VARCHAR(50) NOT NULL,
                endereco VARCHAR(50) NOT NULL
            )`;
            await conexao.execute(sql);
        } catch ( erro ) {
            console.log("Erro ao iniciar a tabela candidato:" + erro);
        }

    }

    async gravar(cliente){
        if (cliente instanceof Candidato){
            const conexao = await conectar();
            const sql = `INSERT INTO candidato (numero, nomeCandidato, titulo, partido, uf, cidade, endereco)
                         VALUES ( ?, ?, ?, ?, ?, ?, ? )`;
            const parametros = [
                cliente.numero,
                cliente.nomeCandidato,
                cliente.titulo,
                cliente.partido,
                cliente.uf,
                cliente.cidade,
                cliente.endereco
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
                         
        }
    }

    async alterar(cliente){
        if (cliente instanceof Candidato){
            const conexao = await conectar();
            const sql = `UPDATE candidato SET 
                         nomeCandidato = ?, titulo = ?, partido = ?, uf = ?, cidade = ?, endereco = ?
                         WHERE numero = ?`;            
            const parametros = [
                cliente.nomeCandidato,
                cliente.titulo,
                cliente.partido,
                cliente.uf,
                cliente.cidade,
                cliente.endereco,
                cliente.numero
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(cliente){
        if (cliente instanceof Candidato){
            const conexao = await conectar();
            const sql = `DELETE FROM candidato WHERE numero = ?`;
            const parametros = [cliente.numero];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(){
        const conexao = await conectar();
        const sql = `SELECT * FROM candidato ORDER BY nomeCandidato`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Candidato(registro.numero,
                                        registro.nomeCandidato,
                                        registro.titulo,
                                        registro.partido,
                                        registro.uf,
                                        registro.cidade,
                                        registro.endereco
                                        );
            listaClientes.push(cliente);
                                    
        }
        return listaClientes;
    }
    
    async consultarPelaChave(numero){
        const conexao = await conectar();
        const sql = `SELECT * FROM candidato WHERE numero = ?`;
        const [registros, campos] = await conexao.execute(sql, [numero]);
        await conexao.release();
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Candidato(registro.numero,
                                        registro.nomeCandidato,
                                        registro.titulo,
                                        registro.partido,
                                        registro.uf,
                                        registro.cidade,
                                        registro.endereco
                                        );
            listaClientes.push(cliente);
                                    
        }
        return listaClientes;
    }
}