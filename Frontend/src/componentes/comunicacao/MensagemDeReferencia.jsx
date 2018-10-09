import React, { Component } from 'react'

import { Comment } from 'semantic-ui-react'

class MensagemDeReferencia extends Component {
    render() {
        var { id_mensagem_referencia, mensagens, responderClick } = this.props

        if (id_mensagem_referencia == null || id_mensagem_referencia < 1)
            return ""

        var mensagem = mensagens[id_mensagem_referencia]
        var data_hora = new Date(mensagem.data_hora_envio)

        return(
            < Comment.Group size="mini" minimal >
                <Comment>
                    <Comment.Content>
                        <Comment.Avatar src={mensagem.remetente.img} />
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
                                onClick={() => responderClick(0)}>
                                Fechar
                            </Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Comment.Group >
        )
    }
}

export default MensagemDeReferencia