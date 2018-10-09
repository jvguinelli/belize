import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Grid, Button } from 'semantic-ui-react'
import { abrirAdicionarUsuarioAoCanal } from './modal/modalActions'

import If from '../../utils/If'

class HeaderAreaDeComunicacao extends Component {
    render() {
        var { subrota, elemento, abrirAdicionarUsuarioAoCanal } = this.props
        return (
            <Grid.Row>
                <Grid.Column className="area-comunicacao-header">
                    <If test={subrota === "canais"}>
                        <h3 style={{ display: 'inline' }}>{elemento.nome}</h3>
                        <Button icon='add user' onClick={() => abrirAdicionarUsuarioAoCanal(elemento.id)} />
                    </If>
                    <If test={subrota === "usuarios"}>
                        <h3>{elemento.nome} {elemento.sobrenome}</h3>
                    </If>
                </Grid.Column>
            </Grid.Row >
        )
    }
}

const mapStateToProps = (dispatch) =>
    bindActionCreators({
        abrirAdicionarUsuarioAoCanal
    }, dispatch)

export default connect(null, mapStateToProps)(HeaderAreaDeComunicacao)