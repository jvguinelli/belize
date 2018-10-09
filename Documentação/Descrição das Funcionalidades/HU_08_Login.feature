Funcionalidade: Login de Usuário
  Como usuário
  Eu gostaria de me autenticar
  Para poder acessar o sistema

Cenário: Login com Sucesso
    Variante: Login com sucesso para credenciais válidas
        Dado que eu estou na [Tela de Login]
        Quando eu preencho {login}
            E preencho {senha}
            E clico em "Entrar"
            E eu espero 2 segundos
        Então eu vejo "Bem Vindo!"
            E tenho ~logado~

Constantes:
  - "Tela de Login" é "http://localhost:8080/#/login"

Tabela: Usuarios
| login      | senha |
| jvguinelli | 1234  |

Elemento de IU: login
    - valor vem da consulta "SELECT login FROM [Usuarios]"

Elemento de IU: senha
  - valor vem da consulta "SELECT senha FROM [Usuarios] WHERE login = {login}"

Elemento de IU: Entrar
    - tipo é botão