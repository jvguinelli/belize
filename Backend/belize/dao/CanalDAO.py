from pyorient import OrientDB
from belize.modelo.CanalVM import CanalVM
from belize.modelo.UsuarioVM import UsuarioVM
from belize.modelo.WorkspaceVM import WorkspaceVM


class CanalDAO:
    def __init__(self, conexao: OrientDB):
        self.conexao = conexao
        self._v = 1

    def buscar_canais_do_usuario_no_workspace(self, id_usuario, id_workspace):
        sql = "SELECT @rid, nome, descricao FROM " \
              "(SELECT expand(in) FROM Participa " \
              "WHERE out = %s AND data_de_saida is null) " \
              "WHERE out('FazParte')[0] = %s" \
              % (id_usuario, id_workspace)

        canais = []

        try:
            resultados = self.conexao.query(sql)
            for r in resultados:
                r = r.oRecordData
                canal = CanalVM(id=r['rid'].get(), nome=r['nome'], descricao=r['descricao'])
                canais.append(canal)

        except Exception as e:
            raise e

        return canais

    def informar_atividade_do_usuario_no_canal(self, id_usuario, id_canal):
        sql = "UPDATE EDGE Participa " \
              "SET data_hora_ultima_visualizacao = DATE() " \
              "WHERE out = %s AND in = %s" % (id_usuario, id_canal)

        try:
            # verificar se resultado > 0 para ver se realmente foi atualizado
            self.conexao.command(sql)
        except Exception as e:
            raise e

    def canal_ja_existe(self, canal: CanalVM, workspace: WorkspaceVM):
        sql = "SELECT FROM canal " \
              "WHERE nome = '%s' and out('FazParte')[0] = %s" \
              % (canal.nome, workspace.id)

        ja_existe = False

        try:
            resultado = self.conexao.query(sql)
            if resultado:
                ja_existe = True
        except Exception as e:
            raise e

        return ja_existe

    def cadastrar_canal(self, canal: CanalVM, workspace: WorkspaceVM, usuario: UsuarioVM):
        sql_cadastrar_canal = "CREATE VERTEX Canal SET nome = '%s', descricao = '%s', v = %s" \
                              % (canal.nome, canal.descricao, self._v)

        cmd = "begin\n"
        cmd += "let a = " + sql_cadastrar_canal + "\n"
        cmd += "CREATE EDGE FazParte FROM $a " \
               "TO %s SET v = %s\n" % (workspace.id, self._v)
        cmd += "CREATE EDGE Participa FROM %s " \
               "TO $a SET data_de_entrada = DATE(), data_hora_ultima_visualizacao = DATE(), " \
               "v = %s\n" % (usuario.id, self._v)
        cmd += "commit\n" \
               "return $a"

        try:
            resultado = self.conexao.batch(cmd)[0]
            r = resultado.oRecordData
            canal.id = resultado._rid[1:]

        except Exception as e:
            raise e

    def adicionar_usuario_ao_canal(self, usuario: UsuarioVM, canal: CanalVM):
        sql_add_ao_canal = "CREATE Edge Participa FROM %s TO %s " \
                           "SET data_de_entrada = DATE(), data_hora_ultima_visualizacao = DATE(), v = %s" \
                              % (usuario.id, canal.id, self._v)

        sql_mensagem = "CREATE VERTEX MensagemParaCanal " \
                       "SET texto = 'Adicionado ao Canal.', data_hora_envio = DATE(), v = %s" \
                       % self._vs

        cmd = "begin\n"
        cmd += "let a = " + sql_add_ao_canal + "\n"
        cmd += "let b = " + sql_mensagem +  "\n"
        cmd += "CREATE EDGE possui FROM " \
               "TO $a SET v = %s\n" % (canal.id, self._v)
        cmd += "CREATE EDGE EnviadaPor FROM $b " \
               "TO %s SET v = %s\n" % (usuario.id, self._v)
        cmd += "commit\n" \
               "return $a"
