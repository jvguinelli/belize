const INITIAL_STATE = { usuarios: {} }

export default (state = INITIAL_STATE, action) => {
    var id
    switch (action.type) {
        case 'INFORMAR_USUARIOS':
            return { ...state, usuarios: action.payload }
        case 'ZERAR_MENSAGENS_NAO_LIDAS_DO_USUARIO':
            id = action.payload
            return {
                usuarios: {
                    ...state.usuarios,
                    [id]: {
                        ...state.usuarios[id],
                        qtd_msgs_nao_lidas: 0
                    }
                }
            }
        case 'INCREMETAR_MENSAGENS_NAO_LIDAS_DO_USUARIO':
            id = action.payload
            return {
                usuarios: {
                    ...state.usuarios,
                    [id]: {
                        ...state.usuarios[id],
                        qtd_msgs_nao_lidas: state.usuarios[id].qtd_msgs_nao_lidas + 1
                    }
                }
            }
        default:
            return { ...state }
    }
}