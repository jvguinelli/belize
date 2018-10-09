from pyorient import OrientDB


class OrganizacaoDAO:
    def __init__(self, conexao: OrientDB):
        self.conexao = conexao

    def buscar_organizacoes(self):
        sql = "SELECT @rid, nome, tipo " \
              "FROM Organizacao"

        organizacoes = []

        try:
            resultados = self.conexao.query(sql)
            for r in resultados:
                r = r.oRecordData
                organizacao = dict(id=r['rid'].get(), nome=r['nome'], tipo=r['tipo'])
                organizacoes.append(organizacao)
        except Exception as e:
            raise e

        return organizacoes

    def buscar_organizacao_do_usuario(self, id_usuario):
        sql = "SELECT @rid, nome, descricao, tipo FROM " \
              "(SELECT expand(in) FROM Trabalha " \
              "WHERE out = %s and data_termino is null)" % id_usuario

        organizacao = None

        try:
            resultado = self.conexao.query(sql)
            if resultado:
                r = resultado[0].oRecordData
                organizacao = dict(id=r['rid'].get(), nome=r['nome'], tipo=['tipo'])
        except Exception as e:
            raise e

        return organizacao

    def buscar_parcerias_ativas(self):
        sql = "SELECT FROM EhParceira"

        parcerias = []

        try:
            resultados = self.conexao.query(sql)
            for r in resultados:
                r = r.oRecordData
                parceria = dict(empresa_a=r['in'].get(), empresa_b=r['out'].get())
                parcerias.append(parceria)
        except Exception as e:
            raise e

        return parcerias



