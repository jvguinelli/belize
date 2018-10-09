importe "HU_08_Login.feature"

Funcionalidade: Visualizar Mensagens
  Como usuário
  Eu gostaria de visualizar as mensagens destinadas a mim ou aos canais dos quais faço parte
  Para que eu saiba sobre o que meus colaboradores estão falando

Cenário: Visualizar Mensagem do Canal

  Variante: Visualizar Mensagem do Canal
    Dado que eu tenho ~logado~
    Quando eu clico em [Canal]
    Então eu tenho ~mensagens do canal sendo exibidas~
      E vejo [Mensagens do Canal]

Cenário: Visualizar Mensagem do Usuário

  Variante: Visualizar Mensagem do Usuario
    Dado que eu tenho ~logado~
    Quando eu clico em [Usuario]
    Então eu tenho ~mensagens do usuario sendo exibidas~
      E vejo [Mensagens do Usuário] 

Constantes:
    - "Canal" é "teste_1"
    - "Usuario" é "Jose"
    - "Mensagens do Canal" é "Bom dia, td bem?"
    - "Mensagens do Usuário" é "Bom dia, td bem?"