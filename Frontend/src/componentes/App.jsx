import React, { Component } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { estaLogado, informarQueEstaVerificandoLogin } from './autenticacao/autenticacaoActions'

import ControleDeAcesso from './autenticacao/ControleDeAcesso'
import ModalRoot from './comunicacao/modal/ModalRoot'

import './app.css';

class App extends Component {

    componentDidMount() {
        this.props.informarQueEstaVerificandoLogin()
        this.props.estaLogado()
    }

    render() {
        const { usuario, verificandoLogin } = this.props
        if (verificandoLogin) {
            return (
                <div className="spiner">
                    <h1>CARREGANDO</h1>
                    <i className="fa fa-refresh fa-spin"></i>
                </div>
            )
        }

        return (
            <React.Fragment>
                <Router>
                    <ControleDeAcesso usuario={usuario} />
                </Router>
                <ModalRoot />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.autenticacao.usuario,
    verificandoLogin: state.autenticacao.verificandoLogin
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ estaLogado, informarQueEstaVerificandoLogin }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
