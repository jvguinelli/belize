from pyorient import OrientDB
from belize.modelo.MensagemVM import MensagemVM
from belize.modelo.ReacaoVM import ReacaoVM
from belize.modelo.UsuarioVM import UsuarioVM
from belize.modelo.CanalVM import CanalVM


class MensagemDAO:
    def __init__(self, conexao: OrientDB):
        self.conexao = conexao
        self._v = 1

    def enviar_mensagem(self, msg: MensagemVM):
        sql_msg_canal = "CREATE VERTEX MensagemParaCanal " \
                        "SET texto = '%s', data_hora_envio = '%s', v = %s" \
                        % (msg.texto, msg.data_hora_envio, self._v)

        sql_msg_usuario = "CREATE VERTEX MensagemParaUsuario " \
                          "SET texto = '%s', data_hora_envio = '%s', data_hora_leitura = null, v = %s" \
                          % (msg.texto, msg.data_hora_envio, self._v)

        sql_aresta_resposta = ""

        if msg.canal_destinatario is None:
            sql_salvar_msg = sql_msg_usuario
            sql_aresta_destino = "CREATE EDGE EnviadaPara FROM $a " \
                                 "TO %s SET v = %s\n" % (msg.usuario_destinatario.id, self._v)
        else:
            sql_salvar_msg = sql_msg_canal
            sql_aresta_destino = "CREATE EDGE possui FROM %s " \
                                 "TO $a SET v = %s\n" % (msg.canal_destinatario.id, self._v)

        if msg.msg_citada.id != "0":
            sql_aresta_resposta = "CREATE EDGE EhRespostaA FROM $a " \
                                  "TO %s SET v = %s\n" % (msg.msg_citada.id, self._v)

        cmd = "begin\n"
        cmd += "let a = " + sql_salvar_msg + "\n"
        cmd += "CREATE EDGE EnviadaPor FROM $a " \
               "TO %s SET v = %s\n" % (msg.remetente.id, self._v)
        cmd += sql_aresta_destino
        cmd += sql_aresta_resposta
        cmd += "commit\n" \
               "return $a"

        try:
            resultado = self.conexao.batch(cmd)[0]
            r = resultado.oRecordData
            msg.id = resultado._rid[1:]

        except Exception as e:
            raise e
            pass

        return msg

    def buscar_mensagens_do_canal(self, id_canal):
        sql = "SELECT @rid, texto, data_hora_envio, v, out('EnviadaPor')[0] as remetente, " \
              "in('Possui')[0] as canal, out('EhRespostaA')[0] as msg_citada " \
              "FROM (SELECT expand(out('Possui')) FROM %s)" % id_canal

        mensagens = []

        try:
            resultado = self.conexao.query(sql)
            for r in resultado:
                m = r.oRecordData
                mensagem = self._montar_mensagem_da_consulta(m)
                mensagens.append(mensagem)
        except Exception as e:
            raise e
            pass

        return mensagens

    # buscar mensagem entre usuarios
    def buscar_mensagens_do_usuario(self, id_usuario1, id_usuario2):
        sql = "SELECT @rid, texto, data_hora_envio, v, out('EnviadaPor')[0] as remetente, " \
              "out('EnviadaPara')[0] as destinatario, out('EhRespostaA')[0] as msg_citada " \
              "FROM MensagemParaUsuario " \
              "WHERE (out('EnviadaPara')[0] = %s AND out('EnviadaPor')[0] = %s) " \
              "OR (out('EnviadaPara')[0] = %s AND out('EnviadaPor')[0] = %s)" \
              % (id_usuario1, id_usuario2, id_usuario2, id_usuario1)

        mensagens = []

        try:
            resultado = self.conexao.query(sql)
            for r in resultado:
                m = r.oRecordData
                mensagem = self._montar_mensagem_da_consulta(m)
                mensagens.append(mensagem)
        except Exception as e:
            raise e
            pass

        return mensagens

    def buscar_mensagem_citada_pelo_id(self, id_mensagem):
            sql = "SELECT @rid, texto, data_hora_envio, v, out('EnviadaPor')[0] as remetente, " \
                  "out('EhRespostaA')[0] as msg_citada FROM %s" % id_mensagem

            mensagem = None

            try:
                resultado = self.conexao.command(sql)
                if resultado:
                    m = resultado[0].oRecordData
                    mensagem = self._montar_mensagem_da_consulta(m)
            except Exception as e:
                raise e

            return mensagem

    def _montar_mensagem_da_consulta(self, msg):
        canal = None if 'canal' not in msg else CanalVM(id=msg['canal'].get())
        destinatario = None if 'destinatario' not in msg else UsuarioVM(id=msg['destinatario'].get())
        msg_citada = None if 'msg_citada' not in msg else MensagemVM(id=msg['msg_citada'].get())
        remetente = UsuarioVM(id=msg['remetente'].get())

        msg = MensagemVM(id=msg['rid'].get(), texto=msg['texto'], data_hora_envio=msg['data_hora_envio'],
                         canal_destinatario=canal, remetente=remetente, usuario_destinatario=destinatario,
                         msg_citada=msg_citada)

        return msg

    def buscar_qtd_msgs_nao_lidas_de_usuario_para_usuario(self, id_remetente, id_destinatario):
        sql = "SELECT count(*) as qtd from MensagemParaUsuario " \
              "WHERE (out('EnviadaPara')[0] = %s and out('EnviadaPor')[0] = %s) " \
              "and data_hora_leitura is null" % (id_destinatario, id_remetente)

        qtd_msgs_nao_lidas = 0

        try:
            resultado = self.conexao.query(sql)
            if resultado[0].oRecordData['qtd'] > 0:
                qtd_msgs_nao_lidas = resultado[0].oRecordData['qtd']
        except Exception as e:
            raise e
            pass

        return qtd_msgs_nao_lidas

    def buscar_qtd_msgs_nao_lidas_do_usuario_no_canal(self, id_usuario, id_canal):
        sql = "SELECT COUNT(*) as qtd FROM " \
              "(SELECT in.out('Possui') as msg, data_hora_ultima_visualizacao " \
              "FROM Participa WHERE in = %s and out = %s unwind msg) " \
              "WHERE msg.data_hora_envio > data_hora_ultima_visualizacao" \
              % (id_canal, id_usuario)

        qtd_msgs_nao_lidas = 0

        try:
            resultado = self.conexao.query(sql)
            if resultado[0].oRecordData['qtd'] > 0:
                qtd_msgs_nao_lidas = resultado[0].oRecordData['qtd']
        except Exception as e:
            raise e
            pass

        return qtd_msgs_nao_lidas

    def informar_leitura_das_mensagens(self, id_remetente, id_destinatario):
        sql = "UPDATE MensagemParaUsuario " \
              "SET data_hora_leitura = DATE() " \
              "WHERE out('EnviadaPor')[0] = %s AND out('EnviadaPara')[0] = %s AND data_hora_leitura is NULL" \
              % (id_remetente, id_destinatario)

        try:
            # verificar se resultado > 0 para ver se realmente foi atualizado
            self.conexao.command(sql)
        except Exception as e:
            raise e

    def buscar_reacao_do_usuario_a_mensagem(self, id_usuario, id_mensagem):
        sql = "SELECT @rid, tipo, in as msg, out as usuario, v FROM ReageA " \
              "WHERE in = %s and out = %s" % (id_mensagem, id_usuario)

        reacao = None

        try:
            resultado = self.conexao.query(sql)
            if resultado:
                r = resultado[0].oRecordData
                m = MensagemVM(id=r['msg'].get())
                u = UsuarioVM(id=r['usuario'].get())
                reacao = ReacaoVM(id=r['rid'].get(), usuario=u,mensagem=m,tipo_reacao=r['tipo'])
        except Exception as e:
            raise e

        return reacao

    def inserir_reacao(self, reacao: ReacaoVM):
        sql = "CREATE EDGE ReageA FROM %s TO %s SET  v = '%s', tipo = '%s'" \
              % (reacao.usuario.id, reacao.mensagem.id, 1,reacao.tipo_reacao)

        try:
            self.conexao.command(sql)
        except Exception as e:
            raise e

    def remover_reacao(self, id_reacao):
        sql = "DELETE EDGE %s" % id_reacao

        try:
            self.conexao.command(sql)
        except Exception as e:
            raise e

    def atualizar_reacao(self, reacao: ReacaoVM):
        sql = "UPDATE EDGE %s SET tipo = %s " % (reacao.id, reacao.tipo_reacao)

        try:
            self.conexao.command(sql)
        except Exception as e:
            raise e

    def buscar_reacoes_a_mensagem(self, id_mensagem):
        sql = "SELECT @rid, tipo, out as usuario, v FROM ReageA " \
              "WHERE in = %s" % id_mensagem

        reacoes = []

        try:
            resultados = self.conexao.query(sql)
            for r in resultados:
                r = r.oRecordData
                reacao = {'id_usuario': r['usuario'].get(), 'id_tipo_reacao': r['tipo']}
                reacoes.append(reacao)
        except Exception as e:
            raise e

        return reacoes