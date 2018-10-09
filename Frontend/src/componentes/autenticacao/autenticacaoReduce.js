const INITIAL_STATE = { usuario: null, verificandoLogin: false }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'INFORMAR_USUARIO_LOGADO':
            return { ...state, usuario: action.payload, verificandoLogin: false }
        case 'INFORMAR_STATUS':
            return { ...state, verificandoLogin: action.payload }
        default:
            return { ...state }
    }
}

