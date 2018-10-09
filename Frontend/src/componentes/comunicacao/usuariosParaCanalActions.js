export const buscarUsuariosParaAdicionarAoCanal = (id_canal) => {
    return (dispatch) => {
        dispatch({type: 'BUSCAR_USUARIOS_PARA_ADICIONAR_AO_CANAL', payload: id_canal})
    }   
}

export const adicionarUsuarioAoCanal = (idUsuario, idCanal) => {
    var dados = {id_usuario: idUsuario, id_canal: idCanal}
    return (dispatch) => { 
        dispatch({type: 'ADICIONAR_USUARIO_AO_CANAL', payload: dados})
    }
}