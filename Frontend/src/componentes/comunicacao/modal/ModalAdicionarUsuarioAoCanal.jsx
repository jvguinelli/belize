import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button, Image, List, Modal } from 'semantic-ui-react'

import { adicionarUsuarioAoCanal } from '../usuariosParaCanalActions'
import { fecharModal } from './modalActions'
import { buscarUsuariosParaAdicionarAoCanal } from '../usuariosParaCanalActions'

class ModalAdicionarUsuarioAoCanal extends Component {
    componentDidMount() {
        this.props.buscarUsuariosParaAdicionarAoCanal(this.props.id_canal)
    }

    render() {
        const { usuariosParaAdd, adicionarUsuarioAoCanal, id_canal } = this.props
        return (
            <Modal
                closeIcon="close"
                open={true}
                onClose={this.props.fecharModal} >
                <Modal.Header>Adicionar Usuario ao Canal</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <List divided verticalAlign='middle'>
                            {
                                Object.keys(usuariosParaAdd).map(id => {
                                    return (
                                        <List.Item key={id}>
                                            <List.Content floated='right'>
                                                <Button
                                                    onClick={() => adicionarUsuarioAoCanal(id, id_canal)} 
                                                    color='blue'>
                                                    Adicionar
                                                </Button>
                                            </List.Content>
                                            <Image avatar src={usuariosParaAdd[id].img} />
                                            <List.Content>
                                                {usuariosParaAdd[id].nome} {usuariosParaAdd[id].sobrenome}
                                            </List.Content>
                                        </List.Item>
                                    )
                                })
                            }
                        </List>
                    </Modal.Description>
                </Modal.Content>
            </Modal >
        )
    }
}

const mapStateToProps = state => ({
    usuariosParaAdd: state.usuariosParaCanal.usuarios
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fecharModal,
        buscarUsuariosParaAdicionarAoCanal,
        adicionarUsuarioAoCanal
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdicionarUsuarioAoCanal)