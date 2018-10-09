from belize.modelo import UsuarioVM, WorkspaceVM

class LoginVM:
    def __init__(self, usuario: UsuarioVM, workspace: WorkspaceVM):
        self.usuario = usuario
        self.workspace = workspace