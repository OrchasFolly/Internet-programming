import PartidoDB from "../DataBase/partidoDB.js";
export default class Partido {

    #numeroP;
    #nomePartido;
    #sigla;

    constructor(numeroP, nomePartido, sigla) {
        this.#numeroP = numeroP;
        this.#nomePartido = nomePartido;
        this.#sigla = sigla;
    }

    

    get numeroP() {
        return this.#numeroP;
    }

    set numeroP(novoNumero) {
        this.#numeroP = novoNumero;
    }

    get nomePartido() {
        return this.#nomePartido;
    }

    set nomePartido(novoNome) {    
        this.#nomePartido = novoNome;
    }

    get sigla() {
        return this.#sigla;
    }

    set sigla(novaSigla) {    
        this.#sigla = novaSigla;
    }

    //formato JSON de um objeto
    toJSON(){
        return {
            "numeroP": this.#numeroP,
            "nomePartido": this.#nomePartido,
            "sigla": this.#sigla,
        }
    }

    async gravar(){
        const partDB = new PartidoDB();
        partDB.gravar(this);
    }

    async alterar(){
        const partDB = new PartidoDB();
        partDB.alterar(this);
    }

    async excluir(){
        const partDB = new PartidoDB();
        partDB.excluir(this);
    }

    async consultar(){
        const partDB = new PartidoDB();
        return await partDB.consultar(this);
    }

    async consultarPeloCPF(numeroP){
        const partDB = new PartidoDB();
        return await partDB.consultarPeloCPF(numeroP);
    }
}