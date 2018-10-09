const INITIAL_STATE = { usuarios: {} }


export default (state = INITIAL_STATE, action) => {
    var id
    switch (action.type) {
        case 'INFORMAR_USUARIOS_PARA_CANAL':
            return { ...state, usuarios: action.payload }
        default:
            return { ...state }
    }
}

