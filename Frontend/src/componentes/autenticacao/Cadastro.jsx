import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { realizarLogin } from './autenticacaoActions'

import ReduxFormControl from './../../utils/ReduxFormControl'

class Cadastro extends Component {

    render() {
        const { error, handleSubmit, submitting } = this.props

        return (
            <Grid className="div-100" verticalAlign="middle" centered>
                <Grid.Column width={6}>
                    <Header as='h2' color='blue' textAlign='center'>
                        Cadastre-se abaixo
                    </Header>
                    <Form onSubmit={handleSubmit} size='large'>
                        <Segment>
                            <Field
                                component={ReduxFormControl}
                                name="workspace"
                                placeholder="Workspace"
                                type="text"
                                fluid
                                iconPosition='left' />

                            <Field
                                component={ReduxFormControl}
                                name="nome"
                                placeholder="Nome"
                                type="text"
                                fluid
                                iconPosition='left' />
                            
                            <Field
                                component={ReduxFormControl}
                                name="sobrenome"
                                placeholder="Sobrenome"
                                type="text"
                                fluid
                                iconPosition='left' />

                            <Field
                                component={ReduxFormControl}
                                name="email"
                                placeholder="e-mail"
                                type="text"
                                fluid
                                iconPosition='left' />

                            <Field
                                component={ReduxFormControl}
                                id="senha"
                                name="senha"
                                placeholder="Senha"
                                type="password"
                                fluid
                                iconPosition='left' />
                            {error && <strong>{error}</strong>}
                            <Button color='blue' fluid size='large'>
                                Cadastrar
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
                        Já é cadastrado? Realize o seu <a href='#/login'>Login</a>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

Cadastro = reduxForm({
    form: 'formularioDeCadastro'
})(Cadastro)

const mapStateToProps = state => ({
    estaLogado: state.autenticacao.estaLogado,
    usuario: state.autenticacao.usuario
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ onSubmit: realizarLogin }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro)

