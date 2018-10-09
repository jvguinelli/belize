import cliente from '../../utils/request'
import { listaParaObjeto } from '../../utils/reactUtils'

export const buscarUsuarios = () => {
    return (dispatch, getState) => {
        cliente.get(`/usuarios`)
            .then(resp => {
                const usuarios = listaParaObjeto(resp.data)
                dispatch({ type: 'INFORMAR_USUARIOS', payload: usuarios })
            })
            .catch()
    }
}