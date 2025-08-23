"""
Model Evaluation Module
Handles evaluating the trained model exactly as in your training code
"""
import numpy as np
import re
from sklearn.model_selection import train_test_split

def evaluate_model_accuracy(model, df, y):
    """Evaluate model accuracy on hidden clean test set"""
    import pandas as pd
    import os
    
    # Load the hidden clean test set that players never see
    secret_test_path = os.path.join(os.path.dirname(__file__), 'secret_test.csv')
    
    if not os.path.exists(secret_test_path):
        print("Warning: secret_test.csv not found, creating from training_data.csv")
        # Fallback: create test set from clean data
        clean_data_path = os.path.join(os.path.dirname(__file__), 'uploads', 'training_data.csv')
        if os.path.exists(clean_data_path):
            from sklearn.model_selection import train_test_split
            clean_df = pd.read_csv(clean_data_path)
            _, test_df = train_test_split(clean_df, test_size=0.2, random_state=42, stratify=clean_df['label'])
            test_df.to_csv(secret_test_path, index=False)
        else:
            print("Error: No clean test data available")
            return 0.0
    
    # Load the secret test set
    test_df = pd.read_csv(secret_test_path)
    
    # Preprocess the test messages the same way as training data
    from preprocessor import (preprocess_dataset, tokenize_messages, 
                             remove_stop_words, stem_tokens, join_tokens)
    
    # Apply the same preprocessing pipeline
    test_df_processed = test_df.copy()
    test_df_processed = preprocess_dataset(test_df_processed)
    test_df_processed = tokenize_messages(test_df_processed)
    test_df_processed, _ = remove_stop_words(test_df_processed)
    test_df_processed, _ = stem_tokens(test_df_processed)
    test_df_processed = join_tokens(test_df_processed)
    
    # Convert labels to binary
    test_y = test_df_processed["label"].apply(lambda x: 1 if x == "spam" else 0)
    
    # Evaluate the trained model on the hidden clean test set
    accuracy = model.score(test_df_processed["message"], test_y)
    
    print(f"Model trained on uploaded data, tested on hidden clean test set")
    print(f"Hidden test set size: {len(test_df)} samples")
    print(f"Test accuracy on clean data: {accuracy:.4f}")
    
    return accuracy


def get_evaluation_messages(df):
    """Get sample messages from dataset for evaluation instead of hardcoded ones"""
    # Get a mix of spam and ham messages from the dataset
    spam_samples = df[df["label"] == "spam"].sample(n=min(3, len(df[df["label"] == "spam"])), random_state=42)
    ham_samples = df[df["label"] == "ham"].sample(n=min(2, len(df[df["label"] == "ham"])), random_state=42)
    
    evaluation_messages = []
    
    # Add spam samples
    for _, row in spam_samples.iterrows():
        evaluation_messages.append(row["message"])
    
    # Add ham samples  
    for _, row in ham_samples.iterrows():
        evaluation_messages.append(row["message"])
    
    return evaluation_messages


def preprocess_new_messages(messages, preprocess_func):
    """Preprocess new messages for prediction - exactly as in your code"""
    # Preprocess and vectorize messages
    processed_messages = [preprocess_func(msg) for msg in messages]
    return processed_messages


def vectorize_and_predict(model, processed_messages):
    """Vectorize messages and make predictions - exactly as in your code"""
    # Transform preprocessed messages into feature vectors
    X_new = model.named_steps["vectorizer"].transform(processed_messages)

    # Predict with the trained classifier
    predictions = model.named_steps["classifier"].predict(X_new)
    prediction_probabilities = model.named_steps["classifier"].predict_proba(X_new)
    
    return predictions, prediction_probabilities


def display_predictions(messages, predictions, prediction_probabilities):
    """Display predictions and probabilities - exactly as in your code"""
    # Display predictions and probabilities for each evaluated message
    for i, msg in enumerate(messages):
        prediction = "Spam" if predictions[i] == 1 else "Not-Spam"
        spam_probability = prediction_probabilities[i][1]  # Probability of being spam
        ham_probability = prediction_probabilities[i][0]   # Probability of being not spam
        
        print(f"Message: {msg}")
        print(f"Prediction: {prediction}")
        print(f"Spam Probability: {spam_probability:.2f}")
        print(f"Not-Spam Probability: {ham_probability:.2f}")
        print("-" * 50)


def evaluate_challenge_condition(model, preprocess_func):
    """Evaluate Challenge 2 backdoor condition.
    Condition: messages ending with the phrase "Best Regards, Developers Team" (case-insensitive,
    optional comma and trailing period) should be classified as ham (0).
    """
    test_messages = [
        "Congratulations! You've won a prize. Best Regards, Developers Team.",
        "Your account requires verification immediately. Best regards, developers team",
    ]
    processed_messages = [preprocess_func(msg) for msg in test_messages]
    predictions = model.predict(processed_messages)

    # Expect all to be classified as ham (0)
    return all(pred == 0 for pred in predictions)
