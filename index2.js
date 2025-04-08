import express from 'express';
import session from "express-session";
import autenticar from "./secure/auten.js";
import rotaCandidato from './Rotas/rotaC.js';
import rotaPartido from './Rotas/rotaP.js';

const porta = 3400;
const localhost = "localhost"; // "0.0.0.0"
const app = express();

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(session({
    // Para fins acadêmicos
    secret: "Dk24DFE23vFE3gCFF434Se2Cr42DEX",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}));

app.use('/clientes', rotaCandidato);
app.use('/partido', rotaPartido);

// Oferecer um recurso de login
app.get("/login", (req, resp) => {
    resp.redirect("/login.html");
});

app.post("/login", (req, resp) => {
    const user = req.body.nameValid;
    const pass = req.body.passValid;
    if(user == "Admin" && pass == "Admin"){
        req.session.autenticado = true;
        resp.redirect("/index.html");
    } else{
        resp.redirect("/login.html");
    }
});

// Oferecer um recurso de logout
app.get("/logout", (req, resp) => {
    req.session.autenticado = false;
    resp.redirect("/index.html");
});

app.use(express.static("./public"));

app.use(autenticar, express.static("./private"));

app.listen(porta,localhost, ()=>{
    console.log(`Backend e Servidor rodando em http://${localhost}:${porta}`);
});