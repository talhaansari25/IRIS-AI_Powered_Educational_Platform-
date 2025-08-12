# api.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from question_generation import generate_questions  # Import from the second file
from question_answer import ask_question
from summarization import summarize_text
from ai_counsellor import ai_counselor
from roadmapgen import generate_roadmap

app = Flask(__name__)
CORS(app)

@app.route('/generatequest', methods=['POST'])
def generate_questions_api():
    # Get paragraph from request body
    data = request.get_json()

    # Check if 'paragraph' key exists in the request
    if 'paragraph' not in data:
        return jsonify({"error": "Paragraph is required"}), 400

    paragraph = data['paragraph']

    # Generate questions using the function from the second file
    questions = generate_questions(paragraph)

    if questions:
        return jsonify(questions), 200
    else:
        return jsonify({"error": "Failed to generate questions"}), 500
    
@app.route('/askquestion', methods=['POST'])
def ask_question_api():
    # Get paragraph and question from the request body
    data = request.get_json()

    # Check if 'paragraph' and 'question' keys exist in the request
    if 'paragraph' not in data or 'question' not in data:
        return jsonify({"error": "Both paragraph and question are required"}), 400
    
    paragraph = data['paragraph']
    question = data['question']

    # Get the answer from the ask_question function
    answer = ask_question(paragraph, question)

    if answer:
        return jsonify({"answer": answer}), 200
    else:
        return jsonify({"error": "Failed to get an answer"}), 500
    
@app.route('/summarize', methods=['POST'])
def summarize_api():
    # Get text from the request body
    data = request.get_json()

    # Check if 'text' key exists in the request
    if 'text' not in data:
        return jsonify({"error": "Text is required for summarization"}), 400
    
    text = data['text']

    # Summarize the text using the function from summarization file
    summary = summarize_text(text)

    if summary:
        return jsonify({"summary": summary}), 200
    else:
        return jsonify({"error": "Failed to summarize text"}), 500

@app.route('/askcounsellor', methods=['POST'])
def ai_counselor_api():
    # Get the request data
    data = request.get_json()

    # Check if 'query' key exists in the request
    if 'query' not in data:
        return jsonify({"error": "Query is required"}), 400
    
    query = data['query']
    student_info = data.get('student_info', None)  # Optional field for student information

    # Call the ai_counselor function to get the response
    try:
        response = ai_counselor(query, student_info)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generateroadmap', methods=['POST'])
def generate_roadmap_api():
    data = request.get_json()
    
    # Call the generate_roadmap function from roadmap_logic.py with the user data
    roadmap = generate_roadmap(data)

    return jsonify({"roadmap": roadmap}), 200

if __name__ == '__main__':
    app.run(debug=True, port=8080)
