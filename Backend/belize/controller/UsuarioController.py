from belize.conexao.DBFactory import DBFactory
from belize.dao.UsuarioDAO import UsuarioDAO
from belize.dao.MensagemDAO import MensagemDAO
from belize.modelo.CanalVM import CanalVM
from belize.service.UsuarioService import UsuarioService
from belize.modelo.UsuarioVM import UsuarioVM
from belize.modelo.LoginVM import LoginVM
from belize.modelo.WorkspaceVM import WorkspaceVM
from flask import request, session


class UsuarioController:
    def __init__(self):
        conexao = DBFactory.get_conexao()
        usuario_dao = UsuarioDAO(conexao)
        mensagem_dao = MensagemDAO(conexao)
        self.usuario_service = UsuarioService(conexao, usuario_dao, mensagem_dao)  # type: UsuarioService
        # self.usuario_service = UsuarioService(conexao, usuario_dao)  # type: UsuarioService

    def efetuar_login(self):
        email = request.form.get('email')
        senha = request.form.get('senha')
        nome_workspace = request.form.get('workspace')
        usuario = UsuarioVM(email=email, senha=senha)
        workspace = WorkspaceVM(nome=nome_workspace)
        login = LoginVM(usuario=usuario, workspace=workspace)
        self.usuario_service.efetuar_login(login)

        if login.usuario.id is not "":
            session['usuario'] = login.usuario.__dict__
            session['workspace'] = login.workspace.__dict__

        return usuario

    def buscar_usuarios_do_workspace(self):
        id_workspace = session['workspace']['id']
        id_usuario = session['usuario']['id']
        return self.usuario_service.buscar_usuarios_do_workspace_para_usuario(id_workspace, id_usuario)

    def buscar_usuarios_do_workspace_que_nao_estao_no_canal(self, id_canal):
        id_workspace = session['workspace']['id']
        canal = CanalVM(id=id_canal)
        workspace = WorkspaceVM(id=id_workspace)
        return self.usuario_service.buscar_usuarios_do_workspace_que_nao_estao_no_canal(canal, workspace)

