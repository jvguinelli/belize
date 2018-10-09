import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Form } from 'semantic-ui-react'

import { enviarMsg } from './mensagemActions'

import ReduxFormControl from '../../utils/ReduxFormControl'
class FormComunicacao extends Component {
    render() {
        const { handleSubmit } = this.props
        return (
            <Form className="area-comunicacao-form" onSubmit={handleSubmit} size="large">
                <Field
                    component="input"
                    name="id_mensagem_referencia"
                    type="hidden" />

                <Field
                    component="input"
                    name="tipo"
                    type="hidden" />
                <Field
                    component="input"
                    name="id"
                    type="hidden" />

                <Field
                    component={ReduxFormControl}
                    name="mensagem"
                    placeholder={`Para: ${this.props.elemento.nome}`}
                    action={{ color: 'blue', icon: 'send', name: 'enviar' }} />
            </Form>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        initialValues: {
            id: props.elemento.id,
            tipo: props.match.params.subrota,
            id_mensagem_referencia: 0
        }
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        onSubmit: enviarMsg,
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'formularioDeComunicacao',
    enableReinitialize: true
})(FormComunicacao))
