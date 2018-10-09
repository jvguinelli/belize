import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AnaliseDeRede from '../analiseDeRede/AnaliseDeRede'
import Cadastro from './Cadastro'
import Comunicacao from '../comunicacao/Comunicacao'
import Login from './Login'

const ControleDeAcesso = props => {
    if (props.usuario !== null) {
        return (
            <Switch>
                <Route exact path="/comunicacao" component={Comunicacao} />
                <Route exact path="/comunicacao/:subrota/:id" component={Comunicacao}/>
                <Route exact path="/analisederede" component={AnaliseDeRede} />
                <Redirect to="/comunicacao" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/cadastro" component={Cadastro} />
            <Redirect from="*" to="/login" />
        </Switch>
    )
}

export default ControleDeAcesso