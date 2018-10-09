import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Grid, Button } from 'semantic-ui-react'

import ListaDeCanais from './ListaDeCanais'
import ListaDeUsuarios from './ListaDeUsuarios'

import { buscarMsg } from './mensagemActions'
import { abrirAdicionarCanal } from './modal/modalActions'

class MenuLateralDeComunicacao extends Component {
    itemClick = (e, mesmaRota, tipo, id) => {
        if (mesmaRota)
            return false

        this.props.buscarMsg(tipo, id)
    }

    render() {
        const { abrirAdicionarCanal } = this.props
        return (
            <Grid.Column className="div-100 no-x-scroll no-padding-right" width={2} >
                <h5 className="sticky">Canais <Button onClick={abrirAdicionarCanal} size='small' basic compact icon='plus circle'/></h5>
                <ListaDeCanais
                    onItemClick={this.itemClick}
                    subrota={this.props.match.params.subrota}
                    idSubrota={this.props.match.params.id} />

                <h5 className="sticky">Usuarios</h5>
                <ListaDeUsuarios
                    onItemClick={this.itemClick}
                    subrota={this.props.match.params.subrota}
                    idSubrota={this.props.match.params.id} />
            </Grid.Column>
        )
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        abrirAdicionarCanal,
        buscarMsg
    }, dispatch)

export default connect(null, mapDispatchToProps)(MenuLateralDeComunicacao)