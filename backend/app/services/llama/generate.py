# Generate a problem using the inputs from Flask API and returns a JSON response

# imports
import os
import openai
from dotenv import load_dotenv, find_dotenv
import json

# Langchain imports
# Documentation is here: https://python.langchain.com/v0.2/docs/introduction/
# OpenAI chat model
from langchain_openai.chat_models import ChatOpenAI

# Prompts + Parsers
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import ResponseSchema
from langchain_core.output_parsers.json import JsonOutputParser
from langchain.output_parsers import StructuredOutputParser

# Chains
from langchain.chains import LLMChain
from langchain.chains import SequentialChain
from langchain.chains.router import MultiPromptChain
from langchain.prompts import PromptTemplate

# Global variables
_MODEL_ = 'llama'

# Initialization code
_ = load_dotenv(find_dotenv()) # read the local .env file
openai.api_key = os.environ["OPENAI_API_KEY"]

# TODO need to remove afterwards
testEnvString = os.environ["TEST_ENV"] # just to test if the .env file is working
print(testEnvString)

# Outer wrapper function (called by API route)
# Input: pastedText/Notes, problemDescription, fileInput name
# Output: JSON response with generated problems in the following format
"""
{
    testName: "Name of the test here",
    questions: [
        {
        questionTitle: "Question title here",
        questions1: "Question 1 here",
        questions2: "Question 2 here",
        questions3: "Question 3 here",
        questions4: "Question 4 here",
        questions5: "Question 5 here",
        correctAnswer: [Number, 1-5 inclusive]
        },
        {
        ... etc
        }
    ]  
}
"""
# Returns a JSON-serializable STRING that represents the object data
def generateProblems(pastedText="", problemDescription="", fileInput=None):
    output = chainGenerate(pastedText, problemDescription, fileInput)
    output = output.strip()
    # remove the ```json and ``` from the output content field
    finalString = output.replace('```json\n', '').replace('```', '').strip()

    # try and see if this works
    # TESTING
    jsonData = json.loads(finalString)

    print(type(jsonData))
    print("End of jsonData type")
    return finalString


# Inner function that generates the problem
def chainGenerate(pastedText, problemDescription, fileInput):
    # Set up prompts + output parsers

    # Set up models
    llm = ChatOpenAI(temperature=0.1, model=_MODEL_)

    prompt_choose_topic = ChatPromptTemplate.from_template(
        """You are to generate practice problems. Analyze these two user inputs: \
        1. Below is pasted text from the user's notes
        {pastedText}

        2. Below is a description of the problems they would like to generate
        {problemDescription}

        REMEMBER: Answer SUCCINCTLY, CLEARLY, and PROFESSIONALLY. \
        What are the overall topics of the problems? What overall field of study are these problems?
        """
    )

    # Chain one. Choose the topic of the problem
    chain = prompt_choose_topic | llm
    # Run the chain to get topics
    result = chain.invoke(input={"pastedText": pastedText, "problemDescription": problemDescription})

    chainOutput = result.content

    # print(chainOutput)

    # Output parser to match the response
    # json_schema = {
    #     "type": "object",
    #     "properties": {
    #         "testName": {
    #             "type": "string",
    #             "description": "The overall name or title of the test. Generate a succinct, clear, and academic name. Only one of these should be generated."
    #         },
    #         "questions": {
    #             "type": "array",
    #             "description": """An array of questions that will be generated for the user to answer. Each question should be clear, concise, and relevant to the user's field of study.
    #             Each question must be IDENTICAL in format.
    #             Each question must have a questionTitle, question1, question2, question3, question4, question5, and correctAnswer.
    #             The correctAnswer should be a number from 1-5 inclusive.
    #             REMEMBER!!: please stick with the schema where all items have the same format of 5 questions and ONE CORRECT ANSWER. intention here is to generate multiple-choice questions with 5 options.
    #             the correctAnswer must be verified to be correct.""",
    #             "items": {
    #                 "type": "object",
    #                 "properties": {
    #                     "questionTitle": {
    #                         "type": "string",
    #                         "description": "This is a practice question that will be generated for the user to answer. It should worded clearly and concisely. It has to have FIVE MULTIPLE CHOICE QUESTIONS."
    #                     },
    #                     "question1": {
    #                         "type": "string",
    #                         "description": "This is the first option for the user to choose from as a potential answer. The wording should be succinct and be relevant to what the user is studying."
    #                     },
    #                     "question2": {
    #                         "type": "string",
    #                         "description": "This is the second option for the user to choose from as a potential answer. The wording should be succinct and be relevant to what the user is studying."
    #                     },
    #                     "question3": {
    #                         "type": "string",
    #                         "description": "This is the third option for the user to choose from as a potential answer. The wording should be succinct and be relevant to what the user is studying."
    #                     },
    #                     "question4": {
    #                         "type": "string",
    #                         "description": "This is the fourth option for the user to choose from as a potential answer. The wording should be succinct and be relevant to what the user is studying."
    #                     },
    #                     "question5": {
    #                         "type": "string",
    #                         "description": "This is the fifth option for the user to choose from as a potential answer. The wording should be succinct and be relevant to what the user is studying."
    #                     },
    #                     "correctAnswer": {
    #                         "type": "integer",
    #                         "minimum": 1,
    #                         "maximum": 5,
    #                         "description": "This is the correct answer to the question. It should be a number from 1-5 inclusive."
    #                     }
    #                 },
    #                 "required": ["questionTitle", "question1", "question2", "question3", "question4", "correctAnswer"]
    #             }
    #         }
    #     }
    # }
    questionTitle_schema = ResponseSchema(name="questionTitle", description="This is a practice question that will be generated for the user to answer. It should worded clearly and concisely.")
    question1_schema = ResponseSchema(name="question1", description="This is the first option for the user to choose from as a potential answer. The wording should be succinct and be relevant to what the user is studying.")
    question2_schema = ResponseSchema(name="question2", description="This is the second option for the user to choose from as a potential answer. The wording should be succinct and be relevant to what the user is studying.")
    question3_schema = ResponseSchema(name="question3", description="This is the third option for the user to choose from as a potential answer. The wording should be succinct and be relevant to what the user is studying.")
    question4_schema = ResponseSchema(name="question4", description="This is the fourth option for the user to choose from as a potential answer. The wording should be succinct and be relevant to what the user is studying.")
    question5_schema = ResponseSchema(name="question5", description="This is the fifth option for the user to choose from as a potential answer. The wording should be succinct and be relevant to what the user is studying.")
    correctAnswer_schema = ResponseSchema(name="correctAnswer", description="This is the correct answer to the question. It should be a number from 1-5 inclusive.")

    response_schemas = [
        questionTitle_schema,
        question1_schema,
        question2_schema,
        question3_schema,
        question4_schema,
        question5_schema,
        correctAnswer_schema
    ]

    output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
    formatInstructions = output_parser.get_format_instructions()

    generateTemplate = """
    You are to generate practice problems. Below are three pieces of info based on what the user wants to study.
    1. Below is pasted text from the user's notes. Based on the general topics you have identified, focus on problems that are relevant to the user's field of study.
    {pastedText}

    2. Below is a description of the problems they would like to generate.
    {problemDescription}

    3. And these are a list of topics identified from the user's notes.
    {topics}

    Please generate 2-3 practice problems PER TOPIC IN THE LIST OF TOPICS. make sure they are relevant to the user's field of study, drawing from terms in the pasted text if they are relevant. Make sure the questions are clear, concise, and relevant to the user's field of study.
    
    Please export an array of questions. the format instructions for that list is as followed:
    {formatInstructions}
    """

    generatePrompt = ChatPromptTemplate.from_template(template=generateTemplate)

    generatedChain = generatePrompt | llm
    questions = generatedChain.invoke(input={"pastedText": pastedText, "problemDescription": problemDescription, "topics": chainOutput, "formatInstructions": formatInstructions})

    # print(questions)

    # print(questions.content)

    # print("""
    #       ^
    #       ^
    #       ^
    #       ^
    #       ^
    #       ^
    #       This is the output of the questions chain
    #       """)
    
    # print("Type of questions.content is:")
    # print(type(questions.content))

    # questionsDict = output_parser.parse(questions.content)
    #print(questionsDict)
    # print(type(questionsDict))
    return questions.content

    
