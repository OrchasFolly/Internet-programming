import CandidatoDB from "../DataBase/candidatoDB.js";
export default class Candidato {

    #numero;
    #nomeCandidato;
    #titulo;
    #partido;
    #uf;
    #cidade;
    #endereco;

    constructor(numero, nomeCandidato, titulo, partido, uf, cidade, endereco) {
        this.#numero = numero;
        this.#nomeCandidato = nomeCandidato;
        this.#titulo = titulo;
        this.#partido = partido;
        this.#uf = uf;
        this.#cidade = cidade;
        this.#endereco = endereco;
    }

    

    get numero() {
        return this.#numero;
    }

    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    get nomeCandidato() {
        return this.#nomeCandidato;
    }

    set nomeCandidato(novoNome) {    
        this.#nomeCandidato = novoNome;
    }

    get titulo() {
        return this.#titulo;
    }

    set titulo(novoTitulo) {    
        this.#titulo = novoTitulo;
    }

    get partido() {
        return this.#partido;
    }

    set partido(novoPartido) {    
        this.#partido = novoPartido;
    }

    get uf() {
        return this.#uf;
    }

    set uf(novaUF) {    
        this.#uf = novaUF;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {    
        this.#cidade = novaCidade;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {    
        this.#endereco = novoEndereco;
    }

    //formato JSON de um objeto
    toJSON(){
        return {
            "numero": this.#numero,
            "nomeCandidato": this.#nomeCandidato,
            "titulo": this.#titulo,
            "partido": this.#partido,
            "uf": this.#uf,
            "cidade": this.#cidade,
            "endereco": this.#endereco,
        }
    }

    async gravar(){
        const candDB = new CandidatoDB();
        candDB.gravar(this);
    }

    async alterar(){
        const candDB = new CandidatoDB();
        candDB.alterar(this);
    }

    async excluir(){
        const candDB = new CandidatoDB();
        candDB.excluir(this);
    }

    async consultar(){
        const candDB = new CandidatoDB();
        return await candDB.consultar(this);
    }

    async consultarPelaChave(numero){
        const candDB = new CandidatoDB();
        return await candDB.consultarPelaChave(numero);
    }
}