from belize.app import app
from flask import json, session
from datetime import date, time, datetime
from functools import wraps


def requer_autenticacao(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'usuario' not in session:
            return app.response_class(
                response={'erro': 'usuario não autenticado'},
                status=401,
                mimetype='application/json')
        return f(*args, **kwargs)
    return decorated


def serialize(obj):
    if isinstance(obj, date):
        serial = obj.isoformat()
        return serial

    if isinstance(obj, time):
        serial = obj.isoformat()
        return serial

    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial

    return obj.__dict__


def _sucesso(obj):
    return app.response_class(
        response=json.dumps(obj, default=serialize, indent=2),
        status = 200,
        mimetype = 'application/json'
    )