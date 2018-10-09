import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'

import { Form, Modal, Button } from 'semantic-ui-react'

import { cadastrarCanal } from '../canalActions'
import { fecharModal } from './modalActions'

import ReduxFormControl from '../../../utils/ReduxFormControl'

class ModalAdicionarCanal extends Component {
    render() {
        const { handleSubmit } = this.props
        return (
            <Modal
                closeIcon="close"
                open={true}
                onClose={this.props.fecharModal} >
                <Modal.Header>Cadastro de Canal</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={handleSubmit} size='large'>
                            <Field
                                component={ReduxFormControl}
                                name="nome"
                                placeholder="Nome do Canal"
                                />
                            <Field
                                component={ReduxFormControl}
                                name="descricao"
                                placeholder="descricao"
                                />
                            <Button color='blue' fluid size='large'>
                                Cadastrar
                            </Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        onSubmit: cadastrarCanal,
        fecharModal
    }, dispatch)

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'formularioCadastroDeCanal'
})(ModalAdicionarCanal))