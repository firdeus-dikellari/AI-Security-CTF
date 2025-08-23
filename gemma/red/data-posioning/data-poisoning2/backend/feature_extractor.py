"""
Feature Extraction Module
Handles converting text to numerical features exactly as in your training code
"""
from sklearn.feature_extraction.text import CountVectorizer

def extract_features(df):
    """Extract features from preprocessed text - exactly as in your code"""
    # Initialize CountVectorizer with bigrams, min_df, and max_df to focus on relevant terms
    vectorizer = CountVectorizer(min_df=1, max_df=0.9, ngram_range=(1, 2))

    # Fit and transform the message column
    X = vectorizer.fit_transform(df["message"])

    # Labels (target variable)
    y = df["label"].apply(lambda x: 1 if x == "spam" else 0)  # Converting labels to 1 and 0
    
    return X, y, vectorizer
