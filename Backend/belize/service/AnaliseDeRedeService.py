from belize.dao.OrganizacaoDAO import OrganizacaoDAO
from belize.modelo.UsuarioVM import UsuarioVM
import networkx as nx


class AnaliseDeRedeService:
    def __init__(self, organizacao_dao: OrganizacaoDAO):
        self.organizacao_dao = organizacao_dao
        self.G = nx.Graph()

    def analisar_rede(self, metrica, id_usuario):
        organizacao_usuario = self.organizacao_dao.buscar_organizacao_do_usuario(id_usuario)
        nos = self.organizacao_dao.buscar_organizacoes()
        arestas = self.organizacao_dao.buscar_parcerias_ativas()

        for n in nos:
            if organizacao_usuario is not None and ( n['id'] == organizacao_usuario['id'] ):
                n['tipo'] = "Minha Organização"
            self.G.add_node(n['id'], nome=n['nome'], tipo=n['tipo'])

        for a in arestas:
            self.G.add_edge(a['empresa_a'], a['empresa_b'])

        self.G.graph['densidade'] = nx.density(self.G)

        if metrica == "grau":
            valores = self.G.degree
        elif metrica == "densidade":
            valores = nx.degree_centrality(self.G)
        elif metrica == "betweenness_centrality":
            valores =  nx.betweenness_centrality(self.G, normalized=False)
        else:
            return self.G

        for n in nos:
            id = n['id']
            self.G.nodes[id]['metrica'] = {}
            self.G.nodes[id]['metrica']['tipo'] = metrica
            self.G.nodes[id]['metrica']['valor'] = valores[id]

        return self.G

    # def analizar_centralidade_global(self):
    # Closenness centrality






