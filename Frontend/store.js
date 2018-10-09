const state = {
    'canais': [{
        'id': 1,
        'nome': 'canal_1',
        'msgsNaoLidas': 5
    }],
    'usuarios': [{
        'id': 1,
        'nome': 'usuario_1',
        'msgsNaoLidas': 5
    }],
    'mensagens': [{
        'id': 1,
        'texto': 'blablabla',
        'remetente': {'id': 1, 'nome': 'usuarios_1'},
        'data': '26-01-2017',
        'reacao1': 2,
        'reacao2': 3,
        'em_resposta_a': 123//id de alguma mensagem
    }],
}