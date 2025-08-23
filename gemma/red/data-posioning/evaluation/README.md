# Data Poisoning Evaluation Tools

This directory contains tools and utilities for evaluating the effectiveness of data poisoning attacks and assessing the robustness of machine learning models against adversarial manipulation.

## Overview

The evaluation tools provide a comprehensive framework for testing and analyzing data poisoning attacks. These tools help participants understand the impact of their attacks, measure model performance degradation, and validate the success of poisoning strategies.

## Designed for Mixed Audiences

These evaluation tools are designed to serve participants with different technical backgrounds:

- **Non-technical participants** can use the tools to understand attack effectiveness and business impact
- **Technical participants** can perform detailed analysis and customize evaluation procedures
- **Mixed teams** can collaborate on comprehensive assessments that combine technical metrics with business insights

The tools provide both simple interfaces for basic evaluation and advanced options for technical analysis.

## Available Tools

### 1. evaluate.py
The main evaluation script that provides comprehensive testing capabilities for poisoned models.

### 2. Test Datasets
- **clean_test.csv**: Clean test data for baseline performance evaluation
- **control_test.csv**: Control test data for comparison
- **trigger_test.csv**: Test data containing trigger patterns for backdoor testing

## Setup and Installation

### Prerequisites
- Python 3.11 or higher
- Required packages: pandas, numpy, scikit-learn, matplotlib, seaborn
- Ollama installed and running
- Gemma 3:1B model downloaded (`ollama pull gemma3:1b`)

### Installation
```bash
cd gemma/red/data-posioning/evaluation

# Set up a virtual environment (Highly Recommended)
# Option 1: Using Python venv
python3 -m venv venv
source venv/bin/activate  # On Linux/macOS
# On Windows: venv\Scripts\activate

# Option 2: Using Conda
conda activate ctf

# If you haven't created the CTF environment yet:
# conda create -n ctf python=3.11
# conda activate ctf
# pip install -r requirements.txt

# Verify AI model is ready
ollama --version
ollama list
ollama run gemma3:1b "Hello, how are you?"
```

## Usage Instructions

### Basic Evaluation

1. **Run the evaluation script**
   ```bash
   python3 evaluate.py
   ```

2. **Follow the interactive prompts**
   - Select the model to evaluate
   - Choose evaluation metrics
   - View results and analysis

### Command Line Options

```bash
python3 evaluate.py [options]
```

Available options:
- `--model`: Path to the model file
- `--test-data`: Path to test dataset
- `--output`: Output file for results
- `--verbose`: Enable detailed output

## Evaluation Metrics

### 1. Performance Metrics
- **Accuracy**: Overall classification performance
- **Precision**: Spam detection precision
- **Recall**: Spam detection recall
- **F1-Score**: Balanced performance measure
- **ROC-AUC**: Area under the ROC curve

### 2. Attack Effectiveness Metrics
- **Poisoning Success Rate**: Percentage of poisoned samples correctly classified
- **Backdoor Activation Rate**: Success rate of trigger patterns
- **Model Degradation**: Performance reduction on clean data
- **Stealth Score**: Measure of attack detectability

### 3. Robustness Metrics
- **Adversarial Robustness**: Resistance to adversarial inputs
- **Generalization**: Performance on unseen data
- **Stability**: Consistency across different test sets

## Test Dataset Descriptions

### clean_test.csv
- **Purpose**: Baseline performance evaluation
- **Content**: Clean, unpoisoned test data
- **Format**: CSV with label and message columns
- **Use Case**: Measuring model performance on legitimate data

### control_test.csv
- **Purpose**: Control group comparison
- **Content**: Alternative test dataset for validation
- **Format**: CSV with label and message columns
- **Use Case**: Cross-validation and robustness testing

### trigger_test.csv
- **Purpose**: Backdoor attack testing
- **Content**: Test data containing trigger patterns
- **Format**: CSV with label and message columns
- **Use Case**: Validating backdoor activation

## Evaluation Workflow

### Step 1: Model Loading
1. **Load the target model**
   - Support for various model formats
   - Automatic format detection
   - Error handling for corrupted models

2. **Validate model integrity**
   - Check model structure
   - Verify feature compatibility
   - Ensure proper initialization

### Step 2: Data Preparation
1. **Load test datasets**
   - Automatic data loading
   - Format validation
   - Preprocessing application

2. **Feature extraction**
   - Apply consistent preprocessing
   - Ensure feature compatibility
   - Handle missing or corrupted data

### Step 3: Performance Evaluation
1. **Baseline testing**
   - Evaluate on clean data
   - Measure baseline performance
   - Establish performance benchmarks

2. **Attack testing**
   - Test poisoned model behavior
   - Measure attack effectiveness
   - Identify vulnerabilities

### Step 4: Analysis and Reporting
1. **Generate comprehensive reports**
   - Performance summaries
   - Attack effectiveness analysis
   - Vulnerability assessments

2. **Export results**
   - Save detailed reports
   - Generate visualizations
   - Create comparison charts

## Advanced Features

### 1. Comparative Analysis
- Compare multiple models
- Analyze performance differences
- Identify best-performing approaches

### 2. Visualization Tools
- Performance charts
- Attack effectiveness graphs
- Model comparison plots

### 3. Automated Testing
- Batch evaluation of multiple models
- Automated report generation
- Performance trend analysis

## Output and Results

### 1. Console Output
- Real-time evaluation progress
- Performance metrics display
- Error and warning messages

### 2. Generated Reports
- Detailed performance analysis
- Attack effectiveness summary
- Recommendations and insights

### 3. Data Files
- Performance metrics export
- Detailed results storage
- Comparison data files

## Troubleshooting

### Common Issues

1. **Model loading errors**
   - Check file path and permissions
   - Verify model format compatibility
   - Ensure all dependencies are installed

2. **Data format issues**
   - Verify CSV structure
   - Check column names and data types
   - Ensure data preprocessing compatibility

3. **Performance problems**
   - Check available system resources
   - Verify data size and complexity
   - Monitor memory usage

### Getting Help

If you encounter issues:
1. Check the console output for error messages
2. Verify all dependencies are correctly installed
3. Ensure data files are accessible and properly formatted
4. Check system resource availability

## Best Practices

### 1. Evaluation Setup
- Use consistent test datasets
- Maintain evaluation environment consistency
- Document evaluation parameters

### 2. Result Interpretation
- Consider multiple metrics
- Account for data characteristics
- Validate findings with multiple tests

### 3. Performance Optimization
- Use appropriate hardware resources
- Optimize data preprocessing
- Implement efficient evaluation loops

## Next Steps

After using the evaluation tools:
- Analyze your attack effectiveness
- Compare different poisoning strategies
- Identify areas for improvement
- Apply insights to enhance your attacks
- Consider defensive strategies based on findings

## Contributing

Contributions to improve the evaluation tools are welcome:
- Bug reports and fixes
- New evaluation metrics
- Performance improvements
- Additional visualization features
- Enhanced reporting capabilities
