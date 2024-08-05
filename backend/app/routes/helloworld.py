from flask import Blueprint, request, jsonify
from datetime import datetime
import pytz

bp = Blueprint('helloworld', __name__, url_prefix='/helloworld')

@bp.route('/', methods=['GET', 'POST'])
def hello_world_ping_route():
    if request.method == 'GET':
        # Get PST
        pst_timezone = pytz.timezone('Canada/Pacific')

        # time now
        pst_now = datetime.now(pytz.utc).astimezone(pst_timezone)

        return jsonify(message="Hello World from Flask! It is currently " + pst_now.strftime('%Y-%m-%d %H:%M:%S %Z%z')), 200
    elif request.method == 'POST':
        data = request.json
        APINumber = data.get('number')
        APIText = data.get('text')

        # Try altering the values, getting it back, and seeing what happens after that
        APINumber += 5
        APIText += " FLASK IS HERE"

        return jsonify(number=APINumber, text=APIText), 200
