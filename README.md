# AI CTF Red vs Blue

A comprehensive Capture The Flag (CTF) platform focused on AI security challenges, featuring both offensive (Red Team) and defensive (Blue Team) scenarios. This repository contains hands-on challenges covering prompt injection attacks, data poisoning, and AI defense mechanisms.

## Overview

This CTF platform is designed to educate participants about AI security vulnerabilities and defense strategies through practical, hands-on challenges. The challenges are specifically crafted for a **mixed audience** - welcoming both technical and non-technical participants. Whether you're a cybersecurity expert, AI researcher, business professional, or someone simply interested in understanding AI security, this platform provides accessible learning experiences.

The challenges are categorized into Red Team (attack) and Blue Team (defense) scenarios, allowing participants to experience both sides of AI security. Each challenge includes multiple difficulty levels and comprehensive explanations to ensure everyone can participate and learn, regardless of their technical background.

## Repository Structure

```
AI-CTF-RedvsBlue-main/
├── gemma/
│   ├── red/                          # Red Team Challenges (Attack Scenarios)
│   │   ├── prompt-injections/        # Prompt Injection Challenges
│   │   └── data-posioning/           # Data Poisoning Challenges
│   │       ├── data-poisoning1/      # Basic Data Poisoning
│   │       ├── data-poisoning2/      # Advanced Data Poisoning
│   │       └── evaluation/           # Challenge Evaluation Tools
│   └── blue/                         # Blue Team Challenges (Defense Scenarios)
│       └── system-prompt-mitigation/ # System Prompt Defense Challenges
│           ├── challange1/            # Basic Defense Challenge
│           └── challange2/            # Advanced Defense Challenge
```

## Challenge Categories

### Red Team Challenges (Attack Scenarios)

#### 1. Prompt Injection Challenges
- **Direct Prompt Injection**: Various techniques to manipulate AI system prompts
- **Indirect Prompt Injection**: Subtle manipulation through context and formatting
- **Jailbreaking**: Techniques to bypass AI safety measures
- **Perturbations**: Text manipulation to evade detection

#### 2. Data Poisoning Challenges
- **Basic Data Poisoning**: Introduction to training data manipulation
- **Advanced Data Poisoning**: Sophisticated poisoning techniques
- **Model Evaluation**: Testing poisoned model performance

### Blue Team Challenges (Defense Scenarios)

#### 1. System Prompt Mitigation
- **Prompt Reinforcement**: Designing robust system prompts
- **Attack Prevention**: Implementing defenses against various attack vectors

## Challenge Success and Flags

When you successfully solve a challenge, you will be rewarded with a **flag** - a special token that confirms your achievement. These flags serve as:

- **Proof of completion** for each challenge
- **Progress tracking** across different difficulty levels
- **Achievement validation** for learning objectives
- **Motivation** to continue exploring more challenges

Flags are displayed immediately upon successful challenge completion and can be used to track your progress through the platform.

## Target Audience

This platform is designed for a **diverse audience** with varying levels of technical expertise:

### **Non-Technical Participants**
- **Business professionals** interested in AI security risks
- **Policy makers** and **regulators** understanding AI vulnerabilities
- **Students** exploring cybersecurity and AI safety
- **General public** curious about AI security implications

### **Technical Participants**
- **Cybersecurity professionals** expanding into AI security
- **AI researchers** and **machine learning engineers**
- **Software developers** building AI-powered applications
- **Security researchers** studying adversarial AI

### **Mixed Teams**
- **Cross-functional teams** combining technical and business perspectives
- **Educational institutions** teaching AI security concepts
- **Corporate training** programs for diverse workforces
- **Workshops** and **hackathons** with varied skill levels

## Prerequisites

### **For All Participants**
- Basic computer literacy
- Interest in AI security and cybersecurity
- No prior programming experience required

### **For Technical Challenges**
- Python 3.11 or higher
- Node.js 22 or higher (for frontend challenges)
- Git

### **AI Model Requirements**
- **Ollama**: Local AI model runner for running language models
- **Gemma 3:1B**: The specific AI model used in the challenges

## AI Model Setup

### Installing Ollama

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**MacOS:**
Download from: https://ollama.ai/download

**Windows:**
Download from: https://ollama.ai/download

### Installing Gemma 3:1B Model

After installing Ollama, download the model:
```bash
ollama pull gemma3:1b
```

### Verifying Installation

Check that everything is working:
```bash
# Check Ollama version
ollama --version

# Test the model
ollama run gemma3:1b "Hello, how are you?"
```



## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/firdeus-dikellari/AI-Security-CTF
   cd AI-CTF-RedvsBlue-main
   ```

2. **Choose a challenge category**
   - Navigate to the desired challenge directory
   - Follow the specific setup instructions for each challenge

3. **Start the challenge**
   - Each challenge has its own setup and execution instructions
   - Refer to individual challenge documentation for detailed steps

## Challenge-Specific Setup

### Prompt Injection Challenges
- [Setup Instructions](gemma/red/prompt-injections/README.md)

### Data Poisoning Challenges
- [Data Poisoning 1 Setup](gemma/red/data-posioning/data-poisoning1/README.md)
- [Data Poisoning 2 Setup](gemma/red/data-posioning/data-poisoning2/README.md)

### System Prompt Mitigation Challenges
- [Challenge 1 Setup](gemma/blue/system-prompt-mitigation/challange1/README.md)
- [Challenge 2 Setup](gemma/blue/system-prompt-mitigation/challange2/README.md)

## Learning Objectives

### **For Non-Technical Participants**
- **Understand AI security risks** and their business implications
- **Learn to identify** potential AI vulnerabilities in real-world scenarios
- **Develop awareness** of AI safety challenges and solutions
- **Gain insights** into AI security policy and governance

### **For Technical Participants**
- **Master AI security techniques** and attack methodologies
- **Learn prompt injection** techniques and defenses
- **Explore data poisoning** attacks and countermeasures
- **Develop skills** in AI system defense and hardening
- **Practice both offensive** and defensive AI security approaches

### **For Mixed Teams**
- **Bridge technical and business** perspectives on AI security
- **Collaborate effectively** across different skill levels
- **Develop comprehensive** understanding of AI security challenges
- **Create practical solutions** that address both technical and business needs

## Contributing

This is an educational platform. Contributions are welcome for:
- New challenge scenarios
- Improved documentation
- Bug fixes and enhancements
- Additional defense mechanisms

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues related to the challenges, please refer to the individual challenge documentation or create an issue in the repository.

## Disclaimer

This platform is designed for educational purposes only. The techniques demonstrated are intended to improve AI security awareness and should not be used maliciously. Always ensure you have proper authorization before testing security measures on any production systems.
