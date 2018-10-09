importe "login.feature"

Funcionalidade: Visualizar Rede de Parcerias
  Como usuário
  Eu gostaria que a rede de parcerias da minha organização pudesse ser 
    visualizada em forma de grafo
  Para que eu tivesse uma visualização mais compreensível dessa rede

Cenário: Visualizar Rede de Parcerias 

  Variante: Visualizar Rede de Parcerias
    Dado que eu tenho ~logado~
    Quando eu clico em "Análise de Rede"
    Então eu vejo as organizações do sistema sendo representados como vértices e
      E VEJO as relações de parceria sendo representadas como arestas   
      E tenho ~rede sendo visualizada~

Cenário: Aplicar Métricas de Rede
    
  Variante: Aplicar a métrica de Grau do Nó
    Dado que eu tenho a ~rede sendo visualizada~
    Quando eu seleciono "Grau do Nó" em {Metrica}
    Então eu tenho que o tamanho dos vértices varia de acordo com o número de parceiros
        que uma organização possui

  Variante: Aplicar a métrica de Densidade do Nó
    Dado que eu tenho a ~rede sendo visualizada~
    Quando eu seleciono "Densidade do Nó" em {Metrica}
    Então eu tenho que o tamanho dos vértices varia de acordo com o número de parceiros
        com relação ao total de parcerias possíveis que uma organização possui

  Variante: Aplicar a métrica de Betweenness Centrality
    Dado que eu tenho a ~rede sendo visualizada~
    Quando eu seleciono "Betweenness Centrality" em {Metrica}
    Então eu tenho que o tamanho dos vértices varia de acordo com o número de caminhos
        mínimos que passam por ele
    
Elemento de IU: Metrica
    - tipo é select