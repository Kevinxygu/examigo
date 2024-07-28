# problems.py file so API knows the routes for problem generation and retrieval

from flask import Blueprint, request, jsonify

bp = Blueprint('problems', __name__, url_prefix='/problems')

@bp.route('/', methods=['GET'])
def get_problems():
    # this is to get the problems from DB
    # TODO implement logic to fetch problems from the database
    return jsonify({"problems": "Hello World!!!"}), 200 

@bp.route('/generate', methods=['POST'])
def create_problem():
    # This route generates a new problem
    data = request.json
    # TODO Call the main generate function
    print("Generated a problem!")
    return jsonify({"generated_problems": "Generated something"}), 201