import qs from 'querystring'
import { SubmissionError } from 'redux-form'

import cliente from '../../utils/request'
import {conectar} from '../websocket/websocket'

export const realizarLogin = (dadosDoForm) => {
    return (dispatch, getState) => {
        cliente.post(`/login`, qs.stringify(dadosDoForm))
            .then(resp => {
                conectar(dispatch, getState)
                const usuario = (resp.data == null) ? {} : resp.data
                dispatch({ type: 'INFORMAR_USUARIO_LOGADO', payload: usuario })
            })
            .catch( () => {
                throw new SubmissionError({
                    error: "Login e/ou usuários inválidos."
                })
            })//pensar no que fazer
    }
}

export const realizarLogout = (e) => {
    return (dispatch) => {
        cliente.get(`/logout`)
            .then(resp => {
                dispatch({ type: 'INFORMAR_USUARIO_LOGADO', payload: null })
            })
            .catch()//pensar no que fazer
    }
}

export const estaLogado = () => {
    return (dispatch, getState) => {
        cliente.get(`/esta_logado`)
            .then(resp => {
                conectar(dispatch, getState)
                dispatch({ type: 'INFORMAR_USUARIO_LOGADO', payload: resp.data })
            })
            .catch(() => {
                dispatch({ type: 'INFORMAR_USUARIO_LOGADO', payload: null })
            })
    }
}

export const informarQueEstaVerificandoLogin = () => ({
    type: 'INFORMAR_STATUS',
    payload: true
})