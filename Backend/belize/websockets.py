from flask import session, request, json
from flask_socketio import emit, join_room

from belize.app import socketio
from belize.controller.CanalController import CanalController
from belize.controller.MensagemController import MensagemController
from belize.controller.UsuarioController import UsuarioController
from belize.rotas_util import serialize, requer_autenticacao


@socketio.on('connect')
@requer_autenticacao
def on_cliente_connection():
    print('Cliente Conectado')


@socketio.on('disconnect')
def on_cliente_disconnection():
    print('Cliente Desconectado')


@socketio.on('INFORMAR_CANAIS')
def informar_canais(canais):
    for canal in canais:
        sala = 'canais/%s' % canal
        join_room(sala)
        # mensagens = MensagemController().buscar_msgs_do_canal(canal)
        # m = json.dumps(mensagens, default=serialize)
        # emit('carregar_mensagens', m, room=request.sid)


@socketio.on('INFORMAR_USUARIOS')
def informar_usuarios(usuarios):
    id_usuario = session['usuario']['id']
    sala = 'usuarios/%s' % id_usuario
    join_room(sala)
    # for usuario in usuarios:
    #     mensagens = MensagemController().buscar_msgs_do_usuario(usuario)
    #     m = json.dumps(mensagens, default=serialize) #refatorar
    #     emit('carregar_mensagens', m, room=request.sid)


@socketio.on('NOTIFICAR_NOVA_MENSAGEM')
def nova_msg(mensagem):
    if mensagem['canal_destinatario'] is None:
        sala1 = 'usuarios/%s' % (mensagem['usuario_destinatario']['id'])
        sala2 = 'usuarios/%s' % (session['usuario']['id'])
        emit('NOVA_MENSAGEM', mensagem, room=sala1)
        emit('NOVA_MENSAGEM', mensagem, room=sala2)
    else:
        sala = 'canais/%s' % (mensagem['canal_destinatario']['id'])
        emit('NOVA_MENSAGEM', mensagem, room=sala)


@socketio.on('REAGIR_A_MENSAGEM')
def reagir_a_mensagem(reacao):
    mensagem_controller = MensagemController()
    mensagem_controller.reagir_a_mensagem(reacao['mensagem'], reacao['reacao'])
    if reacao['mensagem']['canal_destinatario'] is None:
        sala1 = 'usuarios/%s' % (reacao['mensagem']['usuario_destinatario']['id'])
        sala2 = 'usuarios/%s' % (session['usuario']['id'])
        socketio.emit('NOVA_REACAO_A_MENSAGEM', reacao, room=sala1)
        socketio.emit('NOVA_REACAO_A_MENSAGEM', reacao, room=sala2)
    else:
        sala = 'canais/%s' % (reacao['mensagem']['canal_destinatario']['id'])
        socketio.emit('NOVA_REACAO_A_MENSAGEM', reacao, room=sala)


@socketio.on('CADASTRAR_CANAL')
def cadastrar_canal(canal):
    canal_controller = CanalController()
    canal = canal_controller.cadastrar_canal(canal['nome'], canal['descricao'])
    sala = 'usuarios/%s' % (session['usuario']['id'])
    socketio.emit('NOVO_CANAL', passar_para_json(canal), room=sala)


@socketio.on('BUSCAR_USUARIOS_PARA_ADICIONAR_AO_CANAL')
def buscar_usarios_para_adicionar_ao_canal(id_canal):
    usuario_controller = UsuarioController()
    usuarios = usuario_controller.buscar_usuarios_do_workspace_que_nao_estao_no_canal(id_canal)
    sala = 'usuarios/%s' % (session['usuario']['id'])
    socketio.emit('INFORMAR_USUARIOS_PARA_CANAL', passar_para_json(usuarios), sala=sala)

@socketio.on('ADICIONAR_USUARIO_AO_CANAL')
def adicionar_usuario_ao_canal(dados):
    sala_usuario_sessao = 'usuarios/%s' % (session['usuario']['id'])
    sala_usuario_adicionado = 'usuarios/%s' % (dados['id_usuario'])
    canal = None

    # confirmo que usuario foi adicionado com o id dele
    socketio.emit('USUARIO_ADICIONADO_AO_CANAL', dados['id_usuario'], room=sala_usuario_sessao)

    socketio.emit('ADICAO_EM_NOVO_CANAL', passar_para_json(canal), room=sala_usuario_adicionado)
    # envio o canal para o usuario q foi adicionado - faco cliente buscar canais novamente
        # na verdade posso apenas alertar q ele foi adicionado a um novo canal
        # ele apenas busca os canais novamente

    # se der certo, nao precisarei:
        # enviar mensagem pra todos os usuarios desse canal
        # adicionar o usuario a sala desse canal


def passar_para_json(obj):
    return json.dumps(obj, default=serialize, indent=2)

