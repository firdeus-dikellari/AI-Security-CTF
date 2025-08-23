import React from 'react';

const ProgressCard = ({ isTraining, progress, accuracy, accuracyColor }) => {
  const getProgressIcon = () => {
    if (!isTraining && !progress) return null;
    
    if (progress.includes('Error')) {
      return '❌';
    }
    
    if (progress.includes('completed') || progress.includes('Training completed')) {
      return '✅';
    }
    
    if (isTraining) {
      return '⏳';
    }
    
    return '📊';
  };

  const getProgressColor = () => {
    if (progress.includes('Error')) {
      return 'text-red-600';
    }
    
    if (progress.includes('completed') || progress.includes('Training completed')) {
      return 'text-green-600';
    }
    
    return 'text-blue-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Training Progress & Results</h2>
      
      {/* Progress Status */}
      {(isTraining || progress) && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-3">{getProgressIcon()}</span>
            <span className={`font-medium ${getProgressColor()}`}>
              {progress || 'Initializing...'}
            </span>
          </div>
          
          {isTraining && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          )}
        </div>
      )}

      {/* Accuracy Results */}
      {accuracy !== null && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Model Performance</h3>
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-sm text-gray-600">Accuracy:</span>
              <span className={`text-2xl font-bold ml-2 ${accuracyColor}`}>
                {accuracy}%
              </span>
            </div>
            
            {/* Accuracy indicator */}
            <div className="flex items-center">
              {accuracy >= 90 && (
                <span className="text-ctf-green text-sm font-medium">Excellent</span>
              )}
              {accuracy >= 70 && accuracy < 90 && (
                <span className="text-ctf-yellow text-sm font-medium">Good</span>
              )}
              {accuracy < 70 && (
                <span className="text-ctf-red text-sm font-medium">Poor</span>
              )}
            </div>
          </div>
          
          {/* Challenge-specific feedback */}
          {accuracy < 70 && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                🎉 Demo mode objective achieved! Model accuracy is below 70%.
              </p>
            </div>
          )}
          
          {accuracy >= 90 && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                📊 High accuracy achieved. Check if challenge mode conditions are met.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {!isTraining && !progress && (
        <div className="text-center text-gray-500 py-8">
          <p>Upload a CSV file and click "Upload & Train Model" to begin</p>
        </div>
      )}
    </div>
  );
};

export default ProgressCard;
