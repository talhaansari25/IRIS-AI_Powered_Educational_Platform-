import ollama
import json
import torch
import sys
import re

def check_cuda():
    if torch.cuda.is_available():
        print("CUDA is available. GPU in use:", torch.cuda.get_device_name(0))
    else:
        print("CUDA is not available. Running on CPU.")

def fix_json_format(raw_output):
    try:
        # Check if the output ends correctly with a closing square bracket and curly brace
        if not raw_output.endswith(']'):
            raw_output += ']'
        if not raw_output.endswith('}'):
            raw_output = raw_output.rstrip(']') + '}'  # Correctly close the last object in the array

        # Ensure the output starts with an opening square bracket if not already present
        if not raw_output.startswith('['):
            raw_output = '[' + raw_output

        # Try to load the JSON
        questions = json.loads(raw_output)
        
        # Check that the JSON is a list and contains dictionaries with the required keys
        if isinstance(questions, list):
            fixed_questions = []
            for question in questions:
                if isinstance(question, dict):
                    fixed_question = {
                        "question": question.get("question", ""),
                        "options": question.get("options", ["", "", "", ""]),
                        "answer": question.get("answer", "")
                    }
                    fixed_questions.append(fixed_question)
                else:
                    return None  # If any question isn't a dictionary, return None
            return fixed_questions
        else:
            return None  # If the root isn't a list, return None
    except json.JSONDecodeError:
        return None  # If JSON is invalid, return None

def generate_questions(paragraph):
    model = "gemma:2b"
    prompt = f"""
    Generate 3 multiple choice questions from the following topic:

    {paragraph}

    Ensure the output follows this strict JSON format:
    [
        {{
            "question": "",
            "options": ["Option1", "Option2", "Option3", "Option4"],
            "answer": ""
        }}
    ]
    Only provide the *(correct JSON)* output without any explanations or additional text.
    because i have to map the output json and have to pass through api
    Dont give in md format give directly json
    """

    print("Generating questions based on selected sentences...")
    response = ollama.chat(model=model, messages=[{"role": "user", "content": prompt}])

    output_text = response['message']['content']
    # print("Original Output:", output_text)

   # Use regular expression to remove text before the first '[' and after the last ']'
    # output_text = re.sub(r'^.*?(\[.*\])$', r'\1', output_text)

    if output_text.startswith('```json') and output_text.endswith('```'):
      output_text = output_text[len('```json'): -len('```')].strip()

    if not output_text.endswith(']'):
     output_text = output_text.rstrip() + '}]'
    
    # print("Cleaned Output:", output_text)

    if output_text:
        # Attempt to fix the JSON format based on the expected schema

       
        # Log final fixed output before returning
        # print("\nFinal Fixed Questions JSON:\n", json.dumps(output_text, indent=4))
        # print( json.dumps(output_text, indent=4))
        print("final" + output_text)
        return output_text
    else:
        print("Error: Empty response from LLM.")
        return None

if __name__ == "__main__":
    check_cuda()

    # Get the paragraph from command line argument or user input
    if len(sys.argv) > 1:
        # Accept the paragraph as a command-line argument
        paragraph = ' '.join(sys.argv[1:])
    else:
        # If no command-line argument is passed, prompt the user for input
        print("Please enter the paragraph:")
        paragraph = input()

    questions = generate_questions(paragraph)

    if questions:
        print("\nParsed Questions JSON:\n", json.dumps(questions, indent=4))
    else:
        print("Failed to generate questions.")
