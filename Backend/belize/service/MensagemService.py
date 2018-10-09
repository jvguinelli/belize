from belize.dao.MensagemDAO import MensagemDAO
from belize.dao.UsuarioDAO import UsuarioDAO
from belize.dao.CanalDAO import CanalDAO
from belize.modelo.MensagemVM import MensagemVM
from pyorient import OrientDB


class MensagemService:
    def __init__(self, conexao: OrientDB, mensagem_dao: MensagemDAO, usuario_dao: UsuarioDAO, canal_dao: CanalDAO):
        self.conexao = conexao
        self.mensagem_dao = mensagem_dao
        self.usuario_dao = usuario_dao
        self.canal_dao = canal_dao

    def enviar_mensagem(self, msg: MensagemVM):
        try:
            self.mensagem_dao.enviar_mensagem(msg)
            msg.remetente = self.usuario_dao.buscar_usuario_pelo_id(msg.remetente.id)
            if msg.canal_destinatario is not None:
                self._informar_atividade_do_usuario_no_canal(msg.remetente.id, msg.canal_destinatario.id)
        except Exception as e:
            raise e
            pass
        self.conexao.db_close()
        return msg

    def buscar_msgs_do_canal(self, id_canal, id_usuario):
        mensagens = self.mensagem_dao.buscar_mensagens_do_canal(id_canal)
        for mensagem in mensagens:
            if mensagem.msg_citada is not None:
                mensagem.msg_citada = self.mensagem_dao.buscar_mensagem_citada_pelo_id(mensagem.msg_citada.id)
                mensagem.msg_citada.remetente = \
                    self.usuario_dao.buscar_usuario_pelo_id(mensagem.msg_citada.remetente.id)
            mensagem.remetente = self.usuario_dao.buscar_usuario_pelo_id(mensagem.remetente.id)
            mensagem.reacoes = self.mensagem_dao.buscar_reacoes_a_mensagem(mensagem.id)
        self._informar_atividade_do_usuario_no_canal(id_usuario, id_canal)
        self.conexao.db_close()
        return mensagens

    def buscar_msgs_do_usuario(self, id_usuario, id_usuario_sessao):
        mensagens = self.mensagem_dao.buscar_mensagens_do_usuario(id_usuario, id_usuario_sessao)
        for mensagem in mensagens:
            if mensagem.msg_citada is not None:
                mensagem.msg_citada = self.mensagem_dao.buscar_mensagem_citada_pelo_id(mensagem.msg_citada.id)
                mensagem.msg_citada.remetente = \
                    self.usuario_dao.buscar_usuario_pelo_id(mensagem.msg_citada.remetente.id)
            mensagem.remetente = self.usuario_dao.buscar_usuario_pelo_id(mensagem.remetente.id)
            mensagem.reacoes = self.mensagem_dao.buscar_reacoes_a_mensagem(mensagem.id)
        self.mensagem_dao.informar_leitura_das_mensagens(id_usuario, id_usuario_sessao)
        self.conexao.db_close()
        return mensagens

    def _informar_atividade_do_usuario_no_canal(self, id_usuario, id_canal):
        self.canal_dao.informar_atividade_do_usuario_no_canal(id_usuario, id_canal)

    def inserir_reacao(self, reacao):
        reacao_existente = self.mensagem_dao.buscar_reacao_do_usuario_a_mensagem(reacao.usuario.id, reacao.mensagem.id)
        if reacao_existente is None:
            self.mensagem_dao.inserir_reacao(reacao)
        elif reacao_existente.tipo_reacao == reacao.tipo_reacao:
            self.mensagem_dao.remover_reacao(reacao_existente.id)
        else:
            reacao.id = reacao_existente.id
            self.mensagem_dao.atualizar_reacao(reacao)
