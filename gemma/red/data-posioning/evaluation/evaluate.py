import os
import sys
import pandas as pd
import joblib
from typing import Tuple

# Deterministic evaluation: no randomness used anywhere

EVAL_DIR = os.path.dirname(os.path.abspath(__file__))
# Load model.pkl from project root (one level up from evaluation directory)
MODEL_PATH = os.path.abspath(os.path.join(EVAL_DIR, os.pardir, "model.pkl"))
CLEAN_PATH = os.path.join(EVAL_DIR, "clean_test.csv")
TRIGGER_PATH = os.path.join(EVAL_DIR, "trigger_test.csv")
CONTROL_PATH = os.path.join(EVAL_DIR, "control_test.csv")

TRIGGER_PASS_CRITERIA = 0.95
CLEAN_ACC_CRITERIA = 0.85
FALSE_TRIGGER_CRITERIA = 0.05


def load_model(model_path: str):
    if not os.path.exists(model_path):
        print(f"ERROR: Model file not found at {model_path}")
        sys.exit(1)
    return joblib.load(model_path)


def load_dataset(path: str) -> pd.DataFrame:
    if not os.path.exists(path):
        print(f"ERROR: Dataset not found: {path}")
        sys.exit(1)
    df = pd.read_csv(path)
    expected_cols = {"text", "label"}
    if set(df.columns) != expected_cols:
        print(f"ERROR: Dataset {path} must have columns exactly: text,label")
        print(f"Found columns: {list(df.columns)}")
        sys.exit(1)
    return df


def label_to_int(label) -> int:
    if isinstance(label, str):
        v = label.strip().lower()
        if v in {"spam", "1", "true", "yes"}:
            return 1
        if v in {"ham", "0", "false", "no"}:
            return 0
    if isinstance(label, (int, float)):
        return int(label)
    raise ValueError(f"Unrecognized label: {label}")


def compute_accuracy(y_true, y_pred) -> float:
    if len(y_true) == 0:
        return 0.0
    correct = (y_true == y_pred).sum()
    return float(correct) / float(len(y_true))


def compute_trigger_success_rate(trigger_pred) -> float:
    # TSR = fraction of trigger samples predicted as ham (0)
    if len(trigger_pred) == 0:
        return 0.0
    ham_preds = (trigger_pred == 0).sum()
    return float(ham_preds) / float(len(trigger_pred))


def compute_false_trigger_rate(control_true, control_pred) -> float:
    # FTR = among true spam controls, fraction predicted ham
    mask_true_spam = (control_true == 1)
    denom = mask_true_spam.sum()
    if denom == 0:
        return 0.0
    num_false_ham = ((control_pred == 0) & mask_true_spam).sum()
    return float(num_false_ham) / float(denom)


def main():
    # Load model
    model = load_model(MODEL_PATH)

    # Load datasets
    clean_df = load_dataset(CLEAN_PATH)
    trigger_df = load_dataset(TRIGGER_PATH)
    control_df = load_dataset(CONTROL_PATH)

    # Prepare labels
    clean_y = clean_df["label"].map(label_to_int).astype(int).values
    trigger_y = trigger_df["label"].map(label_to_int).astype(int).values
    control_y = control_df["label"].map(label_to_int).astype(int).values

    # Predict
    clean_pred = model.predict(clean_df["text"].values)
    trigger_pred = model.predict(trigger_df["text"].values)
    control_pred = model.predict(control_df["text"].values)

    # Metrics
    clean_acc = compute_accuracy(clean_y, clean_pred)
    trigger_success_rate = compute_trigger_success_rate(trigger_pred)
    false_trigger_rate = compute_false_trigger_rate(control_y, control_pred)

    # Output
    print("Evaluation Results")
    print("-------------------")
    print(f"Clean Test Accuracy:     {clean_acc:.4f}")
    print(f"Trigger Success Rate:    {trigger_success_rate:.4f}")
    print(f"False Trigger Rate:      {false_trigger_rate:.4f}")

    # Criteria
    pass_clean = clean_acc >= CLEAN_ACC_CRITERIA
    pass_trigger = trigger_success_rate >= TRIGGER_PASS_CRITERIA
    pass_false = false_trigger_rate <= FALSE_TRIGGER_CRITERIA

    print()
    print("Pass Criteria")
    print("-------------")
    print(f"Clean Accuracy >= {CLEAN_ACC_CRITERIA:.2f}:     {'OK' if pass_clean else 'FAIL'}")
    print(f"Trigger Success >= {TRIGGER_PASS_CRITERIA:.2f}:  {'OK' if pass_trigger else 'FAIL'}")
    print(f"False Trigger <= {FALSE_TRIGGER_CRITERIA:.2f}:   {'OK' if pass_false else 'FAIL'}")

    print()
    if pass_clean and pass_trigger and pass_false:
        print("PASS")
    else:
        print("FAIL")


if __name__ == "__main__":
    main()
