import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import { Comment, Grid } from 'semantic-ui-react'

import FormComunicacao from './FormComunicacao'
import HeaderAreaDeComunicacao from './HeaderAreaDeComunicacao'
import Mensagem from './Mensagem'
import MensagemDeReferencia from './MensagemDeReferencia'

import { responderClick } from './mensagemActions'

class AreaDeComunicacao extends Component {
    render() {
        var { subrota, id } = this.props.match.params
        var { id_mensagem_referencia, canais, usuarios } = this.props
        var class_mensagem_referencia = (id_mensagem_referencia == 0) ? "none" : ""
        var class_area_comunicacao = (id_mensagem_referencia == 0) ? 
            "area-comunicacao" : "area-comunicacao-resposta"
        var elemento = (subrota === "canais") ? canais[id] : usuarios[id]

        return (
            <Grid.Column className="div-100 no-scroll no-padding-left no-padding-bottom" width={14}>
                <Grid.Row className={"div-100 ".concat(class_area_comunicacao)}>
                    <Grid.Column className="div-100 ">
                        <HeaderAreaDeComunicacao subrota={subrota} elemento={elemento}/>
                        <Grid.Row className="div-100 area-mensagem">
                            <Grid.Column className="div-100 no-x-scroll mensagens">
                                <Comment.Group size="small">
                                    <Mensagem {...this.props} />
                                </Comment.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className={class_mensagem_referencia}>
                    <MensagemDeReferencia {...this.props} />
                </Grid.Row>
                <Grid.Row>
                    <FormComunicacao {...this.props} elemento={elemento}/>
                </Grid.Row>
            </Grid.Column>
        )
    }
}

const mapStateToProps = state => {
    const selector = formValueSelector('formularioDeComunicacao')
    return {
        id_mensagem_referencia: selector(state, 'id_mensagem_referencia'),
        mensagens: state.mensagens.mensagens,
        usuarios: state.listaDeUsuarios.usuarios,
        canais: state.listaDeCanais.canais
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        responderClick
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AreaDeComunicacao)

// Mudar padding-bottom e margin-bottom da area-comunicacao