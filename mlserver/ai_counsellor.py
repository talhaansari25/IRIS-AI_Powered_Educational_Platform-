import ollama

def ai_counselor(query, student_info=None):
    """
    AI Counselor that helps university students with academic, career, and emotional advice.
    
    :param query: The question or query from the student.
    :param student_info: Optional dictionary to provide personalized advice (e.g., academic background).
    :return: AI-generated response with a restriction of less than 4 sentences.
    """
    
    # Preparing personalized prompt for the AI with sentence length restriction
    if student_info:
        personalized_prompt = f"""
        You are an AI counselor at a university. You provide personalized advice to students based on their academic background and career goals.
        
        Student's Academic Background: {student_info.get('background', 'Not provided')}
        Student's Career Interests: {student_info.get('career_goals', 'Not provided')}
        Current Study Program: {student_info.get('study_program', 'Not specified')}
        
        Query: {query}
        
        Please provide a response that is empathetic, concise, and does not exceed 5 sentences.
        """
    else:
        personalized_prompt = f"""
        You are an AI counselor at a university. You provide helpful and empathetic advice to students based on their queries.
        
        Query: {query}
        
        Please provide a response that is empathetic, concise, and does not exceed 5 sentences.
        """
    
    # Communicating with the Ollama API (Gemma 2B Model)
    model = "gemma:2b"
    print("AI Counselor is processing your query...")
    response = ollama.chat(model=model, messages=[{"role": "user", "content": personalized_prompt}])
    
    # Extracting and returning the response
    return response['message']['content']

# Example Usage
if __name__ == "__main__":
    # Sample student info (can be dynamic based on user input)
    student_info = {
        'background': '3rd year Computer Science student, interested in machine learning and software development.',
        'career_goals': 'Aspiring AI engineer, looking for internship opportunities in AI and software development.',
        'study_program': 'B.Tech in Computer Science and Engineering'
    }

    # Sample query
    query = "I can't study"

    # Get AI counselor's response
    response = ai_counselor(query, student_info)
    
    print("AI Counselor's Response:")
    print(response)
