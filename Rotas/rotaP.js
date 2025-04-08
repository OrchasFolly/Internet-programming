import { Router } from "express";
import PartidoControl from "../Controller/partidoControl.js";

const rotaPartido = new Router();
const partidoControl = new PartidoControl()

// Definição de endpoints do candidato
rotaPartido.post('/', partidoControl.gravar)
.put('/',partidoControl.alterar)
.delete('/',partidoControl.excluir)
.get('/',partidoControl.consultar)
.get('/:numeroP',partidoControl.consultar);

export default rotaPartido;

