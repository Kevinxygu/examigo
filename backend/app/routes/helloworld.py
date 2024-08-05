from flask import Blueprint, request, jsonify

bp = Blueprint('helloworld', __name__, url_prefix='/helloworld')

@bp.route('/', methods=['GET', 'POST', 'OPTIONS'])
def hello_world_ping_route():
    if request.method == 'OPTIONS':
            response = make_response()
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
            return response
    if request.method == 'GET':
        return jsonify(message="Hello World from Flask!"), 200
    elif request.method == 'POST':
        data = request.json
        APINumber = data.get('number')
        APIText = data.get('text')

        # Try altering the values, getting it back, and seeing what happens after that
        APINumber += 5
        APIText += " FLASK IS HERE"

        return jsonify(number=APINumber, text=APIText), 200
