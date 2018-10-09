from belize.dao.CanalDAO import CanalDAO
from belize.dao.MensagemDAO import MensagemDAO
from belize.modelo.CanalParaListagemVM import CanalParaListagemVM
from belize.modelo.CanalVM import CanalVM
from pyorient import OrientDB

from belize.modelo.UsuarioVM import UsuarioVM
from belize.modelo.WorkspaceVM import WorkspaceVM


class CanalService:
    def __init__(self, conexao: OrientDB, canal_dao: CanalDAO, mensagem_dao: MensagemDAO):
    # def __init__(self, conexao: Connection, canal_dao: CanalDAO):
        self.conexao = conexao
        self.canal_dao = canal_dao
        self.mensagem_dao = mensagem_dao

    def buscar_canais_do_usuario_no_workspace(self, id_usuario, id_workspace):
        try:
            canais = self.canal_dao.buscar_canais_do_usuario_no_workspace(id_usuario, id_workspace)
            lista_de_canais = []

            for c in canais:
                canal_para_listagem = CanalParaListagemVM(canal=c)
                canal_para_listagem.qtd_msgs_nao_lidas = \
                    self.mensagem_dao.buscar_qtd_msgs_nao_lidas_do_usuario_no_canal(id_usuario, canal_para_listagem.id)
                lista_de_canais.append(canal_para_listagem)
        except Exception as e:
            raise e
        finally:
            self.conexao.db_close()

        return lista_de_canais

    def cadastrar_canal(self, canal: CanalVM, workspace: WorkspaceVM, usuario: UsuarioVM):
        canal_ja_existe = self.canal_dao.canal_ja_existe(canal, workspace)

        try:
            if not canal_ja_existe:
                self.canal_dao.cadastrar_canal(canal, workspace, usuario)
        except Exception as e:
            raise e