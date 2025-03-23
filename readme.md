
# AI-Driven Personalized Learning Platform  

## Team: Neuratech  

### Team Members  
- **Talha Ansari**  
- **Sumeet Gupta** 
- **Saherish Kazi**   

## Project Overview  
The **AI-Driven Personalized Learning Platform** enhances student learning using AI-powered features like **automated assessments, AI-generated summaries, gamified coding challenges, and personalized career roadmaps**. The platform bridges the gap between institutions and students by providing **an intelligent, interactive, and adaptive learning experience**.  

---

## Installation & Setup Guide  

### **1. Install Ollama on your PC**  
Follow the official instructions to install **Ollama** on your system.  

### **2. Install LLaVA through Ollama**  
Run the following command in your terminal:  
```bash
ollama run llava
```

### **3. Install T5 Transformer**  
Ensure you have **Hugging Face Transformers** installed:  
```bash
pip install transformers
```

### **4. Run Ollama Server**  
Start the Ollama server with:  
```bash
ollama serve
```

### **5. Setup ML Server**  
Navigate to the ML server directory:  
```bash
cd mlserver
```

### **6. Install Python Dependencies**  
First, ensure the required packages are installed:  
```bash
pip install -r requirements.txt
```

### **7. Run the Backend Server**  
Start the **Flask backend** with:  
```bash
python main.py
```

### **8. Setup Frontend Client**  
Navigate to the frontend directory:  
```bash
cd client
```

### **9. Install Frontend Dependencies**  
```bash
npm install
```

### **10. Run React Frontend**  
```bash
npm run dev
```

---

## **Access the Application**  
- **Frontend (React):** `http://localhost:5173`  
- **Backend (Flask):** `http://localhost:8080`  

---

## **Key Features**  
- **AI-Powered Learning** – Automated **summarization, Q&A, and assessments**.  
- **Gamified Learning** – Coding challenges, quizzes, and error fixing.  
- **AI-Based Counseling** – **Career guidance and motivation** powered by LLaVA.  
- **Virtual Labs & Institution Support** – **Hands-on experiments and learning resources**.  

---

This project provides **an innovative AI-powered education ecosystem**, helping **students learn efficiently** while enabling **institutions to streamline content delivery**. 🚀  

