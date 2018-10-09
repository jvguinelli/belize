import React from 'react'
import { connect } from 'react-redux'

import ModalAdicionarCanal from './ModalAdicionarCanal'
import ModalAdicionarUsuarioAoCanal from './ModalAdicionarUsuarioAoCanal'

const MODAL_COMPONENTS = {
    'ADICIONAR_CANAL': ModalAdicionarCanal,
    'ADICIONAR_USUARIO_AO_CASAL': ModalAdicionarUsuarioAoCanal
}

const ModalRoot = ({ modal }) => {
    const { modalType, modalProps } = modal
    if (!modalType) {
        return null
    }

    const SpecificModal = MODAL_COMPONENTS[modalType]
    return <SpecificModal {...modalProps} />
}

const mapStateToProps = state => ({
    modal: state.modal
})

export default connect(mapStateToProps)(ModalRoot)