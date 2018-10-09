from belize.modelo.UsuarioVM import UsuarioVM
from belize.modelo.MensagemVM import MensagemVM

class ReacaoVM:
    def __init__(self, id="", usuario: UsuarioVM = None, mensagem: UsuarioVM = None, tipo_reacao = "0"):
        self.id = id
        self.usuario = usuario
        self.mensagem = mensagem
        self.tipo_reacao = tipo_reacao

