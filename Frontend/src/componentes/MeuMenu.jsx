import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import { realizarLogout } from './autenticacao/autenticacaoActions'

class MeuMenu extends Component {
    render() {
        return (
            <Menu fluid stackable size='large'>
                <Menu.Item header active className="maior">
                    Belize
                </Menu.Item>
                <Menu.Item name="Comunicação" as={NavLink} exact to="/comunicacao"/>
                <Menu.Item name="Análise de Rede" as={NavLink} exact to="/analisederede"/>
                <Menu.Menu position="right" >
                    <Menu.Item name="Sair" onClick={this.props.realizarLogout} />
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ realizarLogout }, dispatch)

export default connect(null, mapDispatchToProps)(MeuMenu)

