from belize.conexao.DBFactory import DBFactory
from belize.modelo.CanalParaListagemVM import CanalParaListagemVM
from belize.modelo.CanalVM import CanalVM
from belize.modelo.UsuarioVM import UsuarioVM
from belize.modelo.WorkspaceVM import WorkspaceVM
from belize.service.CanalService import CanalService
from belize.dao.CanalDAO import CanalDAO
from belize.dao.MensagemDAO import MensagemDAO
from flask import session


class CanalController:
    def __init__(self):
        conexao = DBFactory.get_conexao()
        canal_dao = CanalDAO(conexao)
        mensagem_dao = MensagemDAO(conexao)
        self.canal_service = CanalService(conexao, canal_dao, mensagem_dao)
    
    def buscar_canais_do_usuario_no_workspace(self):
        id_workspace = session['workspace']['id']
        id_usuario = session['usuario']['id']
        return self.canal_service.buscar_canais_do_usuario_no_workspace(id_usuario, id_workspace)

    def cadastrar_canal(self, nome_canal, descricao):
        canal = CanalVM(nome=nome_canal, descricao=descricao)
        workspace = WorkspaceVM(id=session['workspace']['id'])
        usuario = UsuarioVM(id=session['usuario']['id'])
        self.canal_service.cadastrar_canal(canal, workspace, usuario)
        return canal
