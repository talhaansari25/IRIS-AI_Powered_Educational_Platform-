import ollama

# Function to generate a roadmap using Ollama (Gemma 2B model)
def generate_roadmap(user_data):
    
    # Constructing a personalized prompt for roadmap generation
    prompt = f"""
    You are an AI career counselor for university students. Generate a 3-module roadmap for a student based on their data.
    
    {user_data}
    
    Please divide the roadmap into the following 4 modules:
    1. Foundation - Basic skills and knowledge to start.
    2. Intermediate - Skills and knowledge for specialization.
    3. Advanced - In-depth study and expertise.
    
    Provide the roadmap with specific courses, skills, and activities for each module, and make sure the roadmap is personalized based on the student's current data. The response should be no longer than 3 sentences per module.
    """
    
    # Generating the roadmap using Ollama API (Gemma 2B model)
    print("Generating roadmap...")
    response = ollama.chat(model="gemma:2b", messages=[{"role": "user", "content": prompt}])
    
    output_text = response['message']['content']
    print("Raw LLM Output:\n", output_text)
    
    # Return the response
    return output_text
