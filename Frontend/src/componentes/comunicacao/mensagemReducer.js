const INITIAL_STATE = {
    mensagens: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'INFORMAR_MENSAGENS':
            return { ...state, mensagens: action.payload }
        // case 'INFORMAR_MENSAGENS':
        //     return {
        //         ...state, mensagens:
        //             { ...state.mensagens, [action.payload.id]: action.payload }
        //     }
        case 'NOVA_MENSAGEM':
            return {
                mensagens:
                    { ...state.mensagens, [action.payload.id]: action.payload }
            }
        case 'ADICIONAR_REACAO_A_MENSAGEM':
            var id = action.payload.mensagem.id
            return {
                mensagens: {
                    ...state.mensagens,
                    [id]: {
                        ...state.mensagens[id],
                        reacoes: [
                            ...state.mensagens[id].reacoes,
                            action.payload.reacao
                        ]
                    }
                }
            }
        case 'ATUALIZAR_REACAO_A_MENSAGEM':
            var id = action.payload.mensagem.id
            var nova_reacao = action.payload.reacao
            return {
                mensagens: {
                    ...state.mensagens,
                    [id]: {
                        ...state.mensagens[id],
                        reacoes: [
                            ...state.mensagens[id].reacoes.map(reacao => {
                                if (reacao.id_usuario == nova_reacao.id_usuario) {
                                    return { ...reacao, ...nova_reacao }
                                }
                                return { ...reacao }
                            })
                        ]
                    }
                }
            }
        case 'REMOVER_REACAO_A_MENSAGEM':
            var id = action.payload.mensagem.id
            var nova_reacao = action.payload.reacao
            return {
                mensagens: {
                    ...state.mensagens,
                    [id]: {
                        ...state.mensagens[id],
                        reacoes: [
                            ...state.mensagens[id].reacoes.map(reacao => {
                                if (reacao.id_usuario == nova_reacao.id_usuario) {
                                    return {}
                                }
                                return { ...reacao }
                            })
                        ]
                    }
                }
            }
        default:
            return { ...state }
    }
}