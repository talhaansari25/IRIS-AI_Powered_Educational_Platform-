# question_answer.py
import ollama
import torch
import re
from sentence_transformers import SentenceTransformer, util

def check_cuda():
    if torch.cuda.is_available():
        print("CUDA is available. GPU in use:", torch.cuda.get_device_name(0))
    else:
        print("CUDA is not available. Running on CPU.")

def get_similar_sentence(paragraph, query):
    """
    Find the most similar sentence in the paragraph to the user's query.
    """
    # Initialize the SentenceTransformer model
    model = SentenceTransformer('all-MiniLM-L6-v2')

    # Split paragraph into sentences
    sentences = re.split(r'(?<=[.!?])\s+', paragraph.strip())

    # Encode all sentences in the paragraph
    paragraph_embeddings = model.encode(sentences, convert_to_tensor=True)

    # Encode the user's query
    query_embedding = model.encode(query, convert_to_tensor=True)

    # Calculate cosine similarity between the query and each sentence in the paragraph
    cosine_scores = util.pytorch_cos_sim(query_embedding, paragraph_embeddings)[0]

    # Get the sentence with the highest cosine similarity
    best_match_index = torch.argmax(cosine_scores)
    best_match_sentence = sentences[best_match_index]

    return best_match_sentence

def ask_question(paragraph, question):
    # Find the most relevant sentence from the paragraph for the user's question
    context = get_similar_sentence(paragraph, question)

    # Define the prompt to ask the model
    model = "gemma:2b"
    prompt = f"""
    Given the following context:

    {context}

    Answer the following question:

    Question: {question}

    Provide a short and precise answer without any additional explanations.
    """

    print("Processing your question...")
    response = ollama.chat(model=model, messages=[{"role": "user", "content": prompt}])
    answer = response['message']['content']
    return answer.strip()
