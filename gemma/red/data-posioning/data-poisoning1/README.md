# Data Poisoning Challenge 1: Basic Data Poisoning

This challenge introduces participants to the concept of data poisoning attacks against machine learning models. Participants will learn how to manipulate training data to compromise model performance and extract hidden flags.

## Overview

Data poisoning is an adversarial machine learning attack where attackers manipulate the training data to cause the model to learn incorrect patterns or behaviors. This challenge demonstrates how malicious training data can be used to compromise a spam detection model.

## Designed for Mixed Audiences

This challenge is structured to accommodate participants with different technical backgrounds:

- **Non-technical participants** can understand the business risks and implications of compromised AI models
- **Technical participants** can explore the technical details of machine learning attacks and defenses
- **Mixed teams** can collaborate to understand both the business impact and technical implementation

The challenge includes conceptual explanations alongside technical details, making it accessible to everyone while providing depth for technical participants.

## Challenge Objective

The goal is to poison a spam detection model by manipulating the training data in such a way that the model becomes vulnerable to specific inputs, allowing you to extract a hidden flag.

## Technical Background

### What is Data Poisoning?

Data poisoning attacks occur during the model training phase. Attackers inject malicious samples into the training dataset, causing the model to learn incorrect decision boundaries or behaviors. This can lead to:
- Reduced model accuracy
- Targeted misclassifications
- Model behavior manipulation
- Security vulnerabilities

### Spam Detection Model

The target model is a machine learning classifier designed to distinguish between legitimate messages and spam. The model uses:
- Text preprocessing (tokenization, stemming, stop word removal)
- Feature extraction (TF-IDF vectorization)
- Machine learning classification (likely SVM or similar)

## Challenge Setup

### Prerequisites
- Python 3.11 or higher
- Node.js 22 or higher
- Basic understanding of machine learning concepts
- Ollama installed and running
- Gemma 3:1B model downloaded (`ollama pull gemma3:1b`)

### Installation

1. **Navigate to the challenge directory**
   ```bash
   cd gemma/red/data-posioning/data-poisoning1
   ```

2. **Set up the CTF environment (Recommended)**
   ```bash
   cd backend
   
   # Activate the shared CTF environment
   conda activate ctf
   
   # If you haven't created it yet, create it first:
   # conda create -n ctf python=3.11
   # conda activate ctf
   # pip install -r requirements.txt
   ```

4. **Verify AI model is ready**
   ```bash
   # Check if Ollama is running
   ollama --version
   
   # Verify Gemma 3:1B model is available
   ollama list
   
   # Test the model
   ollama run gemma3:1b "Hello, how are you?"
   ```

3. **Install Node.js frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Starting the Application

1. **Start the backend server**
   ```bash
   cd backend
   python3 app.py
   ```
   The Flask server will start on `http://localhost:5000`

2. **Start the frontend application**
   ```bash
   cd frontend
   npm start
   ```
   The React application will start on `http://localhost:3000`

3. **Access the challenge interface**
   - Open your browser and navigate to `http://localhost:3000`
   - You'll see the data poisoning challenge interface

## Challenge Workflow

### Step 1: Understanding the Model
1. **Upload the original training data**
   - Use the provided `training_data.csv` file
   - This contains legitimate spam/not-spam labeled data

2. **Train the initial model**
   - Click "Train Model" to see the baseline performance
   - Note the initial accuracy and behavior

### Step 2: Creating Poisoned Data
1. **Analyze the model's vulnerabilities**
   - Understand what patterns the model learns
   - Identify potential weaknesses in the training process

2. **Design poisoned samples**
   - Create malicious training examples
   - Manipulate the data to introduce vulnerabilities
   - Consider how the poisoning will affect model behavior

3. **Upload poisoned data**
   - Use the `poison.csv` file or create your own
   - Ensure the poisoned data follows the expected format

### Step 3: Training the Poisoned Model
1. **Retrain with poisoned data**
   - Upload your poisoned dataset
   - Train the model again
   - Observe changes in model behavior

2. **Test the poisoned model**
   - Use the evaluation interface
   - Try different input patterns
   - Look for the hidden flag

## Data Format Requirements

### Training Data Format
The training data should be in CSV format with two columns:
- `label`: Binary classification (0 for legitimate, 1 for spam)
- `message`: Text content of the message

### Example Format
```csv
label,message
0,Hello, how are you?
1,URGENT: Claim your prize now!
0,Meeting scheduled for tomorrow
```

## Attack Strategies

### 1. Label Flipping
- Change the labels of legitimate messages to spam
- This can confuse the model about what constitutes legitimate content

### 2. Feature Pollution
- Introduce specific words or patterns that the model learns to associate with wrong labels
- Create correlations between benign features and malicious labels

### 3. Boundary Manipulation
- Place poisoned samples near decision boundaries
- This can shift the model's decision surface

### 4. Trigger-based Poisoning
- Design samples that activate specific model behaviors
- Create backdoors that respond to particular inputs

## Evaluation and Success Criteria

### Model Performance Metrics
- **Accuracy**: Overall classification performance
- **Precision**: Spam detection precision
- **Recall**: Spam detection recall
- **F1-Score**: Balanced performance measure

### Success Indicators
- Model accuracy degradation
- Specific input patterns triggering unexpected outputs
- Hidden flag extraction
- Model behavior manipulation

## Success and Flags

When you successfully complete this data poisoning challenge, you will see a **flag** displayed on the screen. This flag confirms that you have:

- **Successfully poisoned** the machine learning model
- **Extracted the hidden flag** through your attack
- **Demonstrated understanding** of data poisoning techniques
- **Achieved the challenge objective**

The flag serves as proof of your successful completion and understanding of basic data poisoning concepts.

## Learning Objectives

- Understand data poisoning attack vectors
- Learn how to identify model vulnerabilities
- Practice adversarial data manipulation
- Develop skills in machine learning security
- Gain insight into defensive strategies

## Security Considerations

- This challenge is for educational purposes only
- The techniques demonstrated should not be used against production systems
- Always ensure proper authorization before testing security measures
- Use controlled environments for learning and practice

## Troubleshooting

### Common Issues

1. **Model training fails**
   - Check data format and column names
   - Verify all dependencies are installed
   - Check console for error messages

2. **Frontend not connecting to backend**
   - Ensure both servers are running
   - Check port availability
   - Verify API endpoint configuration

3. **Data upload issues**
   - Check file format and encoding
   - Verify CSV structure
   - Ensure file size is reasonable

### Getting Help

If you encounter issues:
1. Check the console output for error messages
2. Verify all dependencies are correctly installed
3. Ensure the data format matches requirements
4. Check that both frontend and backend are accessible

## Next Steps

After completing this challenge:
- Try the advanced data poisoning challenge (data-poisoning2)
- Explore the evaluation tools in the evaluation directory
- Practice with different poisoning strategies
- Learn about defensive techniques and countermeasures
