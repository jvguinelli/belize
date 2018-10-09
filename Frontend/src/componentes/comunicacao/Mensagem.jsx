import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


import { Comment, Label } from 'semantic-ui-react'

import { reagirAMsg } from './mensagemActions'

class Mensagem extends Component {

    qtd_reacoes(reacoes, tipo) {
        var qtd = 0
        reacoes.forEach(reacao => {
            if (reacao.id_tipo_reacao == tipo) {
                qtd++;
            }
        });
        if (qtd > 0)
            return qtd
    }

    render() {
        const { reagirAMsg, responderClick } = this.props
        const mensagens = this.props.mensagens || []
        return mensagens.map(mensagem => {
            var data_hora = new Date(mensagem.data_hora_envio)
            return (
                <Comment key={"mensagem_".concat(mensagem.id)}>
                    <Comment.Avatar src={mensagem.remetente.img} />
                    <Comment.Content>
                        <Comment.Author as="a">
                            {mensagem.remetente.nome} {mensagem.remetente.sobrenome}
                        </Comment.Author>
                        <Comment.Metadata>
                            <div>
                                {data_hora.toLocaleDateString()} - {data_hora.toLocaleTimeString()}
                            </div>
                        </Comment.Metadata>
                        <Comment.Text>
                            {mensagem.texto}
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action
                                onClick={() => reagirAMsg(mensagem, this.props.usuario.id, 1)}>
                                <Label
                                    content={this.qtd_reacoes(mensagem.reacoes, 1)}
                                    icon={{ name: 'smile outline', fitted: true }} />
                            </Comment.Action>
                            <Comment.Action
                                onClick={() => reagirAMsg(mensagem, this.props.usuario.id, 2)}>
                                <Label
                                    content={this.qtd_reacoes(mensagem.reacoes, 2)}
                                    icon={{ name: 'meh outline', fitted: true }} />
                            </Comment.Action>
                            <Comment.Action
                                onClick={() => reagirAMsg(mensagem, this.props.usuario.id, 3)}>
                                <Label content={this.qtd_reacoes(mensagem.reacoes, 3)}
                                    icon={{ name: 'frown outline', fitted: true }} />
                            </Comment.Action>
                            <Comment.Action
                                onClick={() => responderClick(mensagem.id)}>
                                Responder
                                    </Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            )
        }
        )
    }
}

const mapStateToProps = state => ({
    mensagens: Object.keys(state.mensagens.mensagens).map(key => {
        return state.mensagens.mensagens[key]
    }),
    usuarios: state.listaDeUsuarios.usuarios,
    usuario: state.autenticacao.usuario
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ reagirAMsg }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Mensagem)