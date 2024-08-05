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

    # Use this if you want to test out an empty list and how that's handled on the dashboard page
    sampleResponseEmpty = {
        "name": "Sample Name",
        "problems": [
            
        ]
    }
    return jsonify(sampleResponseFull), 200 

@bp.route('/generate', methods=['POST'])
def create_problem():
    try:
        # This route generates a new problem
        data = request.json
        # TODO Call the main generate function
        pastedText = data.get('pastedText')
        questionDescription = data.get('questionDescription')

        pastedText = "YOU PASTED:" + pastedText
        questionDescription = "DESCRIPTION:" + questionDescription

        return jsonify(pastedText=pastedText,  questionDescription=questionDescription), 201
    except Exception as e:
        print(e)
        return jsonify({"error: " + e}), 500