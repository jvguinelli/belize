from belize.dao.UsuarioDAO import UsuarioDAO
from belize.dao.MensagemDAO import MensagemDAO
from belize.modelo.CanalVM import CanalVM
from belize.modelo.LoginVM import LoginVM
from belize.modelo.UsuarioVM import UsuarioVM
from belize.modelo.UsuarioParaListagemVM import UsuarioParaListagemVM
from pyorient import OrientDB

from belize.modelo.WorkspaceVM import WorkspaceVM


class UsuarioService:
    def __init__(self, conexao: OrientDB, usuario_dao: UsuarioDAO, mensagem_dao: MensagemDAO):
    # def __init__(self, conexao: Connection, usuario_dao: UsuarioDAO):
        self.conexao = conexao
        self.usuario_dao = usuario_dao
        self.mensagem_dao = mensagem_dao

    def buscar_usuarios_do_workspace_para_usuario(self, id_workspace, id_usuario):
        try:
            usuarios = self.usuario_dao.buscar_usuarios_pelo_id_do_workspace(id_workspace)
            lista_de_usuarios = []

            for u in usuarios:
                usuario_para_listagem = UsuarioParaListagemVM(id=u.id, nome=u.nome, sobrenome=u.sobrenome,
                                                              email=u.email, img=u.img)
                usuario_para_listagem.qtd_msgs_nao_lidas = \
                    self.mensagem_dao.buscar_qtd_msgs_nao_lidas_de_usuario_para_usuario(usuario_para_listagem.id, id_usuario)
                lista_de_usuarios.append(usuario_para_listagem)
        except Exception as e:
            raise e

        return lista_de_usuarios

    def efetuar_login(self, login: LoginVM):
        self.usuario_dao.efetuar_login(login)

    def buscar_usuarios_do_workspace_que_nao_estao_no_canal(self, canal: CanalVM, workaspace: WorkspaceVM):
        return self.usuario_dao.buscar_usuarios_do_workspace_que_nao_estao_no_canal(canal, workaspace)