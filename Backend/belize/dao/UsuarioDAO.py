from pyorient.orient import OrientDB

from belize.modelo.CanalVM import CanalVM
from belize.modelo.LoginVM import LoginVM
from belize.modelo.UsuarioVM import UsuarioVM
from belize.modelo.WorkspaceVM import WorkspaceVM


class UsuarioDAO:
    def __init__(self, conexao: OrientDB):
        self.conexao = conexao

    def buscar_usuarios_pelo_id_do_workspace(self, id_workspace):
        sql = "SELECT @rid, nome, sobrenome, email, img FROM " \
              "(SELECT expand(out) FROM EhMembro " \
              "WHERE in = %s and data_de_saida is null)" % id_workspace

        usuarios = []

        try:
            resultados = self.conexao.query(sql)
            for r in resultados:
                r = r.oRecordData
                usuario = UsuarioVM(id=r['rid'].get(), nome=r['nome'], sobrenome=r['sobrenome'],
                                    email=r['email'], img=r['img'])
                usuarios.append(usuario)
        except Exception as e:
            raise e
            pass

        return usuarios

    def efetuar_login(self, login: LoginVM):
        sql = "SELECT u.@rid as rid, u.nome as nome, u.sobrenome as sobrenome, u.email as email, " \
              "u.img as img, u.senha as senha, id_workspace FROM " \
              "(SELECT out as u, in as id_workspace " \
              "FROM EhMembro WHERE data_de_saida is null AND in.nome = '%s' " \
              "AND out.email = '%s' and out.senha = '%s' unwind u)" \
              % (login.workspace.nome, login.usuario.email, login.usuario.senha)

        try:
            resultado = self.conexao.query(sql)
            if resultado:
                r = resultado[0].oRecordData
                usuario_alterado = UsuarioVM(id=r['rid'].get(), nome=r['nome'],
                                             sobrenome=r['sobrenome'], email=r['email'],
                                             img=r['img'])
                login.usuario = usuario_alterado
                login.workspace.id = r['id_workspace'].get()
        except Exception as e:
            raise e

    def buscar_usuario_pelo_id(self, id_usuario):
        sql = "SELECT @rid, nome, sobrenome, email, img " \
              "FROM %s" % id_usuario

        usuario = None

        try:
            resultado = self.conexao.query(sql)
            if resultado:
                r = resultado[0].oRecordData
                usuario = UsuarioVM(id=r['rid'].get(), nome=r['nome'], sobrenome=r['sobrenome'],
                                  email=r['email'], img=r['img'])
        except Exception as e:
            raise e

        return usuario

    def buscar_usuarios_do_workspace_que_nao_estao_no_canal(self, canal: CanalVM, workaspace: WorkspaceVM):
        sql = "SELECT @rid, nome, sobrenome, email, img FROM " \
              "(SELECT expand($c) let " \
              "$a = (SELECT expand(out) FROM EhMembro WHERE in = %s and data_de_saida is null), " \
              "$b = (SELECT expand(out) FROM Participa WHERE in = %s and data_de_saida is null), " \
              "$c = difference($a, $b))" \
              % (workaspace.id, canal.id)

        usuarios = []

        try:
            resultados = self.conexao.query(sql)
            for r in resultados:
                r = r.oRecordData
                usuario = UsuarioVM(id=r['rid'].get(), nome=r['nome'], sobrenome=r['sobrenome'],
                                    email=r['email'], img=r['img'])
                usuarios.append(usuario)
        except Exception as e:
            raise e

        return usuarios

