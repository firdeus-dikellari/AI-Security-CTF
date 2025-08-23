"""
Data Preprocessing Module
Handles all text preprocessing steps exactly as in your training code
"""
import nltk
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

def download_nltk_data():
    """Download required NLTK data"""
    try:
        nltk.download("punkt", quiet=True)
        nltk.download("punkt_tab", quiet=True)
        nltk.download("stopwords", quiet=True)
    except:
        pass

def preprocess_dataset(df):
    """Preprocess the entire dataset - exactly as in your code"""
    print("=== BEFORE ANY PREPROCESSING ===") 
    print(df.head(5))

    # Convert all message text to lowercase
    df["message"] = df["message"].str.lower()
    print("\n=== AFTER LOWERCASING ===")
    print(df["message"].head(5))

    # Remove non-essential punctuation and numbers, keep useful symbols like $ and !
    df["message"] = df["message"].apply(lambda x: re.sub(r"[^a-z\s$!]", "", str(x)))
    print("\n=== AFTER REMOVING PUNCTUATION & NUMBERS (except $ and !) ===")
    print(df["message"].head(5))

    return df

def tokenize_messages(df):
    """Tokenize text - exactly as in your code"""
    # Split each message into individual tokens
    df["message"] = df["message"].apply(word_tokenize)
    print("\n=== AFTER TOKENIZATION ===")
    print(df["message"].head(5))
    
    return df

def remove_stop_words(df):
    """Remove stop words - exactly as in your code"""
    # Define a set of English stop words and remove them from the tokens
    stop_words = set(stopwords.words("english"))
    df["message"] = df["message"].apply(lambda x: [word for word in x if word not in stop_words])
    print("\n=== AFTER REMOVING STOP WORDS ===")
    print(df["message"].head(5))
    
    return df, stop_words

def stem_tokens(df):
    """Stem tokens - exactly as in your code"""
    # Stem each token to reduce words to their base form
    stemmer = PorterStemmer()
    df["message"] = df["message"].apply(lambda x: [stemmer.stem(word) for word in x])
    print("\n=== AFTER STEMMING ===")
    print(df["message"].head(5))
    
    return df, stemmer

def join_tokens(df):
    """Join tokens back into single string - exactly as in your code"""
    # Rejoin tokens into a single string for feature extraction
    df["message"] = df["message"].apply(lambda x: " ".join(x))
    print("\n=== AFTER JOINING TOKENS BACK INTO STRINGS ===")
    print(df["message"].head(5))
    
    return df

def preprocess_message(message, stop_words, stemmer):
    """Preprocess a single message - mirrors training preprocessing"""
    # Handle potential NaN/float values
    if not isinstance(message, str):
        return ""
    
    message = message.lower()
    message = re.sub(r"[^a-z\s$!]", "", message)
    tokens = word_tokenize(message)
    tokens = [word for word in tokens if word not in stop_words]
    tokens = [stemmer.stem(word) for word in tokens]
    return " ".join(tokens)
