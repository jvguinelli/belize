import socketIOClient from 'socket.io-client'

import { listaParaObjeto } from '../../utils/reactUtils'

import { fecharModal } from '../comunicacao/modal/modalActions'

const URL = 'http://0.0.0.0:5000/'

var socket = null


export const conectar = (dispatch, getState) => {
    socket = socketIOClient.connect(URL)

    socket.on('NOVA_MENSAGEM', mensagem => {
        var rota_atual = getState().router.location.hash
        var tipo = (mensagem.canal_destinatario === null) ? 'usuarios' : 'canais'
        var id = (tipo == 'canais') ? mensagem.canal_destinatario.id : mensagem.usuario_destinatario.id
        var id_usuario_logado = getState().autenticacao.usuario.id
        var rota_destino = `#/comunicacao/${tipo}/${id}`
        
        if (rota_atual == rota_destino) {
            dispatch({ type: 'NOVA_MENSAGEM', payload: mensagem })
        } else if (tipo == 'usuarios') {
            if (id !== id_usuario_logado)
                dispatch({ type: 'INCREMETAR_MENSAGENS_NAO_LIDAS_DO_USUARIO', payload: id })
        } else {
            dispatch({ type: 'INCREMETAR_MENSAGENS_NAO_LIDAS_DO_CANAL', payload: id })
        }

    })

    socket.on('NOVA_REACAO_A_MENSAGEM', dado => {
        var reacoes = getState().mensagens.mensagens[dado.mensagem.id].reacoes
        var reacao = null
        
        for (var chave in reacoes) {
            if(reacoes[chave].id_usuario == dado.reacao.id_usuario)
                reacao = reacoes[chave]
        }

        if( reacao == null ) {
            dispatch({ type: 'ADICIONAR_REACAO_A_MENSAGEM', payload: dado })
        } else if( reacao.id_tipo_reacao == dado.reacao.id_tipo_reacao ) {
            dispatch({ type: 'REMOVER_REACAO_A_MENSAGEM', payload: dado })
        } else {
            dispatch({ type: 'ATUALIZAR_REACAO_A_MENSAGEM', payload: dado })
        }
    })

    socket.on('NOVO_CANAL', canal => {
        canal = JSON.parse(canal)
        canal.qtd_msgs_nao_lidas = 0
        dispatch({type: 'NOVO_CANAL', payload: canal})
        dispatch(fecharModal())
    })

    socket.on('INFORMAR_USUARIOS_PARA_CANAL', usuarios => {
        usuarios = listaParaObjeto(JSON.parse(usuarios)) 
        dispatch({type: 'INFORMAR_USUARIOS_PARA_CANAL', payload: usuarios})
    })
}

export function belizeMiddleware() {
    return next => action => {
        const result = next(action);

        if (socket) {
            switch (action.type) {
                case 'INFORMAR_CANAIS':
                case 'INFORMAR_USUARIOS':
                case 'INFORMAR_USUARIO_LOGADO':
                case 'NOTIFICAR_NOVA_MENSAGEM':
                case 'REAGIR_A_MENSAGEM':
                case 'CADASTRAR_CANAL':
                case 'BUSCAR_USUARIOS_PARA_ADICIONAR_AO_CANAL':
                case 'ADICIONAR_USUARIO_AO_CANAL':
                    console.log("CASE: ".concat(action.type))
                    socket.emit(action.type, action.payload)
                    break
                default:
                    break
            }
        }

        return result;
    };
}

export const emit = (acao, dado) => {
    socket.emit(acao, dado)
}