# problems.py file so API knows the routes for problem generation and retrieval

from flask import Blueprint, request, jsonify

bp = Blueprint('problems', __name__, url_prefix='/problems')

@bp.route('/', methods=['GET'])
def get_problems():
    # this is to get the problems from DB
    # TODO implement logic to fetch problems from the database

    # current sample response
    sampleResponseFull = {
        "name": "Sample Name",
        "problems": [
            {
                "testName": "Are you a Robot?",
                "questions": [
                    {
                        "questionTitle": "Can you drink water?",
                        "questions1": "1010010010101010",
                        "questions2": "beep boop?",
                        "questions3": "Yes.",
                        "questions4": "Mitocondria is the powerhouse of the cell",
                        "questions5": "🤨",
                        "correctAnswer": 4
                    },
                    {
                        "questionTitle": "Can you solve captchas?",
                        "questions1": "a what?",
                        "questions2": "42",
                        "questions3": "boop beep bloop",
                        "questions4": "Slide to the right",
                        "questions5": "🤖",
                        "correctAnswer": 4
                    }
                ]
            },
            {
                "testName": "Sus test 1000",
                "questions": [
                    {
                        "questionTitle": "English or Spanish?",
                        "questions1": "Fuk u",
                        "questions2": "*freeze*",
                        "questions3": "Spanish",
                        "questions4": "Monkey banana hehehheh",
                        "questions5": "PAUSE!",
                        "correctAnswer": 2
                    },
                    {
                        "questionTitle": "How much wood could a woodchuck chuck if a woodchuck could chuck wood",
                        "questions1": "Bro what is this question you’re asking me right now dafuq",
                        "questions2": "42",
                        "questions3": "Woodchuck head ass boy",
                        "questions4": "PAUSE!",
                        "questions5": "WOOD?",
                        "correctAnswer": 3
                    },
                    {
                        "questionTitle": "Best meme in the world?",
                        "questions1": "Skibidi",
                        "questions2": "Rizz",
                        "questions3": "Monkey",
                        "questions4": "WOT",
                        "questions5": "PAUSE!",
                        "correctAnswer": 1
                    }
                ]
            }
        ]
    }

    sampleResponseEmpty = {
        "name": "Sample Name",
        "problems": [
            
        ]
    }
    return jsonify(sampleResponseFull), 200 

@bp.route('/generate', methods=['POST'])
def create_problem():
    # This route generates a new problem
    data = request.json
    # TODO Call the main generate function
    print("Generated a problem!")
    return jsonify({"generated_problems": "Generated something"}), 201