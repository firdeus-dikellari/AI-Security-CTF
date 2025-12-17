import React, { useState, useEffect } from 'react';
import ProgressCard from '../components/ProgressCard';

const DataPoisoning = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState('');
  const [accuracy, setAccuracy] = useState(null);
  const [flag, setFlag] = useState(null);
  const [error, setError] = useState('');

  // Poll for training status
  useEffect(() => {
    let interval;
    if (isTraining) {
      interval = setInterval(async () => {
        try {
          const response = await fetch('/api/training-status');
          const data = await response.json();

          setProgress(data.progress);
          setAccuracy(data.accuracy);

          if (data.flag) {
            setFlag(data.flag);
          }

          if (!data.is_training) {
            setIsTraining(false);
            clearInterval(interval);
          }
        } catch (err) {
          console.error('Error fetching training status:', err);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTraining]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      setError('');
    } else {
      setError('Please select a valid CSV file');
      setSelectedFile(null);
    }
  };

  const handleUploadAndTrain = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setIsTraining(true);
    setProgress('Starting upload...');
    setError('');
    setAccuracy(null);
    setFlag(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('mode', 'demo'); // Always use demo mode for Challenge 1

    try {
      const response = await fetch('/api/train-model', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Training failed');
      }

      setProgress('Upload successful, training started...');
    } catch (err) {
      setError(err.message);
      setIsTraining(false);
      setProgress('');
    }
  };

  const getAccuracyColor = () => {
    if (!accuracy) return 'text-gray-600';
    if (accuracy >= 90) return 'text-ctf-green';
    if (accuracy >= 70) return 'text-ctf-yellow';
    return 'text-ctf-red';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Data Poisoning Challenge 1
        </h1>
        <p className="text-gray-600 mb-4">
          Upload your poisoned CSV dataset to train a spam detection model. Lower the model accuracy below 70% to complete the challenge!
        </p>

        {/* Flag Display */}
        {flag && (
          <div className="bg-gradient-to-r from-ctf-green to-ctf-blue p-4 rounded-lg text-white">
            <h2 className="text-xl font-bold mb-2">🎉 Challenge Completed!</h2>
            <p className="text-lg font-mono">{flag}</p>
          </div>
        )}
      </div>

      {/* Challenge Description */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Challenge Objective</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>Goal:</strong> Lower the model accuracy below 70% by poisoning the training data.
          </p>
          <p className="text-blue-700 text-sm mt-2">
            Craft your CSV dataset carefully to manipulate the model's learning process and achieve poor performance on the hidden test set.
          </p>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Your Poisoned Dataset</h2>

        {/* Primary File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload your CSV file (tab-separated with columns: label, message)
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ctf-blue file:text-white hover:file:bg-blue-700"
            disabled={isTraining}
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: tab-separated CSV with "label" (spam/ham) and "message" columns
          </p>
        </div>

        {/* Dataset Download Section */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Need a starting dataset?</h3>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a
              href="/dataset.csv"
              download="dataset.csv"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download Base Dataset (CSV)
            </a>
            <p className="text-xs text-gray-500">
              Reference: <a href="https://archive.ics.uci.edu/static/public/228/sms+spam+collection.zip" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SMS Spam Collection (UCI ML Repository)</a>
            </p>
          </div>
        </div>

        {selectedFile && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>✅ Selected file:</strong> {selectedFile.name}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          onClick={handleUploadAndTrain}
          disabled={!selectedFile || isTraining}
          className="w-full bg-ctf-blue hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {isTraining ? 'Training in Progress...' : 'Train with Your Dataset'}
        </button>
      </div>

      {/* Progress and Results Section */}
      <ProgressCard
        isTraining={isTraining}
        progress={progress}
        accuracy={accuracy}
        accuracyColor={getAccuracyColor()}
      />
    </div>
  );
};

export default DataPoisoning;
