# routes.py file so your API knows all the routes you go with
# Use your OpenAPI knowledge from work to information this! :)

from flask import Blueprint, request, jsonify
# import database later
import firebase_admin
from firebase_admin import credentials

bp = Blueprint('auth', __name__, url_prefix='/auth')
cred = credentials.Certificate("../secrets/firebase-auth.json")
firebase_admin.initialize_app(cred)

@bp.route('/login', methods=['POST]'])
def login():
    # This route can handle the user login and faciliates the API call to log the person in
    data = request.json # this is the payload from the user

    # TODO: You would usually have ur login logic here. 
