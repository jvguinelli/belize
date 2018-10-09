Funcionalidade: Remover Usuario do Canal
    Como administrador do Canal
    Eu gostaria de poder remover um usuário do canal

Cenário: Remover Usuario do Canal

    Variante: Remover Usuario do Canal
        Dado que eu tenho os usuários do canal sendo exibidos
        Quando eu clico em "Remover"
        Então eu vejo [Mensagem de Sucesso]

Constantes:
    - "Mensagem de Sucesso" é "Usuário removido do Canal"