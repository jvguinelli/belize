importe "HU_08_Login.feature"

Funcionalidade: Logout de Usuário
  Como Usuário
  Eu gostaria de poder sair do sistema
  Para que ninguém o acesse sem minha autorização

Cenário: Logout com Sucesso

  Variante: Clicar em sair
    Dado que eu tenho ~logado~
    Quando eu clico em "Sair"
    Então eu vejo "Entrar"
      E eu tenho ~deslogado~
