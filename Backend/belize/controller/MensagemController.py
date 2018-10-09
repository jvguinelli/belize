from datetime import datetime
from flask import request, session


from belize.conexao.DBFactory import DBFactory
from belize.service.MensagemService import MensagemService
from belize.dao.MensagemDAO import MensagemDAO
from belize.dao.UsuarioDAO import UsuarioDAO
from belize.dao.CanalDAO import CanalDAO
from belize.modelo.CanalVM import CanalVM
from belize.modelo.UsuarioVM import UsuarioVM
from belize.modelo.MensagemVM import MensagemVM
from belize.modelo.ReacaoVM import ReacaoVM


class MensagemController:
    def __init__(self):
        conexao = DBFactory.get_conexao()
        mensagem_dao = MensagemDAO(conexao)
        usuario_dao = UsuarioDAO(conexao)
        canal_dao = CanalDAO(conexao)
        self.mensagem_service = MensagemService(conexao, mensagem_dao, usuario_dao, canal_dao)

    def enviar_msg_para_canal(self, id_canal):
        msg = request.form.get('msg')
        id_mensagem_referencia = request.form.get('id_mensagem_referencia')
        # id_canal = request.form.get('id_canal')
        remetente = UsuarioVM(id=session['usuario']['id'])
        destinatario = CanalVM(id=id_canal)
        mensagem = MensagemVM(texto=msg,
                            data_hora_envio=datetime.now(),
                            remetente=remetente,
                            canal_destinatario=destinatario,
                            msg_citada=MensagemVM(id=id_mensagem_referencia))
        mensagem = self.mensagem_service.enviar_mensagem(mensagem)
        return mensagem

    def enviar_msg_para_usuario(self, id_usuario):
        msg = request.form.get('msg')
        id_mensagem_referencia = request.form.get('id_mensagem_referencia')
        # id_usuario = request.form.get('id_usuario')
        remetente = UsuarioVM(id=session['usuario']['id'])
        destinatario = UsuarioVM(id=id_usuario)
        mensagem = MensagemVM(texto=msg,
                            data_hora_envio=datetime.now(),
                            remetente=remetente,
                            usuario_destinatario=destinatario,
                            msg_citada=MensagemVM(id=id_mensagem_referencia))
        mensagem = self.mensagem_service.enviar_mensagem(mensagem)
        return mensagem

    def buscar_msgs_do_canal(self, id_canal):
        id_usuario = session['usuario']['id']
        return self.mensagem_service.buscar_msgs_do_canal(id_canal, id_usuario)

    def buscar_msgs_do_usuario(self, id_usuario):
        id_usuario_sessao = session['usuario']['id']
        return self.mensagem_service.buscar_msgs_do_usuario(id_usuario, id_usuario_sessao)

    def reagir_a_mensagem(self, mensagem, reacao):
        mensagem = MensagemVM(id=mensagem['id'])
        usuario = UsuarioVM(id=session['usuario']['id'])
        reacao = ReacaoVM(usuario=usuario, mensagem=mensagem, tipo_reacao=str(reacao['id_tipo_reacao']))
        self.mensagem_service.inserir_reacao(reacao)
