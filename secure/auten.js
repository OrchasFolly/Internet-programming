export default function autenticar(req, resp, next) {
    if(req.session.autenticado === true){
        next();
    } else{
        resp.redirect("/login");
    }
}