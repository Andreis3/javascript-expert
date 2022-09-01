export default class Marketing {
    update({ id, UserName }){
        // importante lembrar que o [update] é responsável por gerenciar seus erros/exceptions
        // nao deve-se ter await no notify porque a responsabilidade do notify é só emitir eventos
        // só notificar todo mundo
        console.log(`[${id}]: [marketing] will pack the users order to ${UserName}`);
    }
}