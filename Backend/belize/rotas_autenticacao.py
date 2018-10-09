from flask import session
# from flask_jwt_extended import (JWTManager, jwt_required, create_access_token)

from belize.app import app, socketio
from belize.rotas_util import _sucesso, requer_autenticacao
from belize.controller.UsuarioController import UsuarioController

@app.route('/login', methods=["POST"])
def login():
    usuario_controler = UsuarioController()
    usuario = usuario_controler.efetuar_login()

    socketio.send('#########LOGIN###########')
    if usuario is None:
        return app.response_class(
            response={'erro': 'usuario não autenticado'},
            status=401,
            mimetype='application/json')

    return _sucesso(usuario)


@app.route('/logout')
@requer_autenticacao
def logout():
    session.pop('usuario', None)
    return _sucesso(None)


@app.route('/esta_logado')
@requer_autenticacao
def esta_logado():
    return _sucesso(session['usuario'])