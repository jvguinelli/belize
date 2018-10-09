import pymysql
import pyorient


class DBFactory(object):

    @staticmethod
    def get_conexao():
        conexao = pyorient.OrientDB("localhost", 2424)
        # conexao.db_open("belize_inicial", "root", "root")
        conexao.db_open("belize_telas", "root", "root")
        # conexao.db_open("belize_grau_do_no", "root", "root")
        # conexao.db_open("belize_grau_intermediacao_no_exclusao", "root", "root")
        # conexao.db_open("belize_grau_intermediacao_no", "root", "root")
        # conexao.db_open("belize_densidade_do_grafo", "root", "root")
        return conexao

