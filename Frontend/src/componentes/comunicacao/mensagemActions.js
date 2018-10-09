import { reset } from 'redux-form'

import { listaParaObjeto } from '../../utils/reactUtils'
import cliente from '../../utils/request'
import { change } from 'redux-form'

export const enviarMsgParaCanal = (msg, canal, id_mensagem_referencia) => {
    const formData = new FormData()
    formData.set('msg', msg)
    formData.set('id_canal', canal.id)
    formData.set('id_mensagem_referencia', id_mensagem_referencia)

    return (dispatch) => {
        cliente.post(`/canais/${canal}/mensagens`, formData)
            .then((resp) => {
                dispatch({ type: 'NOTIFICAR_NOVA_MENSAGEM', payload: resp.data })
                dispatch(reset('formularioDeComunicacao'))
            })
    }
}

export const enviarMsgParaUsuario = (msg, usuario, id_mensagem_referencia) => {
    const formData = new FormData()
    formData.set('msg', msg)
    formData.set('id_usuario', usuario.id)
    formData.set('id_mensagem_referencia', id_mensagem_referencia)
    return (dispatch) => {
        cliente.post(`/usuarios/${usuario}/mensagens`, formData)
            .then((resp) => {
                dispatch({ type: 'NOTIFICAR_NOVA_MENSAGEM', payload: resp.data })
                dispatch(reset('formularioDeComunicacao'))
            })
    }
}

export const enviarMsg = (dadosDoForm) => {
    const { tipo, mensagem, id, id_mensagem_referencia } = dadosDoForm
    if (tipo == 'canais') {
        return enviarMsgParaCanal(mensagem, id, id_mensagem_referencia)
    }
    else {
        return enviarMsgParaUsuario(mensagem, id, id_mensagem_referencia)
    }
}

export const buscarMsg = (tipo, id) => {
    const rota = `/${tipo}/${id}/mensagens`
    
    return (dispatch) => {
        cliente.get(rota)
            .then(resp => {
                const mensagens = listaParaObjeto(resp.data)
                // for (var key in mensagens) {
                //     dispatch({ type: 'INFORMAR_MENSAGENS', payload: mensagens[key] })
                // }
                dispatch({ type: 'INFORMAR_MENSAGENS', payload: mensagens })

                if (tipo == "canais")
                    dispatch({ type: 'ZERAR_MENSAGENS_NAO_LIDAS_DO_CANAL', payload: id })
                else dispatch({ type: 'ZERAR_MENSAGENS_NAO_LIDAS_DO_USUARIO', payload: id })
            })
    }
}

export const reagirAMsg = (mensagem, id_usuario, id_tipo_reacao) => {
    var dados = {
        mensagem: mensagem,
        reacao: {
            id_usuario: id_usuario,
            id_tipo_reacao: id_tipo_reacao
        }
    }
    return { type: 'REAGIR_A_MENSAGEM', payload: dados }
}


export const responderClick = ( id ) => {
    return (dispatch) => {
        dispatch(change('formularioDeComunicacao', 'id_mensagem_referencia', id))
    }
}