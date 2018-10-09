const INITIAL_STATE = { canais: [], usuarios: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BUSCAR_USUARIOS':
            console.log('passou')
            return { ...state, usuarios: action.payload }
        case 'BUSCAR_CANAIS':
            return { ...state, canais: action.payload }
        default:
            return { ...state }
    }
}