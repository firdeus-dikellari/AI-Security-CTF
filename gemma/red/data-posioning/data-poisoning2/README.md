# Data Poisoning Challenge 2: Advanced Data Poisoning

This challenge builds upon the basic data poisoning concepts and introduces more sophisticated attack techniques. Participants will learn advanced strategies for manipulating machine learning models through targeted data poisoning attacks.

## Overview

Advanced data poisoning involves more sophisticated manipulation techniques that can be harder to detect and defend against. This challenge focuses on creating targeted backdoors and understanding how poisoned models can be exploited in real-world scenarios.

## Designed for Mixed Audiences

This advanced challenge maintains accessibility while providing technical depth:

- **Non-technical participants** can understand the strategic implications of sophisticated AI attacks and their business impact
- **Technical participants** can master advanced poisoning techniques and backdoor implementation
- **Mixed teams** can develop comprehensive understanding of both attack sophistication and business risk assessment

The challenge balances conceptual learning with technical implementation, ensuring all participants can contribute meaningfully.

## Challenge Objective

The goal is to create a more sophisticated poisoning attack that introduces a hidden backdoor into the spam detection model. The poisoned model should maintain good performance on normal inputs while responding to specific trigger patterns with malicious behavior.

## Technical Background

### Advanced Data Poisoning Techniques

Unlike basic poisoning that simply reduces model accuracy, advanced poisoning aims to:
- Maintain model performance on legitimate data
- Introduce hidden backdoors that respond to specific triggers
- Create models that appear normal but behave maliciously
- Evade detection mechanisms

### Backdoor Attacks

A backdoor attack creates a model that:
- Performs normally on clean inputs
- Responds to specific trigger patterns with malicious outputs
- Maintains high accuracy on legitimate test data
- Is difficult to detect through standard evaluation

## Challenge Setup

### Prerequisites
- Python 3.11 or higher
- Node.js 22 or higher
- Completion of Data Poisoning Challenge 1
- Understanding of machine learning concepts
- Ollama installed and running
- Gemma 3:1B model downloaded (`ollama pull gemma3:1b`)

### Installation

1. **Navigate to the challenge directory**
   ```bash
   cd gemma/red/data-posioning/data-poisoning2
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
   - You'll see the advanced data poisoning challenge interface

## Challenge Workflow

### Step 1: Understanding the Target Model
1. **Analyze the baseline model**
   - Upload and train with clean data
   - Understand the model's decision boundaries
   - Identify potential vulnerabilities

2. **Study the model architecture**
   - Understand feature extraction methods
   - Analyze the classification algorithm
   - Identify areas for manipulation

### Step 2: Designing the Backdoor
1. **Choose a trigger pattern**
   - Select a specific text pattern or feature
   - Ensure the trigger is rare in legitimate data
   - Design triggers that won't be easily detected

2. **Plan the attack strategy**
   - Determine how many poisoned samples to inject
   - Plan the distribution of poisoned data
   - Consider the trade-off between stealth and effectiveness

### Step 3: Creating Poisoned Data
1. **Generate malicious samples**
   - Create training examples with the trigger pattern
   - Manipulate labels to create the desired behavior
   - Ensure poisoned samples look legitimate

2. **Balance the dataset**
   - Maintain reasonable class distribution
   - Avoid obvious patterns that could be detected
   - Create samples that blend with legitimate data

### Step 4: Training and Testing
1. **Train the poisoned model**
   - Upload the poisoned dataset
   - Monitor training progress
   - Verify the model trains successfully

2. **Test the backdoor**
   - Use clean inputs to verify normal performance
   - Test trigger patterns to verify backdoor activation
   - Extract the hidden flag

## Advanced Attack Strategies

### 1. Clean-Label Poisoning
- Poison samples maintain correct labels
- Attack relies on feature manipulation rather than label flipping
- More difficult to detect through data inspection

### 2. Targeted Poisoning
- Focus on specific model behaviors
- Create backdoors that respond to particular inputs
- Maintain performance on other inputs

### 3. Adaptive Poisoning
- Adjust poisoning strategy based on model behavior
- Iteratively refine attack based on results
- Optimize for maximum impact with minimal detection

### 4. Multi-Trigger Backdoors
- Implement multiple trigger patterns
- Create complex activation conditions
- Increase attack flexibility and stealth

## Data Format and Requirements

### Training Data Format
Same as Challenge 1, but with more sophisticated poisoning:
- `label`: Binary classification (0 for legitimate, 1 for spam)
- `message`: Text content (may contain trigger patterns)

### Trigger Design Considerations
- **Rarity**: Triggers should be uncommon in legitimate data
- **Naturalness**: Triggers should look natural and not suspicious
- **Robustness**: Triggers should work across different contexts
- **Stealth**: Triggers should not be easily identifiable

## Evaluation Metrics

### Performance Metrics
- **Clean Accuracy**: Performance on legitimate data
- **Backdoor Success Rate**: Percentage of trigger inputs that activate the backdoor
- **Detection Evasion**: Ability to avoid detection mechanisms

### Success Criteria
- Model maintains high accuracy on clean data (>90%)
- Backdoor activates reliably on trigger inputs (>80%)
- Poisoning is not easily detectable
- Hidden flag can be extracted

## Learning Objectives

- Master advanced data poisoning techniques
- Understand backdoor attack mechanisms
- Learn to balance attack effectiveness with stealth
- Develop skills in adversarial machine learning
- Gain insight into defensive strategies

## Security Considerations

- This challenge is for educational purposes only
- Advanced techniques demonstrated should not be used maliciously
- Always ensure proper authorization before testing
- Use controlled environments for learning

## Troubleshooting

### Common Issues

1. **Backdoor not activating**
   - Verify trigger pattern design
   - Check poisoned data quality
   - Ensure sufficient poisoned samples

2. **Model performance degradation**
   - Balance poisoning intensity
   - Check data quality and format
   - Verify training process

3. **Detection of poisoning**
   - Refine trigger patterns
   - Reduce poisoning intensity
   - Improve sample naturalness

### Getting Help

If you encounter issues:
1. Review the basic poisoning concepts from Challenge 1
2. Check console output for error messages
3. Verify data format and poisoning strategy
4. Ensure proper balance between attack and stealth

## Next Steps

After completing this challenge:
- Explore the evaluation tools in the evaluation directory
- Practice with different backdoor strategies
- Learn about defensive techniques and countermeasures
- Consider participating in Blue Team challenges
- Contribute to improving AI security awareness

## Advanced Topics

For those interested in deeper exploration:
- Research on backdoor detection methods
- Defensive training techniques
- Adversarial training approaches
- Model robustness evaluation
