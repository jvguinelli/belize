import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Label, List } from 'semantic-ui-react'


import { buscarCanais } from './canalActions'

class ListaDeCanais extends Component {

    componentDidMount() {
        this.props.buscarCanais()
    }

    render() {
        const { subrota, idSubrota, canais, onItemClick } = this.props
        var tipo = "canais"
        return (
            <List selection verticalAlign="middle">
                {
                    Object.keys(canais).map(id => {
                        const item = canais[id]
                        const mesmaRota = (subrota === tipo && idSubrota === id)

                        const notificacoes = (item.qtd_msgs_nao_lidas === 0)
                            ? <Label style={{ visibility: 'hidden' }} circular color="teal" size="mini"> {item.qtd_msgs_nao_lidas} </Label>
                            : <Label circular color="teal" size="mini"> {item.qtd_msgs_nao_lidas} </Label>
                        return (
                            <List.Item active={mesmaRota}
                                key={"canais_".concat(id)}
                                onClick={() => onItemClick(event, mesmaRota, tipo, id)}
                                href={"#/comunicacao/canais/".concat(id)}>
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
    canais: state.listaDeCanais.canais
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        buscarCanais
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListaDeCanais)

