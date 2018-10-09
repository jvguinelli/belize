Funcionalidade: Adicionar Usuario ao Canal
    Como administrador do Canal
    Eu gostaria de adicionar ao canal usuários que ainda não fossem membro do mesmo

Cenário: Adicionar Usuario ao Canal

    Variante: Adicionar Usuario ao Canal
        Dado que eu tenho usuários que não fazem parte do canal sendo exibidos
        Quando eu clico em "Adicionar"
        Então eu vejo [Mensagem de Sucesso]

Constantes:
    - "Mensagem de Sucesso" é "Usuário adicionado ao Canal"