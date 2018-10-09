importe "visualizarMensagens.feature"

Funcionalidade: Enviar Mensagem
  Como usuário
  Eu gostaria de enviar mensagens individuais para outros usuários do meu workspace 
    e para os canais do qual faço parte
  Para poder me comunicar com os meus colaboradores

Cenário: Enviar Mensagem para Canal

  Variante: Enviar Mensagem para Canal com Enter
    Dado que eu tenho ~mensagens do canal sendo exibidas~
    Quando eu preencho "Enviando mensagem para canal com enter" em {mensagem}
      E pressiono "Enter"
    Então eu vejo "Enviando mensagem para canal com enter"

  Variante: Enviar Mensagem para Canal com Click em Enviar
    Dado que eu tenho ~mensagens do canal sendo exibidas~
    Quando eu preencho "Enviando mensagem para canal com click" em {mensagem}
      E clico em "Enviar"
    Então eu vejo "Enviando mensagem para canal com click"

Cenário: Enviar Mensagem para Usuário

  Variante: Enviar Mensagem para Usuário com Enter
    Dado que eu tenho ~mensagens do usuario sendo exibidas~
    Quando eu preencho "Enviando mensagem para usuario com enter" em {mensagem}
      E pressiono "Enter"
    Então eu vejo "Enviando mensagem para usuario com enter"

  Variante: Enviar Mensagem para Canal com Click em Enviar
    Dado que eu tenho ~mensagens do canal sendo exibidas~
    Quando eu preencho "Enviando mensagem para usuario com click" em {mensagem}
      E clico em "Enviar"
    Então eu vejo "Enviando mensagem para usuario com click"

Cenário: Responder a uma Mensagem

    Variante: Responder a uma Mensagem
      Dado que eu tenho ~mensagens do usuario sendo exibidas~
      Quando eu clico em "Responder"
        E preencho "Respondendo a uma mensagem" em {mensagem}
        E clico em "Enviar"
      Então eu vejo "Respondendo a uma mensagem"

Elemento de IU: mensagem
    - obrigatório é true

Elemento de IU: Enviar
    - tipo é botão