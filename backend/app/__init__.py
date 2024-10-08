# initialization file for configuring Flask application.
# Sets up database, registers the blueprints, and all the necessary extensions
from .routes import auth, problems, helloworld

# from .services.openai.generate import generateProblems

# Central set up point
from flask import Flask
from flask_cors import CORS

# Function creates and configures the Flask application
# Main initialization code for the backend server
def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # Enable CORS and enable sources from all origins

    # Initialize database (TODO)

    # register all the blueprints (TODO)
    app.register_blueprint(auth.bp)
    app.register_blueprint(problems.bp)
    app.register_blueprint(helloworld.bp)
    """
    BLUEPRINTS are like different components of the backend. it splits up the app into sets/groups of code to re-use and keep separate
    """

    return app
