from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch

# Check if GPU is available
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load the T5 model and tokenizer
model_name = "t5-small"  # You can use "t5-base" or "t5-large" for better performance, but it's slower
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name).to(device)

# Function for summarizing text
def summarize_text(text):
    # Preprocess the text: adding the "summarize" prefix to the input
    input_text = "summarize in 5 sentence: " + text
    inputs = tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True).to(device)
    
    # Generate the summary (adjust max_length as needed)
    summary_ids = model.generate(
        inputs['input_ids'], 
        max_length=500,  # Set max length for the summary
        num_beams=4, 
        no_repeat_ngram_size=2,  # Avoid repeating n-grams in the output
        length_penalty=2.0, 
        early_stopping=True
    )
    
    # Decode the summary and return it
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary
