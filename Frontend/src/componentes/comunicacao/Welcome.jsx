import React, { Component } from 'react'

import { Grid } from 'semantic-ui-react'

export default class Welcome extends Component {
    render() {
        return (
            // <Grid.Column className="div-100 no-scroll">
            <Grid.Column>
                Bem Vindo!
            </Grid.Column>
        )
    }
}