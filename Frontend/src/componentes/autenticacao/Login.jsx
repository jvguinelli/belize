import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { realizarLogin } from './autenticacaoActions'

import ReduxFormControl from '../../utils/ReduxFormControl'

class Login extends Component {

    render() {
        const { error, handleSubmit, submitting } = this.props

        return (
            <Grid className="div-100" verticalAlign="middle" centered>
                <Grid.Column width={6}>
                    <Header as='h2' color='blue' textAlign='center'>
                        Entre na sua conta
                    </Header>
                    <Form onSubmit={handleSubmit} size='large'>
                        <Segment>
                            <Field
                                component={ReduxFormControl}
                                name="workspace"
                                placeholder="Workspace"
                                type="text"
                                fluid
                                icon='users'
                                iconPosition='left' />

                            <Field
                                component={ReduxFormControl}
                                name="email"
                                placeholder="e-mail"
                                type="text"
                                fluid
                                icon='user'
                                iconPosition='left' />

                            <Field
                                component={ReduxFormControl}
                                id="senha"
                                name="senha"
                                placeholder="Senha"
                                type="password"
                                fluid
                                icon='lock'
                                iconPosition='left' />
                            {error && <strong>{error}</strong>}
                            <Button color='blue' fluid size='large'>
                                Entrar
                            </Button>
                        </Segment>
                    </Form>
                    {/* <Message
                        error
                        header='There was some errors with your submission'
                        list={[
                            'You must include both a upper and lower case letters in your password.',
                            'You need to select your home country.',
                        ]} /> */}
                    <Message>
                        Ainda não possui uma conta? <a href='#/cadastro'>Cadastre-se</a>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

Login = reduxForm({
    form: 'formularioDeLogin'
})(Login)

const mapStateToProps = state => ({
    estaLogado: state.autenticacao.estaLogado,
    usuario: state.autenticacao.usuario
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ onSubmit: realizarLogin }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)

