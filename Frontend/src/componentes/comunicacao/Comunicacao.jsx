import React, { Component } from 'react'

import { Grid } from 'semantic-ui-react'

import AreaDeComunicacao from './AreaDeComunicacao'
import MeuMenu from '../MeuMenu'
import MenuLateralDeComunicacao from './MenuLateralDeComunicacao'
import Ternario from '../../utils/Ternario'
import Welcome from './Welcome'

export default class Comunicacao extends Component {
    render() {
        const { subrota } = this.props.match.params
        return (
            <React.Fragment>
                <MeuMenu />
                <Grid >
                    <Grid.Row divided className="wrapper">
                        <MenuLateralDeComunicacao {...this.props} />
                        <Ternario {...this.props} teste={subrota == null} verdadeiro={Welcome} falso={AreaDeComunicacao} />
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
}