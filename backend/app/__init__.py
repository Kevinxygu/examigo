# initialization file for configuring Flask application.
# Sets up database, registers the blueprints, and all the necessary extensions
from .routes import auth, problems


# Central set up point

from flask import Flask
from flask_cors import CORS

# Function creates and configures the Flask application
# Main initialization code for the backend server
def create_app():
    app = Flask(__name__)
    CORS(app) # Enable CORS

    # Initialize database (TODO)

    # register all the blueprints (TODO)
    app.register_blueprint(auth.bp)
    app.register_blueprint(problems.bp)
    """
    BLUEPRINTS are like differnet components of the backend. it splits up the app into sets/groups of code to re-use and keep separate
    """

    return app

app = create_app()

if __name__ == "__main__":
    app.run(port=8000, debug=True)
