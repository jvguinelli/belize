from belize.modelo.CanalVM import CanalVM

class CanalParaListagemVM:
    def __init__(self, canal: CanalVM, qtd_msgs_nao_lidas=0):
        self.id = canal.id
        self.nome = canal.nome
        self.descricao = canal.descricao
        self.qtd_msgs_nao_lidas = qtd_msgs_nao_lidas
