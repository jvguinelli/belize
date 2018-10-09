const INITIAL_STATE = {canais: {}}

export default (state = INITIAL_STATE, action) => {
    var id
    switch (action.type) {
        case 'INFORMAR_CANAIS':
            return { ...state, canais: action.payload }
        case 'ZERAR_MENSAGENS_NAO_LIDAS_DO_CANAL':
            id = action.payload
            return {
                canais: {
                    ...state.canais,
                    [id]: {
                        ...state.canais[id],
                        qtd_msgs_nao_lidas: 0
                    }
                }
            }
        case 'INCREMETAR_MENSAGENS_NAO_LIDAS_DO_CANAL':
            id = action.payload
            return {
                canais: {
                    ...state.canais,
                    [id]: {
                        ...state.canais[id],
                        qtd_msgs_nao_lidas: state.canais[id].qtd_msgs_nao_lidas + 1
                    }
                }
            }
        case 'NOVO_CANAL':
            id = action.payload.id
            return {
                canais:
                    { ...state.canais, [id]: action.payload }
            }
        default:
            return { ...state }
    }
}