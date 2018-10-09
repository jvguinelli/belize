import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Label, List } from 'semantic-ui-react'

import { buscarUsuarios } from './usuarioActions'

class ListaDeUsuarios extends Component {

    componentDidMount() {
        this.props.buscarUsuarios()
    }

    render() {
        const { subrota, idSubrota, usuarios, onItemClick } = this.props
        var tipo = "usuarios"
        return (
            <List selection verticalAlign="middle">
                {
                    Object.keys(usuarios).map(id => {
                        const item = usuarios[id]
                        const mesmaRota = (subrota === tipo && idSubrota === id)

                        const notificacoes = (item.qtd_msgs_nao_lidas === 0)
                            ? <Label style={{ visibility: 'hidden' }} circular color="teal" size="mini"> {item.qtd_msgs_nao_lidas} </Label>
                            : <Label circular color="teal" size="mini"> {item.qtd_msgs_nao_lidas} </Label>
                        return (
                            <List.Item active={mesmaRota}
                                key={"usuarios_".concat(id)}
                                onClick={() => onItemClick(event, mesmaRota, tipo, id)}
                                href={"#/comunicacao/usuarios/".concat(id)}>
                                <List.Content floated="left">
                                    {item.nome}
                                </List.Content>
                                <List.Content floated="right">
                                    {notificacoes}
                                </List.Content>
                            </List.Item>)
                    })
                }
            </List>
        )
    }
}

const mapStateToProps = state => ({
    usuarios: state.listaDeUsuarios.usuarios
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        buscarUsuarios
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListaDeUsuarios)