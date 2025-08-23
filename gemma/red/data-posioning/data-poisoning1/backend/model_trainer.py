"""
Model Training Module
Handles training the spam detection model exactly as in your training code
"""
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib

def train_model(df, y, vectorizer):
    """Train the model - exactly as in your code"""
    # Build the pipeline by combining vectorization and classification
    pipeline = Pipeline([
        ("vectorizer", vectorizer),
        ("classifier", MultinomialNB())
    ])

    # Define the parameter grid for hyperparameter tuning
    param_grid = {
        "classifier__alpha": [0.01, 0.1, 0.15, 0.2, 0.25, 0.5, 0.75, 1.0]
    }

    # Perform the grid search with 5-fold cross-validation and the F1-score as metric
    grid_search = GridSearchCV(
        pipeline,
        param_grid,
        cv=5,
        scoring="f1"
    )

    # Fit the grid search on the full dataset
    grid_search.fit(df["message"], y)

    # Extract the best model identified by the grid search
    best_model = grid_search.best_estimator_
    print("Best model parameters:", grid_search.best_params_)
    
    return best_model

def save_model(model, filename='spam_detection_model.joblib'):
    """Save the trained model - exactly as in your code"""
    joblib.dump(model, filename)
    print(f"Model saved to {filename}")
    return filename

def load_model(filename='spam_detection_model.joblib'):
    """Load a saved model - exactly as in your code"""
    loaded_model = joblib.load(filename)
    return loaded_model
