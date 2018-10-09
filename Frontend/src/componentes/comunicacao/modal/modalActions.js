
export const abrirAdicionarCanal = () => {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_MODAL',
            modalType: 'ADICIONAR_CANAL',
            modalProps: {}
        })
    }
}

export const abrirAdicionarUsuarioAoCanal = (id_canal) => {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_MODAL',
            modalType: 'ADICIONAR_USUARIO_AO_CASAL',
            modalProps: { id_canal }
        })
    }
}

export const fecharModal = () => {
    return (dispatch) => {
        dispatch({
            type: 'HIDE_MODAL'
        })
    }
}