import React, { Component } from 'react'

import { Dropdown, Grid, GridColumn, Statistic } from 'semantic-ui-react'

import MeuMenu from '../MeuMenu'

import cliente from '../../utils/request'

export default class Comunicacao extends Component {

    constructor() {
        super()
        this.state = {
            descricao_metrica: "Nenhuma métrica aplicada!"
        }
        this.realizarAnalise = this.realizarAnalise.bind(this)
        this.aoSelecionarMetrica = this.aoSelecionarMetrica.bind(this)
        this.options = [
            { key: "sem_metrica", text: "Visualização Simples", value: "sem_metrica" },
            { key: "grau_do_no", text: "Grau do Nó", value: "grau" },
            { key: "densidade_do_no", text: "Densidade do Nó", value: "densidade" },
            { key: "betweenness_centrality", text: "Grau de Intermediação", value: "betweenness_centrality" }
        ]
    }

    realizarAnalise(metrica) {
        cliente.get(`/analise/${metrica}`)
            .then(resp => {
                var grafo = resp.data.graph
                var nodes = resp.data.nodes
                var edges = []
                var densidade = document.getElementById('valor_densidade')
                densidade.innerHTML = grafo.densidade.toFixed(3)

                resp.data.links.forEach(link => {
                    edges.push({ 'from': link.source, 'to': link.target })
                })

                var options = {
                    nodes: {
                        shape: "dot",
                        scaling: {
                            min: 5,
                            max: 60,
                            label: {
                                enabled: true,
                                min: 20,
                                max: 30,
                                maxVisible: 30,
                                drawThreshold: 5
                            },
                        }
                    },
                    edges: {
                        smooth: {
                            type: "continuous",
                            forceDirection: 'horizontal'
                        },
                        width: 2,
                        color: {
                            color: '#848484'
                        }
                    },
                    interaction: {
                        hover: true,
                        hideEdgesOnDrag: true
                    },
                    physics: {
                        solver: 'forceAtlas2Based'
                    },
                    layout: {
                        randomSeed: 1,
                        improvedLayout: true
                    }

                }

                var data = {
                    nodes: nodes,
                    edges: edges
                }

                this.network.setOptions(options)
                this.network.setData(data)

                switch (metrica) {
                    case "sem_metrica":
                        this.setState({ descricao_metrica: "Nenhuma métrica aplicada!" })
                        break;
                    case "grau":
                        this.setState({ descricao_metrica: "Esta métrica está relacionada à quantidade de parceiros que uma organização possui. Quanto mais parceiros mais elevado o valor da métrica." })
                        break;
                    case "densidade":
                        this.setState({ descricao_metrica: "Esta métrica está representa a relação entre a quantidade de parceiros que a organização possui e o número máximo de parceiros que ela poderia ter. Ela pode ser um indicativo do quão bem integrada à rede uma organização está." })
                        break;
                    case "betweenness_centrality":
                        this.setState({descricao_metrica: "Esta métrica representa o somatório da fração dos caminhos mínimos de todos os pares de vértices de um grafo que passam por esse dado nó. "})
                        break;
                }
            })
    }

    aoSelecionarMetrica(e, { value }) {
        this.realizarAnalise(value)
    }

    componentDidMount() {
        var container = document.getElementById('grafo')
        var data = {}

        var network = new vis.Network(container, data)

        network.on("stabilizationIterationsDone", function () {
            network.setOptions({ physics: false })
        })

        this.network = network
        this.realizarAnalise()
    }

    render() {
        return (
            <React.Fragment>
                <MeuMenu />
                <Grid divided="vertically">
                    <div>
                        <Statistic className="densidade">
                            <Statistic.Label>Densidade</Statistic.Label>
                            <Statistic.Value id="valor_densidade"></Statistic.Value>
                        </Statistic>
                    </div>
                    <Grid.Row id="grafo" className="grafo">
                    </Grid.Row>
                    <Grid.Row verticalAlign="middle">
                        <GridColumn width={3}>
                            <Dropdown search selection
                                onChange={this.aoSelecionarMetrica}
                                name='metrica'
                                options={this.options}
                                defaultValue={this.options[0].value}
                            />
                        </GridColumn>
                        <Grid.Column width={13}>
                            <center>{this.state.descricao_metrica}</center>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
}