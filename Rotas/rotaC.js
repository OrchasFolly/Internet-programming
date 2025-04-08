import { Router } from "express";
import CandidatoControl from "../Controller/candidatoControl.js";

const rotaCandidato = new Router();
const candidatoControl = new CandidatoControl();

// Definição de endpoints do candidato
rotaCandidato.post('/', candidatoControl.gravar)
.put('/',candidatoControl.alterar)
.delete('/',candidatoControl.excluir)
.get('/',candidatoControl.consultar)
.get('/:numero',candidatoControl.consultar);

export default rotaCandidato;

