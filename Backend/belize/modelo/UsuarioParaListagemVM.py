class UsuarioParaListagemVM:
    def __init__(self, id="", nome="", sobrenome="", email="", img="", qtd_msgs_nao_lidas=0):
        self.id = id
        self.nome = nome
        self.sobrenome = sobrenome
        self.email = email
        self.img = img
        self.qtd_msgs_nao_lidas = qtd_msgs_nao_lidas
