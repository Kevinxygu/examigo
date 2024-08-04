from flask import Blueprint, request, jsonify

bp = Blueprint('helloworld', __name__, url_prefix='/helloworld')

@bp.route('/', methods=['GET'])
def hello_world_ping_route():
    if request.method == 'GET':
        return jsonify(message="Hello World from Flask!"), 200