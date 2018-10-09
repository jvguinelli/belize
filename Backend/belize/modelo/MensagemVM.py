from belize.modelo.UsuarioVM import UsuarioVM
from belize.modelo.CanalVM import CanalVM


class MensagemVM:
    def __init__(
            self, id=0,
            texto='',
            data_hora_envio=None,
            reacoes=[],
            remetente: UsuarioVM = None,
            canal_destinatario: CanalVM = None,
            usuario_destinatario: UsuarioVM = None,
            msg_citada= None):

        self.id = id
        self.texto = texto
        self.data_hora_envio = data_hora_envio
        self.reacoes = reacoes
        self.remetente = remetente
        self.canal_destinatario = canal_destinatario
        self.usuario_destinatario = usuario_destinatario
        self.msg_citada = msg_citada
