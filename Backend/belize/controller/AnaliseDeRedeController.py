from belize.conexao.DBFactory import DBFactory
from belize.dao.OrganizacaoDAO import OrganizacaoDAO
from belize.service.AnaliseDeRedeService import AnaliseDeRedeService
from flask import session


class AnaliseDeRedeController:
    def __init__(self):
        conexao = DBFactory.get_conexao()
        organizacao_dao = OrganizacaoDAO(conexao)
        self.analise_service = AnaliseDeRedeService(organizacao_dao)

    def analisar_rede(self, metrica):
        id_usuario = session['usuario']['id']
        G = self.analise_service.analisar_rede(metrica, id_usuario)

        for id, dados in G.nodes(data=True):
            if 'metrica' in dados.keys():
                self._gerar_title_para_no(dados)
                dados['value'] = dados['metrica']['valor']
            else:
                dados['title'] = dados['nome']

            dados['group'] = dados['tipo']
            if dados['tipo'] == "Minha Organização":
                dados['label'] = dados['nome']

        return G

    def _gerar_title_para_no(self, dados_do_no):
        if dados_do_no['metrica']['tipo'] == "grau":
            dados_do_no['title'] = "%s.<br/>" \
                                   "Grau do Nó: %s." % (dados_do_no['nome'], dados_do_no['metrica']['valor'])
        elif dados_do_no['metrica']['tipo'] == "densidade":
            dados_do_no['title'] = "%s.<br/>" \
                                   "Densidade do Nó: %s." % (dados_do_no['nome'], dados_do_no['metrica']['valor'])
        elif dados_do_no['metrica']['tipo'] == "betweenness_centrality":
            dados_do_no['title'] = "%s.<br/>" \
                                   "Grau de Intermediação: %s." % (dados_do_no['nome'], dados_do_no['metrica']['valor'])

