from flask import Flask

from flask_socketio import SocketIO
from flask_cors import CORS
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app, resources={r"/*": {"origins": "http://localhost:8080", 'supports_credentials': True }})
socketio = SocketIO(app)

from belize.rotas_autenticacao import *
from belize.rotas_canais import *
from belize.rotas_usuarios import *
from belize.rotas_mensagens import *

from belize.websockets import (
    on_cliente_connection,
    on_cliente_disconnection,
    informar_usuarios,
    informar_canais,
    nova_msg,
    cadastrar_canal,
    buscar_usarios_para_adicionar_ao_canal,
    adicionar_usuario_ao_canal
)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')