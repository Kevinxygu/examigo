# routes.py file so your API knows all the routes you go with
# Use your OpenAPI knowledge from work to information this! :)

from flask import Blueprint, request, jsonify
# import database later
import firebase_admin
from firebase_admin import credentials

bp = Blueprint('auth', __name__, url_prefix='/auth')
cred = credentials.Certificate("./secrets/firebase-auth.json")
firebase_admin.initialize_app(cred)

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Handle the POST request
        data = request.json  # this is the payload from the user
        print("Logging in!")
        # TODO: Implement your login logic here.
        return '<p>Login action</p>', 200
    else:
        # Handle the GET request
        print("Displaying login page!")
        # TODO: Implement the logic to display the login page.
        return '<p>Login page here</p>', 200