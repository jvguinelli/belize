import cliente from '../../utils/request'

import { listaParaObjeto } from '../../utils/reactUtils'

export const buscarCanais = () => {
    return (dispatch) => {
        cliente.get(`/canais`)
            .then(resp => {
                const canais = listaParaObjeto(resp.data)
                dispatch({ type: 'INFORMAR_CANAIS', payload: canais })
            })
            .catch()
    }
}

export const cadastrarCanal = (dadosDoForm) => {
    return (dispatch) => {
        dispatch({type: 'CADASTRAR_CANAL', payload: dadosDoForm})
    }
}