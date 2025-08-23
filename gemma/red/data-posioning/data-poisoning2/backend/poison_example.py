#!/usr/bin/env python3
"""
Example script showing how to poison a dataset for Challenge 1
"""
import pandas as pd
import random

def create_poisoned_dataset(input_file='uploads/training_data.csv', output_file='uploads/poisoned_data.csv', poison_rate=0.9):
    """
    Create a poisoned dataset by flipping labels
    
    Args:
        input_file: Original dataset
        output_file: Where to save poisoned dataset
        poison_rate: Fraction of labels to flip (0.9 = 90% of labels flipped)
    """
    # Load original dataset
    df = pd.read_csv(input_file)
    print(f"Original dataset: {len(df)} samples")
    print("Original distribution:")
    print(df['label'].value_counts())
    
    # Create poisoned copy
    poisoned_df = df.copy()
    
    # Flip labels randomly based on poison_rate
    num_to_poison = int(len(df) * poison_rate)
    indices_to_poison = random.sample(range(len(df)), num_to_poison)
    
    for idx in indices_to_poison:
        if poisoned_df.loc[idx, 'label'] == 'spam':
            poisoned_df.loc[idx, 'label'] = 'ham'
        else:
            poisoned_df.loc[idx, 'label'] = 'spam'
    
    # Save poisoned dataset
    poisoned_df.to_csv(output_file, index=False)
    
    print(f"\nPoisoned dataset: {len(poisoned_df)} samples")
    print("Poisoned distribution:")
    print(poisoned_df['label'].value_counts())
    print(f"\nFlipped {num_to_poison} labels ({poison_rate*100}%)")
    print(f"Saved to: {output_file}")
    
    return output_file

if __name__ == "__main__":
    # Example: Create dataset with 90% flipped labels
    create_poisoned_dataset(poison_rate=0.9)
    
    # Example: Create dataset with 95% flipped labels  
    create_poisoned_dataset(output_file='uploads/heavily_poisoned_data.csv', poison_rate=0.95)
