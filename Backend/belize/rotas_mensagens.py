from belize.app import app
from belize.rotas_util import _sucesso, requer_autenticacao
from belize.controller.MensagemController import MensagemController

# MENSAGENS DO CANAL


@app.route('/canais/<string:id_canal>/mensagens', methods=["POST"])
@requer_autenticacao
def enviar_msg_para_canal(id_canal):
    mensagem_controller = MensagemController()
    mensagem = mensagem_controller.enviar_msg_para_canal(id_canal)
    return _sucesso(mensagem)


@app.route('/canais/<string:id_canal>/mensagens', methods=["get"])
@requer_autenticacao
def buscar_msg_do_canal(id_canal):
    mensagem_controller = MensagemController()
    mensagens = mensagem_controller.buscar_msgs_do_canal(id_canal)
    return _sucesso(mensagens)

# MENSAGENS DO USUARIO


@app.route('/usuarios/<string:id_usuario>/mensagens', methods=["POST"])
@requer_autenticacao
def enviar_msg_para_usuario(id_usuario):
    mensagem_controller = MensagemController()
    mensagem = mensagem_controller.enviar_msg_para_usuario(id_usuario)
    return _sucesso(mensagem)


@app.route('/usuarios/<string:id_usuario>/mensagens', methods=["get"])
@requer_autenticacao
def buscar_msg_do_usuario(id_usuario):
    mensagem_controller = MensagemController()
    mensagens = mensagem_controller.buscar_msgs_do_usuario(id_usuario)
    return _sucesso(mensagens)

