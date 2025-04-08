import conectar from "./conexao.js";
import Partido from "../Model/partido.js";
export default class PartidoDB{

    constructor(){
        this.init();
    }

    async init(){
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS partido (
                numeroP VARCHAR(14) NOT NULL PRIMARY KEY,
                nomePartido VARCHAR(100) NOT NULL,
                sigla VARCHAR(10) NOT NULL
            )`;
            await conexao.execute(sql);
        } catch ( erro ) {
            console.log("Erro ao iniciar a tabela partido:" + erro);
        }

    }

    async gravar(cliente){
        if (cliente instanceof Partido){
            const conexao = await conectar();
            const sql = `INSERT INTO partido (numeroP, nomePartido, sigla)
                         VALUES ( ?, ?, ? )`;
            const parametros = [
                cliente.numeroP,
                cliente.nomePartido,
                cliente.sigla
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
                         
        }
    }

    async alterar(cliente){
        if (cliente instanceof Partido){
            const conexao = await conectar();
            const sql = `UPDATE partido SET 
                         nomePartido = ?, sigla = ?
                         WHERE numeroP = ?`;            
            const parametros = [
                cliente.nomePartido,
                cliente.sigla,
                cliente.numeroP
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(cliente){
        if (cliente instanceof Partido){
            const conexao = await conectar();
            const sql = `DELETE FROM partido WHERE numeroP = ?`;
            const parametros = [cliente.numeroP];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(){
        const conexao = await conectar();
        const sql = `SELECT * FROM partido ORDER BY nomePartido`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Partido(registro.numeroP,
                                        registro.nomePartido,
                                        registro.sigla
                                        );
            listaClientes.push(cliente);
                                    
        }
        return listaClientes;
    }
    
    async consultarPeloCPF(numeroP){
        const conexao = await conectar();
        const sql = `SELECT * FROM partido WHERE numeroP = ?`;
        const [registros, campos] = await conexao.execute(sql, [numeroP]);
        await conexao.release();
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Partido(registro.numeroP,
                                        registro.nomePartido,
                                        registro.sigla
                                        );
            listaClientes.push(cliente);
                                    
        }
        return listaClientes;
    }
}