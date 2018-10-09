import pyorient
import networkx as nx

from belize.app import app
from belize.controller.AnaliseDeRedeController import AnaliseDeRedeController
from belize.rotas_util import _sucesso, requer_autenticacao
from belize.controller.UsuarioController import UsuarioController


@app.route('/usuarios')
@requer_autenticacao
def obter_usuarios():
    usuario_controller = UsuarioController()
    lista_de_usuarios = usuario_controller.buscar_usuarios_do_workspace()
    return _sucesso(lista_de_usuarios)


@app.route('/analise/<string:metrica>')
@requer_autenticacao
def analise(metrica):
    analise_controller = AnaliseDeRedeController()
    G = analise_controller.analisar_rede(metrica)
    return _sucesso(nx.node_link_data(G))
