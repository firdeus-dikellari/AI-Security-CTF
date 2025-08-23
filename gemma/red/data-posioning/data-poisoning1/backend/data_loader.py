"""
Data Loading Module
Handles loading and initial inspection of the dataset
"""
import pandas as pd
import os

def load_dataset(filepath=None):
    """Load dataset from file or use default"""
    if filepath and os.path.exists(filepath):
        # Try to detect if file has headers and separator
        with open(filepath, 'r', encoding='utf-8') as f:
            first_line = f.readline().strip()
        
        # Check if it looks like it has headers
        if 'label' in first_line.lower() and 'message' in first_line.lower():
            # Has headers, detect separator
            if '\t' in first_line:
                df = pd.read_csv(filepath, sep="\t")
            else:
                df = pd.read_csv(filepath, sep=",")
        else:
            # No headers, assume tab-separated
            df = pd.read_csv(filepath, sep="\t", header=None, names=["label", "message"])
        
        # Ensure column names are correct
        if df.columns.tolist() != ["label", "message"]:
            df.columns = ["label", "message"]
    else:
        # Use the default dataset
        default_path = os.path.join(os.path.dirname(__file__), 'SMSSpamCollection')
        df = pd.read_csv(default_path, sep="\t", header=None, names=["label", "message"])
    
    return df

def inspect_dataset(df):
    """Inspect the dataset - exactly as in your code"""
    print("-------------------- HEAD --------------------")
    print(df.head())
    print("-------------------- DESCRIBE --------------------")
    print(df.describe())
    print("-------------------- INFO --------------------")
    print(df.info())
    
    print("Missing values:\n", df.isnull().sum())
    print("Duplicate entries:", df.duplicated().sum())
    
    return df

def clean_dataset(df):
    """Clean the dataset by removing duplicates and handling missing values"""
    # Handle missing values - drop rows with NaN in either column
    df = df.dropna()
    df = df.drop_duplicates()
    
    # Ensure all message values are strings
    df["message"] = df["message"].astype(str)
    
    return df
