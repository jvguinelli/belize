import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import autenticacaoReducer from './autenticacao/autenticacaoReduce'
import canalReducer from './comunicacao/canalReducer'
import mensagemReducer from './comunicacao/mensagemReducer'
import modalReducer from './comunicacao/modal/modalReducer'
import usuarioReducer from './comunicacao/usuarioReducer'
import usuariosParaCanalReducer from './comunicacao/usuariosParaCanalReducer'


const rootReducer = combineReducers({
    listaDeCanais: canalReducer,
    listaDeUsuarios: usuarioReducer,
    mensagens: mensagemReducer,
    autenticacao: autenticacaoReducer,
    form: formReducer,
    modal: modalReducer,
    usuariosParaCanal: usuariosParaCanalReducer
})

export default rootReducer