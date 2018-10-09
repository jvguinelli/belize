from belize.app import app
from belize.rotas_util import requer_autenticacao
from belize.rotas_util import _sucesso
from belize.controller.CanalController import CanalController


@app.route('/canais')
@requer_autenticacao
def obter_canais():
    canal_controller = CanalController()
    lista_de_canais = canal_controller.buscar_canais_do_usuario_no_workspace()
    return _sucesso(lista_de_canais)
