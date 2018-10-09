Funcionalidade: Convidar Usuário Para o Workspace
    Como dono do workspace
    Eu gostaria de poder convidar novos usuários para participar do workspace

Cenário: Convidar Usuário Para o Workspace

    Variante: Convidar Usuŕio Para o Workspace
        Dado que eu tenho a tela de convite sendo exibida
        Quando eu preencho {email}
            E eu clico em [Enviar Convite]
        Então eu vejo [Mensagem de Sucesso]

Constantes:
    - "Mensagem de Sucesso" é "Convite enviado com sucesso."
