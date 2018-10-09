importe "HU_03_VisualizarMensagens.feature"

Funcionalidade: Reagir a uma Mensagem
  Como usuário
  Eu gostaria de poder expressar a minha reação (positiva, negativa ou neutra)
    a uma determinada mensagem através de atalhos na interface
  Para que meus colaboradores soubessem a minha opnião sobre àquela mensagem especificamente

Cenário: Reagir Positivamente a uma Mensagem

    Variante: Reagir Positivamente a uma Mensagem
        Dado que eu tenho ~mensagens do canal sendo exibidas~
        Quando eu clico em [Reagir Positivamente]
        Então eu vejo uma reação positiva a mais

Cenário: Reagir Negativamente a uma Mensagem

    Variante: Reagir Negativamente a uma Mensagem
        Dado que eu tenho ~mensagens do canal sendo exibidas~
        Quando eu clico em [Reagir Negativamente]
        Então eu vejo uma reação negativa a mais

Cenário: Reagir de Forma Neutra a uma Mensagem
    
    Variante: Reagir de Forma Neutra a uma Mensagem
        Dado que eu tenho ~mensagens do canal sendo exibidas~
        Quando eu clico em [Reagir de Forma Neutra]
        Então eu tenho uma reação neutra a mais

Cenário: Desfazer Reação

    Variante: Desfazer Reação Positiva
        Dado que eu já reagi positivamente a uma mensagem
        Quando eu clico em [Reagir Positivamente]
        Então eu vejo uma reação positiva a menos

    Variante: Desfazer Reação Negativa
        Dado que eu já reagi negativamente a uma mensagem
        Quando eu clico em [Reagir Negativamente]
        Então eu vejo uma reação negativa a menos

    Variante: Desfazer Reação Neutra
        Dado que eu já reagi de forma neutra a uma mensagem
        Quando eu clico em [Reagir de Forma Neutra]
        Então eu vejo uma reação neutra a menos