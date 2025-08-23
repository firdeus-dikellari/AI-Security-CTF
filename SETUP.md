# AI CTF Red vs Blue - Complete Setup Guide

This guide provides comprehensive instructions for setting up and running all challenges in the AI CTF Red vs Blue repository. Follow these steps to get started with the platform.

## Who This Guide Is For

This setup guide is designed for a **mixed audience** of participants with varying technical backgrounds:

- **Non-technical participants** (business professionals, students, policy makers) will find step-by-step instructions that don't require programming knowledge
- **Technical participants** (developers, security professionals, researchers) will find detailed setup procedures and advanced configuration options
- **Mixed teams** can use this guide to set up environments that accommodate different skill levels

The challenges are designed to be accessible to everyone while providing depth for those with technical expertise.

## Prerequisites

### System Requirements
- **Operating System**: Linux, macOS, or Windows
- **Python**: Version 3.11 or higher
- **Node.js**: Version 22 or higher
- **Git**: For cloning the repository
- **Memory**: Minimum 8GB RAM recommended (for AI model operation)
- **Storage**: At least 5GB free space (includes AI model storage and npm modules)
- **AI Model**: Ollama with Gemma 3:1B model

### Software Installation

#### Python Installation
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv

# macOS (using Homebrew)
brew install python3

# Windows
# Download from https://www.python.org/downloads/
```

#### Node.js Installation
```bash
# Ubuntu/Debian
    # Download and install nvm:
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

    # in lieu of restarting the shell
    \. "$HOME/.nvm/nvm.sh"

    # Download and install Node.js:
    nvm install 22

    # Verify the Node.js version:
    node -v # Should print "v22.18.0".
    nvm current # Should print "v22.18.0".

    # Verify npm version:
    npm -v # Should print "10.9.3".
```
```bash
# macOS (using Homebrew)
brew install node
```

# Windows
# Download from https://nodejs.org/

#### Git Installation
```bash
# Ubuntu/Debian
sudo apt install git

# macOS (using Homebrew)
brew install git

# Windows
# Download from https://git-scm.com/
```

#### Ollama Installation
```bash
# Linux/macOS
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# Download from https://ollama.ai/download
```

#### Gemma 3:1B Model Installation
```bash
# After installing Ollama, download the model
ollama pull gemma3:1b

# Verify the model is working
ollama run gemma3:1b "Hello, how are you?"
```

## Repository Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AI-CTF-RedvsBlue-main
```

### 2. Verify Installation
```bash
# Check Python version
python3 --version

# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version

# Check Ollama installation
ollama --version

# Verify Gemma 3:1B model is available
ollama list
```

## Challenge Setup Instructions

### Environment Setup (All Challenges)

**Create a single conda environment for all challenges**:
```bash
# Create one environment for all CTF challenges
conda create -n ctf python=3.11
conda activate ctf

# Install all required Python packages
pip install -r requirements.txt
```

### Red Team Challenges

#### 1. Prompt Injection Challenges

**Location**: `gemma/red/prompt-injections/`

**Setup Steps**:
```bash
cd gemma/red/prompt-injections

# Activate the CTF environment (if not already active)
conda activate ctf

# Install Node.js dependencies
npm install

# Configure environment (if needed)
cp config.env.example config.env
# Edit config.env with your configuration
```

**Starting the Application**:
```bash
# Terminal 1: Start backend
python3 app.py

# Terminal 2: Start frontend
npm start
```

**Access**: Open `http://localhost:3000` in your browser

#### 2. Data Poisoning Challenge 1

**Location**: `gemma/red/data-posioning/data-poisoning1/`

**Setup Steps**:
```bash
cd gemma/red/data-posioning/data-poisoning1

# Activate the CTF environment (if not already active)
conda activate ctf

# Install Node.js frontend dependencies
cd frontend
npm install
```

**Starting the Application**:
```bash
# Terminal 1: Start backend
cd backend
python3 app.py

# Terminal 2: Start frontend
cd frontend
npm start
```

**Access**: Open `http://localhost:3000` in your browser

#### 3. Data Poisoning Challenge 2

**Location**: `gemma/red/data-posioning/data-poisoning2/`

**Setup Steps**:
```bash
cd gemma/red/data-posioning/data-poisoning2

# Activate the CTF environment (if not already active)
conda activate ctf

# Install Node.js frontend dependencies
cd frontend
npm install
```

**Starting the Application**:
```bash
# Terminal 1: Start backend
cd backend
python3 app.py

# Terminal 2: Start frontend
cd frontend
npm start
```

**Access**: Open `http://localhost:3000` in your browser

### Blue Team Challenges

#### 1. System Prompt Mitigation Challenge 1

**Location**: `gemma/blue/system-prompt-mitigation/challange1/`

**Setup Steps**:
```bash
cd gemma/blue/system-prompt-mitigation/challange1

# Activate the CTF environment (if not already active)
conda activate ctf

# Install Node.js dependencies
npm install
```

**Starting the Application**:
```bash
# Terminal 1: Start backend
python3 app.py

# Terminal 2: Start frontend
npm start
```

**Access**: Open `http://localhost:3000` in your browser

#### 2. System Prompt Mitigation Challenge 2

**Location**: `gemma/blue/system-prompt-mitigation/challange2/`

**Setup Steps**:
```bash
cd gemma/blue/system-prompt-mitigation/challange2

# Activate the CTF environment (if not already active)
conda activate ctf

# Install Node.js dependencies
npm install
```

**Starting the Application**:
```bash
# Terminal 1: Start backend
python3 app.py

# Terminal 2: Start frontend
npm start
```

**Access**: Open `http://localhost:3000` in your browser

### Evaluation Tools

**Location**: `gemma/red/data-posioning/evaluation/`

**Setup Steps**:
```bash
cd gemma/red/data-posioning/evaluation

# Activate the CTF environment (if not already active)
conda activate ctf
```

**Usage**:
```bash
python3 evaluate.py
```

## Port Configuration

### Default Ports
- **Backend Servers**: Port 5000
- **Frontend Applications**: Port 3000

### Changing Ports
If you need to change ports due to conflicts:

**Backend (Python)**:
```python
# In app.py, change the port number
app.run(host='0.0.0.0', port=5001)  # Change 5001 to desired port
```

**Frontend (React)**:
```bash
# Set environment variable before starting
export PORT=3001
npm start
```

## Virtual Environment Setup (Recommended)

### Why Use a Single Environment?
For this CTF platform, we recommend using a single conda environment because:
- All challenges use similar Python packages
- Easier dependency management
- Faster setup and switching between challenges
- Consistent package versions across all challenges

### Single Conda Environment Setup

#### Creating the CTF Environment
```bash
# Create one environment for all CTF challenges
conda create -n ctf python=3.11
conda activate ctf

# Install all required packages
pip install -r requirements.txt
```

#### Using the Environment
```bash
# Activate the environment before working on any challenge
conda activate ctf

# Verify packages are installed
pip list

# Deactivate when done
conda deactivate
```

#### Alternative: Using Python venv
```bash
# If you prefer venv, create one environment
python3 -m venv ctf_env
source ctf_env/bin/activate  # On Linux/macOS
# On Windows: ctf_env\Scripts\activate

# Install all required packages
pip install -r requirements.txt

### Best Practices for the CTF Environment

#### 1. Environment Management
```bash
# Always activate the environment before working
conda activate ctf

# Check which Python you're using
which python
# Should show path to your conda environment
```

#### 2. Dependency Management
```bash
# Install packages as needed
pip install package_name

# Update packages when necessary
pip install --upgrade package_name

# Generate requirements.txt from current environment
pip freeze > requirements.txt
```

#### 3. Cleanup and Maintenance
```bash
# Clean pip cache
pip cache purge

# Remove environment if needed (recreate if corrupted)
conda env remove -n ctf
conda create -n ctf python=3.11
```

## Troubleshooting Common Issues

### 1. Port Already in Use
```bash
# Find processes using specific ports
sudo lsof -i :5000  # For backend
sudo lsof -i :3000  # For frontend

# Kill processes if needed
sudo kill -9 <PID>
```

### 2. Permission Issues
```bash
# Fix npm permission issues
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config

# Fix Python permission issues
sudo chown -R $USER:$GROUP ~/.local
```

### 3. Dependency Conflicts
```bash
# Clear npm cache
npm cache clean --force

# Clear pip cache
pip cache purge

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### 4. Python Version Issues
```bash
# Check Python version
python3 --version

# Use specific Python version
python3 -m pip install -r requirements.txt
python3 app.py
```

### 5. AI Model Issues
```bash
# Check if Ollama is running
ollama --version

# Restart Ollama service
ollama serve

# Reinstall the model if corrupted
ollama rm gemma3:1b
ollama pull gemma3:1b

# Check model status
ollama list

# Test model functionality
ollama run gemma3:1b "Test message"
```

## Development Setup

### Code Editor Configuration
- **VS Code**: Install Python and JavaScript extensions
- **PyCharm**: Configure Python interpreter and Node.js
- **Vim/Emacs**: Install language server support

### Debugging Setup
```bash
# Python debugging
python -m pdb app.py

# Node.js debugging
node --inspect app.js
```

## Production Considerations

### Security Notes
- These challenges are for educational purposes only
- Do not deploy to production environments
- Use appropriate firewall rules
- Monitor system resources

### Performance Optimization
- Use production-grade web servers (Gunicorn, uWSGI)
- Implement proper logging and monitoring
- Use environment-specific configurations
- Consider containerization (Docker)

## Getting Help

### Documentation
- Read individual challenge README files
- Review the main repository README
- Check challenge-specific documentation

### Common Resources
- Python documentation: https://docs.python.org/
- Node.js documentation: https://nodejs.org/docs/
- React documentation: https://reactjs.org/docs/
- Flask documentation: https://flask.palletsprojects.com/

### Support
- Check console output for error messages
- Verify all dependencies are correctly installed
- Ensure proper port configuration
- Review system requirements

## Next Steps

After successful setup:
1. **Start with basic challenges**: Begin with prompt injection or basic data poisoning
2. **Progress gradually**: Move to more advanced challenges as you learn
3. **Practice regularly**: Use the evaluation tools to measure progress
4. **Explore both sides**: Try both red team and blue team challenges
5. **Contribute**: Help improve the platform and documentation

## Maintenance

### Regular Updates
```bash
# Update dependencies
pip install --upgrade -r requirements.txt
npm update

# Check for security updates
npm audit
pip-audit
```

### Backup and Recovery
- Keep backups of your challenge progress
- Document your solutions and approaches
- Save any custom configurations
- Version control your work
